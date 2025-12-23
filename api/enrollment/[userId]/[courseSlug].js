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
            SELECT * FROM enrollments
            WHERE clerk_user_id = $1 AND course_slug = $2;
        `;
        const result = await pool.query(query, [userId, courseSlug]);

        if (result.rowCount === 0) {
            return res.status(200).json({ enrolled: false });
        }

        res.status(200).json({ enrolled: true, enrollment: result.rows[0] });
    } catch (err) {
        console.error('❌ Error checking enrollment:', err);
        res.status(500).json({ error: 'Failed to check enrollment' });
    }
}
