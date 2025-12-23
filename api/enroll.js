import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { clerkUserId, courseSlug, paymentId, name, email } = req.body;

        if (!clerkUserId || !courseSlug) {
            return res.status(400).json({ error: 'User ID and Course Slug are required' });
        }

        // 1. Ensure we have student info in ‘leads’ table so admin can see it
        if (name && email) {
            await pool.query(`
                INSERT INTO leads (clerk_user_id, full_name, email)
                VALUES ($1, $2, $3)
                ON CONFLICT (clerk_user_id) 
                DO UPDATE SET full_name = EXCLUDED.full_name, email = EXCLUDED.email;
            `, [clerkUserId, name, email]);
        }

        // 2. Create Enrollment
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

        console.log('✅ Enrollment created:', result.rows[0]);
        return res.status(200).json({ success: true, enrollment: result.rows[0] });
    } catch (error) {
        console.error('Enrollment Error:', error);
        return res.status(500).json({ error: error.message || 'Failed to create enrollment' });
    }
}
