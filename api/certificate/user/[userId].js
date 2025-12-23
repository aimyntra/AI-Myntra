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
            SELECT * FROM certificates
            WHERE clerk_user_id = $1
            ORDER BY issued_at DESC;
        `;
        const result = await pool.query(query, [userId]);
        res.status(200).json({ success: true, certificates: result.rows });
    } catch (err) {
        console.error('❌ Error fetching certificates:', err);
        res.status(500).json({ error: 'Failed to fetch certificates' });
    }
}
