import pool from './db.js';

// Test User Details
const TEST_USER_ID = 'user_36y8LaZ4na2OtXBpGYcvCxq2GsD'; // Correct Clerk user ID
const TEST_COURSES = [
    { slug: 'ai-empowerment-mastery', progress: 35 },
    { slug: 'ai-engineering-accelerator', progress: 65 },
];

const createTestEnrollment = async () => {
    try {
        console.log('Creating test data for user:', TEST_USER_ID);

        for (const course of TEST_COURSES) {
            // 1. Create enrollment
            const enrollmentQuery = `
                INSERT INTO enrollments (clerk_user_id, course_slug, progress, payment_id)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (clerk_user_id, course_slug) DO NOTHING
                RETURNING *;
            `;
            const enrollmentResult = await pool.query(enrollmentQuery, [
                TEST_USER_ID,
                course.slug,
                course.progress,
                `test_payment_${Date.now()}`
            ]);

            console.log(`✅ Enrollment created for ${course.slug}:`, enrollmentResult.rows[0]);

            // 2. Add some progress entries based on progress percentage
            const lessonsToComplete = Math.floor((course.progress / 100) * 15); // Assuming ~15 lessons
            const progressEntries = [];

            for (let i = 1; i <= lessonsToComplete; i++) {
                const week = Math.ceil(i / 5);
                const day = ((i - 1) % 5) + 1;
                progressEntries.push({ week, day });
            }

            for (const entry of progressEntries) {
                const progressQuery = `
                    INSERT INTO course_progress (clerk_user_id, course_slug, week, day)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (clerk_user_id, course_slug, week, day) DO NOTHING;
                `;
                await pool.query(progressQuery, [
                    TEST_USER_ID,
                    course.slug,
                    entry.week,
                    entry.day
                ]);
            }

            console.log(`✅ Added ${progressEntries.length} completed lessons for ${course.slug}`);
        }

        console.log('\n🎉 Test data created successfully!');
        console.log('\nNow visit: http://localhost:5173/dashboard\n');

    } catch (err) {
        console.error('❌ Error creating test data:', err);
    } finally {
        await pool.end();
    }
};

createTestEnrollment();
