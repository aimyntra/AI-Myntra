import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { courses } from '../data/courses';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseHero from '../components/course/CourseHero';
import { AudienceSection, CurriculumTimeline } from '../components/course/CourseSections';
import { MasterySection, ArtifactsShowcase } from '../components/course/CourseContent';
import { Check, Award, Lock, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ViralEnrollmentModal from '../components/checkout/ViralEnrollmentModal';

export default function CourseDetail() {
    const { slug } = useParams();
    const course = courses.find((c) => c.slug === slug);
    const [isEnrollOpen, setIsEnrollOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!course) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-[#00ff88] selection:text-black">
            <Navbar />

            <CourseHero course={course} />

            <AudienceSection audience={course.audience} />

            <MasterySection skills={course.skills} tools={course.tools} />

            <CurriculumTimeline structure={course.structure} />

            {/* Visual Spacer/Divider between Curriculum and Artifacts */}
            <div style={{ height: '80px' }} className="bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0d0d12] flex items-center justify-center">
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
            </div>

            <ArtifactsShowcase projects={course.projects} />

            {/* Outcomes & Certification (Inline for now) */}
            <section className="py-32 bg-[#0a0a0f] border-t border-white/5">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#00ff88]">
                                <Award size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Certification</h3>
                                <p className="text-gray-400">Industry-recognized credential</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#00ff88]">
                                <Lock size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Lifetime Access</h3>
                                <p className="text-gray-400">Revisit content anytime</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#00ff88]">
                                <MessageSquare size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Private Discord</h3>
                                <p className="text-gray-400">24/7 peer support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00ff88]/10 to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-[#121216] border border-white/10 rounded-3xl p-16 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none" />

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to Build?</h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Join elite engineers and builders. Start shipping production-grade AI applications today.
                        </p>

                        <div className="flex flex-col items-center gap-4">
                            <button
                                onClick={() => setIsEnrollOpen(true)}
                                className="px-12 py-5 bg-[#00ff88] text-black font-bold text-xl rounded-2xl shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:scale-105 transition-transform flex items-center gap-3 cursor-pointer"
                            >
                                Secure Your Spot <ArrowRight />
                            </button>
                            <p className="text-[#00ff88] text-sm font-bold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                                Limited seats available
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />

            <ViralEnrollmentModal
                isOpen={isEnrollOpen}
                onClose={() => setIsEnrollOpen(false)}
                courseTitle={course.title}
            />
        </div>
    );
}
