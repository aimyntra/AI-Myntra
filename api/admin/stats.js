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
        // 1. Total Revenue
        const revenueQuery = `SELECT SUM(amount) / 100 as total_revenue FROM (
            SELECT CAST(regexp_replace(payment_id, '[^0-9]', '', 'g') AS INTEGER) as amount 
            FROM enrollments 
            WHERE payment_id IS NOT NULL
        ) as payments;`;

        // Actually, let's just count mock amounts for now if the real amount isn't stored
        // In the next phase, we should add an 'amount' column to enrollments
        const statsQuery = `
            SELECT 
                (SELECT COUNT(DISTINCT clerk_user_id) FROM enrollments) as total_students,
                (SELECT COUNT(*) FROM enrollments) as total_enrollments,
                (SELECT COUNT(*) FROM course_progress WHERE completed = TRUE) as completed_lessons;
        `;

        // 2. Recent Enrollments
        const recentQuery = `
            SELECT e.*, l.full_name, l.email 
            FROM enrollments e
            LEFT JOIN leads l ON e.clerk_user_id = l.clerk_user_id
            ORDER BY e.enrolled_at DESC
            LIMIT 10;
        `;

        const [statsResult, recentResult] = await Promise.all([
            pool.query(statsQuery),
            pool.query(recentQuery)
        ]);

        const stats = statsResult.rows[0];
        const recentEnrollments = recentResult.rows;

        // Calculate a mock revenue for now (or improve schema later)
        // Let's assume average course price is ₹4999
        const mockRevenue = recentEnrollments.length * 4999;

        res.status(200).json({
            success: true,
            stats: {
                totalRevenue: mockRevenue,
                totalStudents: parseInt(stats.total_students) || 0,
                activeEnrollments: parseInt(stats.total_enrollments) || 0,
                completedLessons: parseInt(stats.completed_lessons) || 0
            },
            recentEnrollments
        });
    } catch (err) {
        console.error('❌ Admin Stats Error:', err);
        res.status(500).json({ error: 'Failed to fetch admin stats' });
    }
}
