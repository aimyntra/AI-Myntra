import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { courses } from '../data/courses';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Calendar, Clock, Monitor, CheckCircle, Zap, Users, Layers, ChevronRight, Award } from 'lucide-react';

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

            {/* Added extra top padding (pt-64) to prevent header clutter */}
            <main className="max-w-[1100px] mx-auto px-6 pt-64 pb-24 space-y-24">

                {/* 1. HERO COURSE CARD */}
                <section className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a3ff12] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Left: Content */}
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/5 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full mb-8 uppercase tracking-wider">
                                <Zap size={12} className="text-[#a3ff12]" />
                                {course.format.type}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                                {course.title}
                            </h1>

                            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl font-light">
                                {course.tagline}
                            </p>

                            <button className="w-full sm:w-auto px-8 py-4 bg-[#a3ff12] text-black font-bold text-lg rounded-xl hover:bg-[#b4ff3d] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                                Apply Now
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        {/* Right: Metadata Cards */}
                        <div className="lg:w-[320px] flex flex-col gap-4">
                            <div className="bg-white/[0.03] border border-white/5 p-5 rounded-xl flex items-center gap-4">
                                <div className="p-2.5 bg-white/5 rounded-lg text-[#a3ff12]"><Calendar size={20} /></div>
                                <div>
                                    <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Start Date</div>
                                    <div className="font-medium">Upcoming Cohort</div>
                                </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/5 p-5 rounded-xl flex items-center gap-4">
                                <div className="p-2.5 bg-white/5 rounded-lg text-[#a3ff12]"><Clock size={20} /></div>
                                <div>
                                    <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Duration</div>
                                    <div className="font-medium">{course.duration}</div>
                                </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/5 p-5 rounded-xl flex items-center gap-4">
                                <div className="p-2.5 bg-white/5 rounded-lg text-[#a3ff12]"><Monitor size={20} /></div>
                                <div>
                                    <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Format</div>
                                    <div className="font-medium">{course.format.access}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. AUDIENCE (Small Card Row) */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Who This Is For</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {course.audience.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="bg-[#121212] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
                                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-[#a3ff12] mb-4">
                                    <Users size={16} />
                                </div>
                                <p className="text-gray-300 font-medium leading-normal">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. MASTERY GRID */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What You Will Master</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {course.skills.map((skill, idx) => (
                            <div key={idx} className="bg-[#121212] border border-white/5 p-8 rounded-2xl group hover:border-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#a3ff12] transition-colors">{skill}</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm text-gray-400">
                                        <CheckCircle size={14} className="mt-0.5 text-[#a3ff12]" />
                                        <span>Advanced {skill.toLowerCase()} techniques</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-gray-400">
                                        <CheckCircle size={14} className="mt-0.5 text-[#a3ff12]" />
                                        <span>Real-world application scenarios</span>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. CURRICULUM GRID (New Card Grid Style) */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Curriculum Details</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {course.structure.map((module, idx) => (
                            <div key={idx} className="bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-colors flex flex-col">
                                <span className="text-[#a3ff12] font-mono text-xs uppercase tracking-wider block mb-3">
                                    {module.title}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-6 leading-tight">
                                    {module.focus}
                                </h3>

                                <div className="space-y-3 mt-auto">
                                    {module.outcomes.map((outcome, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                            <div className="w-1.5 h-1.5 bg-white/10 rounded-full mt-1.5 flex-shrink-0"></div>
                                            <span className="leading-relaxed">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. TOOLS STACK */}
                <section>
                    <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-10">Production Stack</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {Object.entries(course.tools).map(([category, items]) => (
                                items.length > 0 && (
                                    <div key={category} className="flex flex-col gap-4">
                                        <div className="text-[#a3ff12] font-mono text-xs uppercase tracking-wider border-b border-white/5 pb-2">
                                            {category === 'llms' ? 'LLMs / Models' : category}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {items.map((tool, i) => (
                                                <div key={i} className="text-gray-400 flex items-center gap-2 text-sm">
                                                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                    {tool}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. PROJECTS */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Key Artifacts</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {course.projects.map((project, idx) => (
                            <div key={idx} className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all group flex flex-col">
                                <div className="h-48 bg-white/[0.02] border-b border-white/5 flex items-center justify-center group-hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                                    <Layers size={48} className="text-white/10 group-hover:text-[#a3ff12]/20 transition-all duration-500 transform group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-50"></div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                        {project.description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-[#a3ff12] text-sm font-bold">
                                        View Artifact <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. FORMAT & CERTIFICATION */}
                <section className="grid md:grid-cols-3 gap-6">
                    <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl text-center">
                        <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-2">Certification</div>
                        <div className="text-white font-bold text-lg flex items-center justify-center gap-2">
                            <Award size={18} className="text-[#a3ff12]" />
                            {course.format.certification}
                        </div>
                    </div>
                    <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl text-center">
                        <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-2">Access</div>
                        <div className="text-white font-bold text-lg">{course.format.access}</div>
                    </div>
                    <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl text-center">
                        <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-2">Community</div>
                        <div className="text-white font-bold text-lg">Private Discord</div>
                    </div>
                </section>

                {/* 8. CTA CARD */}
                <section className="bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-white/5 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Build?</h2>
                        <p className="text-gray-400 mb-10 text-lg">
                            Join elite engineers and builders. Start shipping production-grade AI.
                        </p>
                        <button className="px-10 py-5 bg-[#a3ff12] text-black font-bold text-lg rounded-xl hover:bg-[#b4ff3d] transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(163,255,18,0.2)]">
                            Secure Your Spot
                        </button>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
