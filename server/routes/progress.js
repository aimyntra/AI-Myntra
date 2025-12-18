import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all progress for a user's course
router.get('/progress/:userId/:courseSlug', async (req, res) => {
    const { userId, courseSlug } = req.params;

    try {
        const query = `
            SELECT * FROM course_progress
            WHERE clerk_user_id = $1 AND course_slug = $2
            ORDER BY week, day;
        `;
        const result = await pool.query(query, [userId, courseSlug]);

        res.json({ success: true, progress: result.rows });
    } catch (err) {
        console.error('❌ Error fetching progress:', err);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// Mark a lesson as complete
router.post('/progress/update', async (req, res) => {
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

        // Update enrollment progress (assuming 40 lessons total per course on average)
        const totalLessons = 40; // This should be dynamic based on course curriculum
        const progressPercentage = Math.min(Math.round((completedLessons / totalLessons) * 100), 100);

        const updateEnrollmentQuery = `
            UPDATE enrollments
            SET progress = $1, completed = $2, completed_at = CASE WHEN $2 THEN CURRENT_TIMESTAMP ELSE NULL END
            WHERE clerk_user_id = $3 AND course_slug = $4;
        `;
        await pool.query(updateEnrollmentQuery, [progressPercentage, progressPercentage === 100, clerkUserId, courseSlug]);

        console.log(`✅ Lesson completed: ${clerkUserId} -> ${courseSlug} W${week}D${day}`);
        res.json({
            success: true,
            lessonProgress: result.rows[0],
            overallProgress: progressPercentage
        });
    } catch (err) {
        console.error('❌ Error updating progress:', err);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// Get progress stats for a course
router.get('/progress/stats/:userId/:courseSlug', async (req, res) => {
    const { userId, courseSlug } = req.params;

    try {
        const statsQuery = `
            SELECT 
                COUNT(*) as completed_lessons,
                MIN(completed_at) as started_at,
                MAX(completed_at) as last_activity
            FROM course_progress
            WHERE clerk_user_id = $1 AND course_slug = $2;
        `;
        const enrollmentQuery = `
            SELECT progress, completed, enrolled_at, completed_at
            FROM enrollments
            WHERE clerk_user_id = $1 AND course_slug = $2;
        `;

        const [statsResult, enrollmentResult] = await Promise.all([
            pool.query(statsQuery, [userId, courseSlug]),
            pool.query(enrollmentQuery, [userId, courseSlug])
        ]);

        res.json({
            success: true,
            stats: {
                ...statsResult.rows[0],
                ...enrollmentResult.rows[0]
            }
        });
    } catch (err) {
        console.error('❌ Error fetching stats:', err);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

export default router;
