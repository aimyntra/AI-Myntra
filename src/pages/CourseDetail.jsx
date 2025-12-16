import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { courses } from '../data/courses';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Calendar, Clock, Monitor, CheckCircle, ArrowRight, Zap, Users, BookOpen } from 'lucide-react';

export default function CourseDetail() {
    const { slug } = useParams();
    const course = courses.find((c) => c.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!course) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#a3ff12] selection:text-black">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">

                {/* 1. HERO FLASH CARD */}
                <section className="relative rounded-[2rem] overflow-hidden bg-[#121212] border border-white/10 p-8 md:p-14 mb-24 group">
                    {/* Abstract Noise/Texture Background */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#a3ff12] opacity-[0.02] blur-[150px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-sm mb-8 uppercase tracking-wider">
                                <Zap size={12} fill="currentColor" />
                                {course.format.type}
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-white mb-8 tracking-tight leading-[1.1]">
                                {course.title}
                            </h1>

                            <p className="text-xl text-gray-400 mb-12 leading-relaxed font-light max-w-xl">
                                {course.tagline}
                            </p>

                            {/* Metadata Columns */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-12 border-t border-white/10 pt-8">
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Start Date</div>
                                    <div className="text-white font-medium flex items-center gap-2">
                                        <Calendar size={16} className="text-[#a3ff12]" />
                                        Coming Soon
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Format</div>
                                    <div className="text-white font-medium flex items-center gap-2">
                                        <Monitor size={16} className="text-[#a3ff12]" />
                                        Live Interactive
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Duration</div>
                                    <div className="text-white font-medium flex items-center gap-2">
                                        <Clock size={16} className="text-[#a3ff12]" />
                                        {course.duration}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Side (Desktop) */}
                        <div className="w-full md:w-auto md:min-w-[300px] flex flex-col gap-4 mt-auto">
                            <button className="w-full bg-[#a3ff12] text-black font-bold text-lg py-5 rounded-xl hover:bg-[#b4ff3d] transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(163,255,18,0.2)]">
                                Register Now
                            </button>
                            <div className="text-center text-xs text-gray-500">
                                Limited seats available for next cohort
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. SUMMARY GRID (Reference Image 2 Style) */}
                <section className="grid md:grid-cols-3 gap-6 mb-24">
                    {/* Card 1: Who */}
                    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white">
                            <Users size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Fellowship Format</h3>
                        <div className="inline-block bg-[#a3ff12]/10 text-[#a3ff12] text-[10px] font-bold px-2 py-1 rounded mb-4 uppercase">
                            Cohort Based
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Designed for professionals who want to learn alongside a curated group of peers.
                        </p>
                        <ul className="space-y-3">
                            {course.audience.slice(0, 3).map((item, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                    <CheckCircle size={14} className="mt-1 text-[#a3ff12]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 2: What */}
                    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Deep Skilling</h3>
                        <div className="inline-block bg-[#a3ff12]/10 text-[#a3ff12] text-[10px] font-bold px-2 py-1 rounded mb-4 uppercase">
                            Project Focused
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            We don't do theory. You will build production-grade artifacts every single week.
                        </p>
                        <ul className="space-y-3">
                            {course.skills.slice(0, 3).map((item, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                    <CheckCircle size={14} className="mt-1 text-[#a3ff12]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 3: Outcome */}
                    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white">
                            <BookOpen size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Outcomes</h3>
                        <div className="inline-block bg-[#a3ff12]/10 text-[#a3ff12] text-[10px] font-bold px-2 py-1 rounded mb-4 uppercase">
                            Career Ready
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Walk away with a portfolio that speaks louder than your resume.
                        </p>
                        <ul className="space-y-3">
                            {course.outcomes.slice(0, 3).map((item, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                    <CheckCircle size={14} className="mt-1 text-[#a3ff12]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <div className="w-full h-px bg-white/5 mb-24"></div>

                {/* 3. CURRICULUM TIMELINE (Keep clean text but wrapped nicely) */}
                <section className="mb-24 px-4 md:px-0">
                    <h2 className="text-3xl font-serif font-medium mb-16 text-white text-center">Curriculum Layout</h2>
                    <div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/10 md:before:left-[50%]">

                        {course.structure.map((module, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Connection Dot */}
                                <div className="absolute left-[-4px] md:left-[50%] md:ml-[-4px] w-[9px] h-[9px] rounded-full bg-[#a3ff12] shadow-[0_0_10px_#a3ff12]"></div>

                                {/* Content Card */}
                                <div className="md:w-1/2 w-full pl-8 md:pl-0">
                                    <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-white/20 transition-all group">
                                        <div className="text-[#a3ff12] font-mono text-xs uppercase tracking-wider mb-2">
                                            {module.title}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#a3ff12] transition-colors">{module.focus}</h3>
                                        <ul className="space-y-2">
                                            {module.outcomes.map((outcome, i) => (
                                                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <span className="w-1 h-1 bg-gray-500 rounded-full mt-2"></span>
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Spacer for Timeline balance */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. TOOLS GRID */}
                <section className="mb-24">
                    <div className="bg-[#121212] border border-white/5 rounded-3xl p-10 md:p-14">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="md:w-1/3">
                                <h2 className="text-3xl font-serif font-medium text-white mb-4">Production Stack</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We don't teach "hello world". We teach the stack used by top AI engineering teams in San Francisco.
                                </p>
                            </div>
                            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {Object.entries(course.tools).map(([category, items]) => (
                                    items.length > 0 && (
                                        <div key={category}>
                                            <h4 className="text-white font-bold mb-4 capitalize flex items-center gap-2">
                                                {category === 'llms' ? 'LLMs' : category}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((tool, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-gray-300 hover:bg-[#a3ff12]/10 hover:text-[#a3ff12] hover:border-[#a3ff12]/20 transition-all cursor-default">
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="text-center pb-20">
                    <button className="px-12 py-5 bg-[#a3ff12] text-black font-bold text-lg rounded-xl hover:bg-[#b4ff3d] transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(163,255,18,0.3)]">
                        Apply for {course.title}
                    </button>
                    <p className="mt-6 text-gray-500 text-sm">Applications reviewed on a rolling basis.</p>
                </section>

            </main>
            <Footer />
        </div>
    );
}
