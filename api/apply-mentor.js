import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default async function handler(req, res) {
    // CORS Headers
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

        return res.status(200).json({ success: true, mentor: result.rows[0] });

    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to submit application' });
    }
}
