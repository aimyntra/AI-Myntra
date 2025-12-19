import pool from './db.js';

// Test User Details
const TEST_USER_ID = 'test_user_123'; // You'll replace this with your actual Clerk user ID
const TEST_COURSE_SLUG = 'ai-empowerment-mastery';

const createTestEnrollment = async () => {
    try {
        // 1. Create enrollment
        const enrollmentQuery = `
            INSERT INTO enrollments (clerk_user_id, course_slug, progress, payment_id)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (clerk_user_id, course_slug) DO NOTHING
            RETURNING *;
        `;
        const enrollmentResult = await pool.query(enrollmentQuery, [
            TEST_USER_ID,
            TEST_COURSE_SLUG,
            35, // 35% progress
            'test_payment_123'
        ]);

        console.log('✅ Test enrollment created:', enrollmentResult.rows[0]);

        // 2. Add some progress entries (completed a few lessons)
        const progressEntries = [
            { week: 1, day: 1 },
            { week: 1, day: 2 },
            { week: 1, day: 3 },
            { week: 2, day: 1 },
            { week: 2, day: 2 },
        ];

        for (const entry of progressEntries) {
            const progressQuery = `
                INSERT INTO course_progress (clerk_user_id, course_slug, week, day)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (clerk_user_id, course_slug, week, day) DO NOTHING;
            `;
            await pool.query(progressQuery, [
                TEST_USER_ID,
                TEST_COURSE_SLUG,
                entry.week,
                entry.day
            ]);
        }

        console.log(`✅ Added ${progressEntries.length} completed lessons`);
        console.log('\n🎉 Test data created successfully!');
        console.log(`\nNow sign in with Clerk using the user ID: ${TEST_USER_ID}`);
        console.log('Then visit: http://localhost:5173/dashboard\n');

    } catch (err) {
        console.error('❌ Error creating test data:', err);
    } finally {
        await pool.end();
    }
};

createTestEnrollment();
