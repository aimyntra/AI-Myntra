import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Menu, X } from 'lucide-react';
import { courses } from '../data/courses';
import CoursePlayerSidebar from '../components/course-player/CoursePlayerSidebar';
import LessonContent from '../components/course-player/LessonContent';

export default function CoursePlayer() {
    const { courseSlug } = useParams();
    const { user, isLoaded, isSignedIn } = useUser();

    const [isEnrolled, setIsEnrolled] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [marking, setMarking] = useState(false);

    const course = courses.find(c => c.slug === courseSlug);

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            checkEnrollment();
            fetchProgress();
        }
    }, [isLoaded, isSignedIn, user, courseSlug]);

    const checkEnrollment = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/enrollment/${user.id}/${courseSlug}`);
            const data = await response.json();
            setIsEnrolled(data.enrolled);
        } catch (error) {
            console.error('Error checking enrollment:', error);
            setIsEnrolled(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchProgress = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/progress/${user.id}/${courseSlug}`);
            const data = await response.json();

            if (data.success) {
                setCompletedLessons(data.progress);
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    };

    const handleLessonSelect = (week, day, lessonData) => {
        setCurrentLesson({ week, day, ...lessonData });
    };

    const markLessonComplete = async () => {
        if (!currentLesson || marking) return;

        setMarking(true);
        try {
            const response = await fetch('http://localhost:5000/api/progress/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clerkUserId: user.id,
                    courseSlug: courseSlug,
                    week: currentLesson.week,
                    day: getDayNumber(currentLesson.day)
                })
            });

            const data = await response.json();
            if (data.success) {
                // Refresh progress
                await fetchProgress();
                console.log('✅ Lesson marked complete');
            }
        } catch (error) {
            console.error('Error marking lesson complete:', error);
        } finally {
            setMarking(false);
        }
    };

    const getDayNumber = (dayString) => {
        // Extract number from "Day 1" format
        return parseInt(dayString.replace('Day ', ''));
    };

    const isCurrentLessonCompleted = () => {
        if (!currentLesson) return false;
        const dayNum = getDayNumber(currentLesson.day);
        return completedLessons.some(l => l.week === currentLesson.week && l.day === dayNum);
    };

    const goToNextLesson = () => {
        if (!course?.curriculum || !currentLesson) return;

        const currentWeek = course.curriculum.find(w => w.week === currentLesson.week);
        const currentDayNum = getDayNumber(currentLesson.day);

        // Try next day in same week
        if (currentDayNum < currentWeek.days.length) {
            const nextDay = currentWeek.days[currentDayNum]; // Array is 0-indexed
            handleLessonSelect(currentLesson.week, currentDayNum + 1, nextDay);
        } else {
            // Go to first day of next week
            const nextWeek = course.curriculum.find(w => w.week === currentLesson.week + 1);
            if (nextWeek && nextWeek.days.length > 0) {
                handleLessonSelect(nextWeek.week, 1, nextWeek.days[0]);
            }
        }
    };

    const goToPreviousLesson = () => {
        if (!course?.curriculum || !currentLesson) return;

        const currentDayNum = getDayNumber(currentLesson.day);

        // Try previous day in same week
        if (currentDayNum > 1) {
            const currentWeek = course.curriculum.find(w => w.week === currentLesson.week);
            const prevDay = currentWeek.days[currentDayNum - 2]; // Array is 0-indexed
            handleLessonSelect(currentLesson.week, currentDayNum - 1, prevDay);
        } else {
            // Go to last day of previous week
            const prevWeek = course.curriculum.find(w => w.week === currentLesson.week - 1);
            if (prevWeek && prevWeek.days.length > 0) {
                const lastDay = prevWeek.days[prevWeek.days.length - 1];
                handleLessonSelect(prevWeek.week, prevWeek.days.length, lastDay);
            }
        }
    };

    // Redirect if not signed in
    if (isLoaded && !isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    // Loading state
    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Not enrolled
    if (!isEnrolled) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-6">
                <div className="max-w-md text-center">
                    <h1 className="text-3xl font-bold mb-4">Not Enrolled</h1>
                    <p className="text-gray-400 mb-6">
                        You need to enroll in this course to access the content.
                    </p>
                    <Link to={`/programs/${courseSlug}`}>
                        <button className="px-6 py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:scale-105 transition-transform">
                            Enroll Now
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!course) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="h-screen bg-[#0a0a0f] text-white flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="h-16 bg-[#121216] border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <Link to="/dashboard">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={18} />
                            <span className="hidden sm:inline">Back to Dashboard</span>
                        </button>
                    </Link>
                </div>

                <div className="text-center hidden md:block">
                    <p className="text-sm text-gray-400">
                        {completedLessons.length} / {course.curriculum?.reduce((sum, w) => sum + w.days.length, 0)} lessons completed
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {currentLesson && (
                        <button
                            onClick={markLessonComplete}
                            disabled={isCurrentLessonCompleted() || marking}
                            className={`
                                px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2
                                ${isCurrentLessonCompleted()
                                    ? 'bg-[#00ff88]/20 text-[#00ff88] cursor-not-allowed'
                                    : 'bg-[#00ff88] text-black hover:scale-105'
                                }
                            `}
                        >
                            <CheckCircle size={16} />
                            {isCurrentLessonCompleted() ? 'Completed' : marking ? 'Marking...' : 'Mark Complete'}
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`
                        ${sidebarOpen ? 'w-80' : 'w-0'}
                        transition-all duration-300 flex-shrink-0 overflow-hidden
                    `}
                >
                    <CoursePlayerSidebar
                        course={course}
                        currentLesson={currentLesson}
                        onLessonSelect={handleLessonSelect}
                        completedLessons={completedLessons}
                    />
                </div>

                {/* Lesson Content */}
                <div className="flex-1 overflow-y-auto">
                    <LessonContent
                        lesson={currentLesson}
                        week={currentLesson?.week}
                    />

                    {/* Navigation Controls */}
                    {currentLesson && (
                        <div className="sticky bottom-0 bg-[#121216]/95 backdrop-blur-lg border-t border-white/10 p-4">
                            <div className="max-w-4xl mx-auto flex items-center justify-between">
                                <button
                                    onClick={goToPreviousLesson}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-2"
                                >
                                    <ChevronLeft size={18} />
                                    Previous
                                </button>

                                <button
                                    onClick={goToNextLesson}
                                    className="px-4 py-2 bg-[#00ff88] text-black font-semibold rounded-xl hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    Next
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
