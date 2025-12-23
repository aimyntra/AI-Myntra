import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, LogOut, Settings, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnrolledCourseCard from '../components/dashboard/EnrolledCourseCard';
import ProgressStats from '../components/dashboard/ProgressStats';
import { courses } from '../data/courses';

export default function Dashboard() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            fetchEnrollments();
        }
    }, [isLoaded, isSignedIn, user]);

    const fetchEnrollments = async () => {
        try {
            const response = await fetch(`/api/enrollments/${user.id}`);
            const data = await response.json();

            if (data.success) {
                setEnrollments(data.enrollments);
            }
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    // Redirect to sign-in if not authenticated
    if (isLoaded && !isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12 mt-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                Welcome back, {user?.firstName || 'Learner'}! 👋
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Continue your learning journey or explore new courses
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/certificates">
                                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                                    <Award size={18} />
                                    Certificates
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>

                {/* Stats */}
                <ProgressStats enrollments={enrollments} />

                {/* Enrolled Courses */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <BookOpen size={24} className="text-[#00ff88]" />
                        My Courses
                    </h2>

                    {enrollments.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-[#121216] border border-white/10 rounded-2xl p-12 text-center"
                        >
                            <div className="w-20 h-20 bg-[#00ff88]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen size={40} className="text-[#00ff88]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Courses Yet</h3>
                            <p className="text-gray-400 mb-6">
                                Start your AI learning journey by enrolling in a course
                            </p>
                            <Link to="/">
                                <button className="px-6 py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:scale-105 transition-transform">
                                    Browse Courses
                                </button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrollments.map((enrollment, index) => {
                                const courseData = courses.find(c => c.slug === enrollment.course_slug);
                                return (
                                    <motion.div
                                        key={enrollment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <EnrolledCourseCard
                                            enrollment={enrollment}
                                            courseData={courseData}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Explore More */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-[#00ff88]/10 to-[#00cc6a]/10 border border-[#00ff88]/20 rounded-2xl p-8 text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Ready to level up?
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Explore more courses and expand your AI expertise
                    </p>
                    <Link to="/">
                        <button className="px-8 py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                            Browse All Courses
                        </button>
                    </Link>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
