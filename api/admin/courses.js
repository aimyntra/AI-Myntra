import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const { slug } = req.query;
            if (slug) {
                const result = await pool.query('SELECT * FROM courses WHERE slug = $1', [slug]);
                return res.status(200).json({ success: true, course: result.rows[0] });
            }
            const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
            return res.status(200).json({ success: true, courses: result.rows });
        }

        if (req.method === 'POST') {
            const {
                title, slug, description, price, original_price,
                image_url, curriculum, learning_outcomes,
                target_audience, level, status
            } = req.body;

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
            return res.status(201).json({ success: true, course: result.rows[0] });
        }

        if (req.method === 'PUT') {
            const { id } = req.query;
            const {
                title, slug, description, price, original_price,
                image_url, curriculum, learning_outcomes,
                target_audience, level, status
            } = req.body;

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
            return res.status(200).json({ success: true, course: result.rows[0] });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Course Management Error:', error);
        return res.status(500).json({ error: error.message || 'Failed to manage course' });
    }
}
