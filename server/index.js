import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API Endpoint to capture leads
app.post('/api/intake', async (req, res) => {
    const { email, courseSlug, userId } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const query = `
      INSERT INTO leads (email, course_slug, clerk_user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
        const values = [email, courseSlug || null, userId || null];

        const result = await pool.query(query, values);

        console.log(`✅ Lead captured: ${email}`);
        res.json({ success: true, lead: result.rows[0] });

    } catch (err) {
        console.error('❌ Database error:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// API Endpoint for Mentor Application
app.post('/api/apply-mentor', async (req, res) => {
    const { name, email, phone, linkedin, expertise, userId } = req.body;

    if (!email || !name) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    try {
        const query = `
      INSERT INTO mentors (name, email, phone, linkedin_resume_url, expertise, clerk_user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
        const values = [name, email, phone || null, linkedin || null, expertise || null, userId || null];

        const result = await pool.query(query, values);

        console.log(`✅ Mentor Application: ${name} (${email})`);
        res.json({ success: true, mentor: result.rows[0] });

    } catch (err) {
        console.error('❌ Database error:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
