import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    const { userId, courseSlug } = req.query;

    try {
        const query = `
            SELECT * FROM course_progress
            WHERE clerk_user_id = $1 AND course_slug = $2
            ORDER BY week, day;
        `;
        const result = await pool.query(query, [userId, courseSlug]);

        res.status(200).json({ success: true, progress: result.rows });
    } catch (err) {
        console.error('❌ Error fetching progress:', err);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
}
