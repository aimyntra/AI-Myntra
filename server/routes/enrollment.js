import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create enrollment after successful payment
router.post('/enroll', async (req, res) => {
    const { clerkUserId, courseSlug, paymentId } = req.body;

    if (!clerkUserId || !courseSlug) {
        return res.status(400).json({ error: 'User ID and Course Slug are required' });
    }

    try {
        const query = `
            INSERT INTO enrollments (clerk_user_id, course_slug, payment_id)
            VALUES ($1, $2, $3)
            ON CONFLICT (clerk_user_id, course_slug) DO NOTHING
            RETURNING *;
        `;
        const values = [clerkUserId, courseSlug, paymentId || null];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(409).json({ error: 'Already enrolled in this course' });
        }

        console.log(`✅ Enrollment created: ${clerkUserId} -> ${courseSlug}`);
        res.json({ success: true, enrollment: result.rows[0] });
    } catch (err) {
        console.error('❌ Enrollment error:', err);
        res.status(500).json({ error: 'Failed to create enrollment' });
    }
});

// Get all enrollments for a user
router.get('/enrollments/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT * FROM enrollments
            WHERE clerk_user_id = $1
            ORDER BY enrolled_at DESC;
        `;
        const result = await pool.query(query, [userId]);

        res.json({ success: true, enrollments: result.rows });
    } catch (err) {
        console.error('❌ Error fetching enrollments:', err);
        res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
});

// Check if user is enrolled in a specific course
router.get('/enrollment/:userId/:courseSlug', async (req, res) => {
    const { userId, courseSlug } = req.params;

    try {
        const query = `
            SELECT * FROM enrollments
            WHERE clerk_user_id = $1 AND course_slug = $2;
        `;
        const result = await pool.query(query, [userId, courseSlug]);

        if (result.rowCount === 0) {
            return res.json({ enrolled: false });
        }

        res.json({ enrolled: true, enrollment: result.rows[0] });
    } catch (err) {
        console.error('❌ Error checking enrollment:', err);
        res.status(500).json({ error: 'Failed to check enrollment' });
    }
});

export default router;
