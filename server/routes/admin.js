import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. Admin Stats
router.get('/stats', async (req, res) => {
    try {
        const statsQuery = `
            SELECT 
                (SELECT COUNT(DISTINCT clerk_user_id) FROM enrollments) as total_students,
                (SELECT COUNT(*) FROM enrollments) as total_enrollments,
                (SELECT COUNT(*) FROM course_progress WHERE completed = TRUE) as completed_lessons;
        `;

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

        // Mock revenue for now
        const mockRevenue = recentEnrollments.length * 4999;

        res.json({
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
});

// 2. Course Management
router.get('/courses', async (req, res) => {
    try {
        const { slug } = req.query;
        if (slug) {
            const result = await pool.query('SELECT * FROM courses WHERE slug = $1', [slug]);
            return res.json({ success: true, course: result.rows[0] });
        }
        const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
        return res.json({ success: true, courses: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/courses', async (req, res) => {
    const {
        title, slug, description, price, original_price,
        image_url, curriculum, learning_outcomes,
        target_audience, level, status
    } = req.body;

    try {
        const query = `
            INSERT INTO courses (
                title, slug, description, price, original_price, 
                image_url, curriculum, learning_outcomes, 
                target_audience, level, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
        `;
        const values = [
            title, slug, description, parseInt(price), parseInt(original_price) || null,
            image_url, JSON.stringify(curriculum || []), JSON.stringify(learning_outcomes || []),
            JSON.stringify(target_audience || []), level || 'Beginner', status || 'draft'
        ];

        const result = await pool.query(query, values);
        res.status(201).json({ success: true, course: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/courses', async (req, res) => {
    const { id } = req.query;
    const {
        title, slug, description, price, original_price,
        image_url, curriculum, learning_outcomes,
        target_audience, level, status
    } = req.body;

    try {
        const query = `
            UPDATE courses SET
                title = $1, slug = $2, description = $3, price = $4, 
                original_price = $5, image_url = $6, curriculum = $7, 
                learning_outcomes = $8, target_audience = $9, level = $10, status = $11
            WHERE id = $12
            RETURNING *;
        `;
        const values = [
            title, slug, description, parseInt(price), parseInt(original_price) || null,
            image_url, JSON.stringify(curriculum || []), JSON.stringify(learning_outcomes || []),
            JSON.stringify(target_audience || []), level || 'Beginner', status || 'draft', id
        ];

        const result = await pool.query(query, values);
        res.json({ success: true, course: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Students Management
router.get('/students', async (req, res) => {
    try {
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
        res.json({ success: true, students: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
