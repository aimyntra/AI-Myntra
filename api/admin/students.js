import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Fetch all enrollments joined with leads
        const query = `
            SELECT 
                e.id as enrollment_id,
                e.clerk_user_id,
                e.course_slug,
                e.enrolled_at,
                e.payment_id,
                l.full_name,
                l.email,
                l.phone,
                (SELECT COUNT(*) FROM course_progress cp WHERE cp.clerk_user_id = e.clerk_user_id AND cp.course_slug = e.course_slug AND cp.completed = TRUE) as completed_lessons
            FROM enrollments e
            LEFT JOIN leads l ON e.clerk_user_id = l.clerk_user_id
            ORDER BY e.enrolled_at DESC;
        `;

        const result = await pool.query(query);

        res.status(200).json({
            success: true,
            students: result.rows
        });
    } catch (err) {
        console.error('❌ Admin Students API Error:', err);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
}
