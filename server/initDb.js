import pool from './db.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    course_slug VARCHAR(100),
    clerk_user_id VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS mentors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    linkedin_resume_url TEXT,
    expertise TEXT,
    clerk_user_id VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) NOT NULL,
    course_slug VARCHAR(255) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    payment_id VARCHAR(255),
    UNIQUE(clerk_user_id, course_slug)
  );

  CREATE TABLE IF NOT EXISTS course_progress (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) NOT NULL,
    course_slug VARCHAR(255) NOT NULL,
    week INTEGER NOT NULL,
    day INTEGER NOT NULL,
    completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    UNIQUE(clerk_user_id, course_slug, week, day)
  );

  CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) NOT NULL,
    course_slug VARCHAR(255) NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_url TEXT,
    verification_code VARCHAR(50) UNIQUE,
    UNIQUE(clerk_user_id, course_slug)
  );
`;

const initDb = async () => {
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log("✅ Database tables created successfully or already exist.");
    client.release();
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  } finally {
    await pool.end();
  }
};

initDb();
