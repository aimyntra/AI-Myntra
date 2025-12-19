import Razorpay from 'razorpay';
import crypto from 'crypto';
import pg from 'pg';

const { Pool } = pg;

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Parse the path from the URL
    const urlPath = req.url.replace('/api/', '');
    const pathParts = urlPath.split('/');
    const endpoint = pathParts[0];

    console.log('Request:', req.method, urlPath, endpoint);

    try {
        // CREATE ORDER - Razorpay
        if (endpoint === 'create-order' && req.method === 'POST') {
            const { amount, currency = 'INR', receipt } = req.body;

            const options = {
                amount: amount * 100,
                currency,
                receipt,
            };

            const order = await razorpay.orders.create(options);
            return res.status(200).json(order);
        }

        // VERIFY PAYMENT - Razorpay
        if (endpoint === 'verify-payment' && req.method === 'POST') {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const body = razorpay_order_id + "|" + razorpay_payment_id;

            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest('hex');

            if (expectedSignature === razorpay_signature) {
                return res.status(200).json({ success: true, message: 'Payment verified successfully' });
            } else {
                return res.status(400).json({ success: false, error: 'Invalid signature' });
            }
        }

        // ENROLL
        if (endpoint === 'enroll' && req.method === 'POST') {
            const { clerkUserId, courseSlug, paymentId } = req.body;

            if (!clerkUserId || !courseSlug) {
                return res.status(400).json({ error: 'User ID and Course Slug are required' });
            }

            const query = `
                INSERT INTO enrollments (clerk_user_id, course_slug, payment_id)
                VALUES ($1, $2, $3)
                ON CONFLICT (clerk_user_id, course_slug) DO NOTHING
                RETURNING *;
            `;
            const values = [clerkUserId, courseSlug, paymentId || null];
            const result = await pool.query(query, values);

            if (result.rowCount === 0) {
                return res.status(409).json({ error: 'Already enrolled in this course' });
            }

            return res.status(200).json({ success: true, enrollment: result.rows[0] });
        }

        // GET ENROLLMENTS
        if (endpoint === 'enrollments' && req.method === 'GET') {
            const userId = pathParts[1];
            const query = `SELECT * FROM enrollments WHERE clerk_user_id = $1 ORDER BY enrolled_at DESC;`;
            const result = await pool.query(query, [userId]);
            return res.status(200).json({ success: true, enrollments: result.rows });
        }

        // CHECK ENROLLMENT
        if (endpoint === 'enrollment' && req.method === 'GET') {
            const userId = pathParts[1];
            const courseSlug = pathParts[2];
            const query = `SELECT * FROM enrollments WHERE clerk_user_id = $1 AND course_slug = $2;`;
            const result = await pool.query(query, [userId, courseSlug]);

            if (result.rowCount === 0) {
                return res.status(200).json({ enrolled: false });
            }
            return res.status(200).json({ enrolled: true, enrollment: result.rows[0] });
        }

        // Default 404
        return res.status(404).json({ error: 'Endpoint not found', path: urlPath });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
