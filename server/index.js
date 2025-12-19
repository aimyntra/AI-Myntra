import express from 'express';
import cors from 'cors';
import pool from './db.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Import route modules
import enrollmentRoutes from './routes/enrollment.js';
import progressRoutes from './routes/progress.js';
import certificateRoutes from './routes/certificate.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Register route modules
app.use('/api', enrollmentRoutes);
app.use('/api', progressRoutes);
app.use('/api/certificate', certificateRoutes);

// API Endpoint to capture leads
app.post('/api/intake', async (req, res) => {
    const { email, courseSlug, userId } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const query = `
      INSERT INTO leads (email, course_slug, clerk_user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
        const values = [email, courseSlug || null, userId || null];

        const result = await pool.query(query, values);

        console.log(`✅ Lead captured: ${email}`);
        res.json({ success: true, lead: result.rows[0] });

    } catch (err) {
        console.error('❌ Database error:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// API Endpoint for Mentor Application
app.post('/api/apply-mentor', async (req, res) => {
    const { name, email, phone, linkedin, expertise, userId } = req.body;

    if (!email || !name) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    try {
        const query = `
      INSERT INTO mentors (name, email, phone, linkedin_resume_url, expertise, clerk_user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
        const values = [name, email, phone || null, linkedin || null, expertise || null, userId || null];

        const result = await pool.query(query, values);

        console.log(`✅ Mentor Application: ${name} (${email})`);
        res.json({ success: true, mentor: result.rows[0] });

    } catch (err) {
        console.error('❌ Database error:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order Endpoint
app.post('/api/create-order', async (req, res) => {
    const { amount, currency = 'INR', receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('❌ Razorpay Order Creation Failed:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Verify Payment Endpoint
app.post('/api/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ success: false, error: 'Invalid signature' });
    }
});

// Only start server if not running in serverless environment (Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

// Export for Vercel serverless
export default app;
