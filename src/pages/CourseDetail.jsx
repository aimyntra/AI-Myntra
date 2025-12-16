import React, { useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { courses } from '../data/courses';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Calendar, Clock, Monitor, CheckCircle, Zap, Users, Layers, ChevronRight, Award, Sparkles } from 'lucide-react';

export default function CourseDetail() {
    const { slug } = useParams();
    const course = courses.find((c) => c.slug === slug);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!course) {
        return <Navigate to="/" replace />;
    }

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#a3ff12] selection:text-black overflow-x-hidden">
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#a3ff12] origin-left z-50" style={{ scaleX }} />
            <Navbar />

            {/* Added extra top padding (pt-64) to prevent header clutter */}
            <main className="max-w-[1100px] mx-auto px-6 pt-64 pb-24 space-y-32">

                {/* 1. HERO COURSE CARD */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="relative group"
                >
                    {/* Floating Glow Effect */}
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#a3ff12] opacity-[0.05] blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>

                    <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-black/50">
                        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16">
                            {/* Left: Content */}
                            <div className="flex-1">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 bg-white/5 border border-white/5 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full mb-8 uppercase tracking-wider"
                                >
                                    <Zap size={12} className="text-[#a3ff12]" />
                                    {course.format.type}
                                </motion.div>

                                <motion.h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                >
                                    {course.title}
                                </motion.h1>

                                <motion.p
                                    className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl font-light"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {course.tagline}
                                </motion.p>

                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(163, 255, 18, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-[#a3ff12] text-black font-bold text-lg rounded-xl flex items-center justify-center gap-2 group/btn"
                                >
                                    Apply Now
                                    <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>

                            {/* Right: Metadata Cards */}
                            <motion.div
                                className="lg:w-[320px] flex flex-col gap-4"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {[
                                    { icon: Calendar, label: "Start Date", val: "Upcoming Cohort" },
                                    { icon: Clock, label: "Duration", val: course.duration },
                                    { icon: Monitor, label: "Format", val: course.format.access }
                                ].map((meta, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                                        whileHover={{ x: -4, backgroundColor: "rgba(255,255,255,0.05)" }}
                                        className="bg-white/[0.03] border border-white/5 p-5 rounded-xl flex items-center gap-4 cursor-default transition-colors"
                                    >
                                        <div className="p-2.5 bg-white/5 rounded-lg text-[#a3ff12]"><meta.icon size={20} /></div>
                                        <div>
                                            <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{meta.label}</div>
                                            <div className="font-medium">{meta.val}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* 2. AUDIENCE (Small Card Row) */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="flex items-center gap-4 mb-8 opacity-50">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Who This Is For</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {course.audience.slice(0, 3).map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.15)" }}
                                className="bg-[#121212] border border-white/5 p-6 rounded-2xl transition-colors cursor-default"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#a3ff12] mb-4">
                                    <Users size={18} />
                                </div>
                                <p className="text-gray-300 font-medium leading-normal">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 3. MASTERY GRID */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="flex items-center gap-4 mb-8 opacity-50">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What You Will Master</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {course.skills.map((skill, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02, backgroundColor: "#151515" }}
                                className="bg-[#121212] border border-white/5 p-8 rounded-2xl group transition-colors"
                            >
                                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#a3ff12] transition-colors">{skill}</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm text-gray-400">
                                        <CheckCircle size={14} className="mt-0.5 text-[#a3ff12]" />
                                        <span>Advanced techniques</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-gray-400">
                                        <CheckCircle size={14} className="mt-0.5 text-[#a3ff12]" />
                                        <span>Production-grade workflow</span>
                                    </li>
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 4. CURRICULUM GRID */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2, once: true }}
                >
                    <div className="flex items-center gap-4 mb-12 opacity-50">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Curriculum Details</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {course.structure.map((module, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ borderColor: "rgba(163, 255, 18, 0.3)" }}
                                className="bg-[#121212] border border-white/5 p-8 rounded-2xl flex flex-col relative overflow-hidden group"
                            >
                                {/* Subtle Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#a3ff12]/0 to-[#a3ff12]/0 group-hover:from-[#a3ff12]/5 group-hover:to-transparent transition-colors duration-500"></div>

                                <span className="text-[#a3ff12] font-mono text-xs uppercase tracking-wider block mb-3 relative z-10">
                                    {module.title}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-6 leading-tight relative z-10">
                                    {module.focus}
                                </h3>

                                <div className="space-y-3 mt-auto relative z-10">
                                    {module.outcomes.map((outcome, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                            <div className="w-1.5 h-1.5 bg-white/10 rounded-full mt-1.5 flex-shrink-0 group-hover:bg-[#a3ff12] transition-colors"></div>
                                            <span className="leading-relaxed">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 5. TOOLS STACK */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a3ff12]/50 to-transparent"></div>
                        <h2 className="text-2xl font-bold mb-10">Production Stack</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {Object.entries(course.tools).map(([category, items], idx) => (
                                items.length > 0 && (
                                    <motion.div
                                        key={category}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex flex-col gap-4"
                                    >
                                        <div className="text-[#a3ff12] font-mono text-xs uppercase tracking-wider border-b border-white/5 pb-2">
                                            {category === 'llms' ? 'LLMs / Models' : category}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {items.map((tool, i) => (
                                                <div key={i} className="text-gray-400 flex items-center gap-2 text-sm">
                                                    <Sparkles size={10} className="text-[#a3ff12]/50" />
                                                    {tool}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* 6. PROJECTS */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-8 opacity-50">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Key Artifacts</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {course.projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                                whileHover={{ y: -8 }}
                                className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden group flex flex-col shadow-lg"
                            >
                                <div className="h-56 bg-white/[0.02] border-b border-white/5 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <Layers size={48} className="text-white/20 group-hover:text-[#a3ff12] transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                        {project.description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-[#a3ff12] text-sm font-bold group/link">
                                        View Artifact <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 7. FORMAT & CERTIFICATION */}
                <motion.section
                    className="grid md:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {[
                        { title: "Certification", val: course.format.certification, icon: Award },
                        { title: "Access", val: course.format.access, icon: Monitor },
                        { title: "Community", val: "Private Discord", icon: Users }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                            className="bg-[#121212] border border-white/5 p-6 rounded-2xl text-center"
                        >
                            <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-2">{item.title}</div>
                            <div className="text-white font-bold text-lg flex items-center justify-center gap-2">
                                <item.icon size={18} className="text-[#a3ff12]" />
                                {item.val}
                            </div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* 8. CTA CARD */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-white/5 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-4xl mx-auto"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]"></div>
                    <div className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-[#a3ff12] opacity-[0.05] blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-5xl font-bold mb-6 text-white"
                        >
                            Ready to Build?
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 mb-10 text-lg max-w-xl mx-auto"
                        >
                            Join a community of elite engineers. Apply for the next cohort and fast-track your AI career.
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(163, 255, 18, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-[#a3ff12] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(163,255,18,0.2)]"
                        >
                            Secure Your Spot
                        </motion.button>
                    </div>
                </motion.section>

            </main>
            <Footer />
        </div>
    );
}
