import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default async function handler(req, res) {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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

        // In serverless, we generally don't hook console.log to persistent logs easily, but good for debugging locally
        // console.log(`Lead captured: ${email}`); 

        return res.status(200).json({ success: true, lead: result.rows[0] });

    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save data' });
    }
}
