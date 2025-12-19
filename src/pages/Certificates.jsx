import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CertificateCard from '../components/dashboard/CertificateCard';
import { courses } from '../data/courses';

export default function Certificates() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            fetchCertificates();
        }
    }, [isLoaded, isSignedIn, user]);

    const fetchCertificates = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/certificate/user/${user.id}`);
            const data = await response.json();

            if (data.success) {
                setCertificates(data.certificates);
            }
        } catch (error) {
            console.error('Error fetching certificates:', error);
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
                    <Link to="/dashboard">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </button>
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-[#00ff88]/10 flex items-center justify-center border-2 border-[#00ff88]/30">
                            <Award size={32} className="text-[#00ff88]" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                My Certificates
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Your achievements and completed courses
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>

                {/* Certificates Grid */}
                {certificates.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#121216] border border-white/10 rounded-2xl p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-[#00ff88]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#00ff88]/20">
                            <Award size={40} className="text-[#00ff88]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Certificates Yet</h3>
                        <p className="text-gray-400 mb-6">
                            Complete a course to earn your first certificate
                        </p>
                        <Link to="/dashboard">
                            <button className="px-6 py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:scale-105 transition-transform">
                                Continue Learning
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((certificate, index) => {
                            const courseData = courses.find(c => c.slug === certificate.course_slug);
                            return (
                                <motion.div
                                    key={certificate.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <CertificateCard
                                        certificate={certificate}
                                        courseData={courseData}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
