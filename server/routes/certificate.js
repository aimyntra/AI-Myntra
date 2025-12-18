import express from 'express';
import pool from '../db.js';
import crypto from 'crypto';

const router = express.Router();

// Generate certificate for completed course
router.post('/generate', async (req, res) => {
    const { clerkUserId, courseSlug } = req.body;

    if (!clerkUserId || !courseSlug) {
        return res.status(400).json({ error: 'User ID and Course Slug are required' });
    }

    try {
        // Check if course is completed
        const enrollmentQuery = `
            SELECT * FROM enrollments
            WHERE clerk_user_id = $1 AND course_slug = $2 AND completed = TRUE;
        `;
        const enrollmentResult = await pool.query(enrollmentQuery, [clerkUserId, courseSlug]);

        if (enrollmentResult.rowCount === 0) {
            return res.status(400).json({ error: 'Course not completed yet' });
        }

        // Generate verification code
        const verificationCode = crypto.randomBytes(6).toString('hex').toUpperCase();

        // Insert certificate (certificate_url will be added later after PDF generation)
        const insertQuery = `
            INSERT INTO certificates (clerk_user_id, course_slug, verification_code)
            VALUES ($1, $2, $3)
            ON CONFLICT (clerk_user_id, course_slug)
            DO UPDATE SET verification_code = $3
            RETURNING *;
        `;
        const result = await pool.query(insertQuery, [clerkUserId, courseSlug, verificationCode]);

        console.log(`✅ Certificate generated: ${clerkUserId} -> ${courseSlug}`);
        res.json({ success: true, certificate: result.rows[0] });
    } catch (err) {
        console.error('❌ Certificate generation error:', err);
        res.status(500).json({ error: 'Failed to generate certificate' });
    }
});

// Get certificate by ID
router.get('/:certificateId', async (req, res) => {
    const { certificateId } = req.params;

    try {
        const query = `
            SELECT * FROM certificates WHERE id = $1;
        `;
        const result = await pool.query(query, [certificateId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Certificate not found' });
        }

        res.json({ success: true, certificate: result.rows[0] });
    } catch (err) {
        console.error('❌ Error fetching certificate:', err);
        res.status(500).json({ error: 'Failed to fetch certificate' });
    }
});

// Get all certificates for a user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT * FROM certificates
            WHERE clerk_user_id = $1
            ORDER BY issued_at DESC;
        `;
        const result = await pool.query(query, [userId]);

        res.json({ success: true, certificates: result.rows });
    } catch (err) {
        console.error('❌ Error fetching certificates:', err);
        res.status(500).json({ error: 'Failed to fetch certificates' });
    }
});

// Verify certificate by code
router.get('/verify/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const query = `
            SELECT c.*, e.completed_at
            FROM certificates c
            JOIN enrollments e ON c.clerk_user_id = e.clerk_user_id AND c.course_slug = e.course_slug
            WHERE c.verification_code = $1;
        `;
        const result = await pool.query(query, [code.toUpperCase()]);

        if (result.rowCount === 0) {
            return res.status(404).json({ valid: false, error: 'Certificate not found' });
        }

        res.json({ valid: true, certificate: result.rows[0] });
    } catch (err) {
        console.error('❌ Error verifying certificate:', err);
        res.status(500).json({ error: 'Failed to verify certificate' });
    }
});

export default router;
