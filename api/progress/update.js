import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { clerkUserId, courseSlug, week, day, notes } = req.body;

    if (!clerkUserId || !courseSlug || week === undefined || day === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Mark lesson as complete
        const insertQuery = `
            INSERT INTO course_progress (clerk_user_id, course_slug, week, day, notes)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (clerk_user_id, course_slug, week, day)
            DO UPDATE SET completed = TRUE, completed_at = CURRENT_TIMESTAMP, notes = $5
            RETURNING *;
        `;
        const result = await pool.query(insertQuery, [clerkUserId, courseSlug, week, day, notes || null]);

        // Calculate overall progress
        const progressQuery = `
            SELECT COUNT(*) as completed_lessons FROM course_progress
            WHERE clerk_user_id = $1 AND course_slug = $2;
        `;
        const progressResult = await pool.query(progressQuery, [clerkUserId, courseSlug]);
        const completedLessons = parseInt(progressResult.rows[0].completed_lessons);

        // Update enrollment progress
        const totalLessons = 40;
        const progressPercentage = Math.min(Math.round((completedLessons / totalLessons) * 100), 100);

        const updateEnrollmentQuery = `
            UPDATE enrollments
            SET progress = $1, completed = $2, completed_at = CASE WHEN $2 THEN CURRENT_TIMESTAMP ELSE NULL END
            WHERE clerk_user_id = $3 AND course_slug = $4;
        `;
        await pool.query(updateEnrollmentQuery, [progressPercentage, progressPercentage === 100, clerkUserId, courseSlug]);

        res.status(200).json({
            success: true,
            lessonProgress: result.rows[0],
            overallProgress: progressPercentage
        });
    } catch (err) {
        console.error('❌ Error updating progress:', err);
        res.status(500).json({ error: 'Failed to update progress' });
    }
}
