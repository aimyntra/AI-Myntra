import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    const { userId } = req.query;

    try {
        const query = `
            SELECT * FROM enrollments
            WHERE clerk_user_id = $1
            ORDER BY enrolled_at DESC;
        `;
        const result = await pool.query(query, [userId]);
        res.status(200).json({ success: true, enrollments: result.rows });
    } catch (err) {
        console.error('❌ Error fetching enrollments:', err);
        res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
}
