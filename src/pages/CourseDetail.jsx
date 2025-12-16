import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { courses } from '../data/courses';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">

                {/* 1. HERO SECTION */}
                <section className="text-center mb-24">
                    <div className="text-sm font-medium text-gray-400 mb-6 tracking-wide uppercase">
                        {course.duration} — {course.format.type}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                        {course.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                        {course.tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="px-8 py-4 bg-[#a3ff12] text-black font-semibold rounded-lg hover:bg-[#b4ff3d] transition-colors w-full sm:w-auto text-base">
                            Apply for Program
                        </button>
                        <a href="#curriculum" className="text-gray-300 hover:text-white border-b border-transparent hover:border-white transition-all py-1 pb-1">
                            View Curriculum
                        </a>
                    </div>
                </section>

                <div className="w-full h-px bg-white/10 mb-20"></div>

                {/* 2. WHO THIS IS FOR */}
                <section className="mb-24">
                    <p className="text-lg text-gray-300 mb-6 font-medium">This program is designed for:</p>
                    <ul className="space-y-3 pl-4 border-l-2 border-[#a3ff12]/50">
                        {course.audience.map((item, idx) => (
                            <li key={idx} className="text-xl text-white font-light">
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 3. WHAT YOU WILL MASTER */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-10 text-white">What You Will Master</h2>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {course.skills.map((skill, idx) => (
                            <div key={idx} className="border-t border-white/10 pt-4">
                                <h3 className="text-xl font-medium text-white mb-2">{skill}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Comprehensive mastery of {skill.toLowerCase()} through direct application.
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. TOOLS STACK */}
                <section className="mb-24 py-12 bg-white/[0.02] -mx-6 px-6 sm:mx-0 sm:px-0 sm:bg-transparent sm:py-0">
                    <h2 className="text-3xl font-bold mb-10 text-white">Tools & Technologies</h2>
                    <div className="space-y-6">
                        {Object.entries(course.tools).map(([category, items]) => (
                            items.length > 0 && (
                                <div key={category} className="flex flex-col sm:flex-row sm:items-baseline border-b border-white/5 pb-4 last:border-0">
                                    <span className="text-[#a3ff12] font-mono text-sm uppercase tracking-wider w-32 flex-shrink-0 mb-2 sm:mb-0">
                                        {category}
                                    </span>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        {items.map((tool, i) => (
                                            <span key={i} className="text-gray-300 text-lg">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </section>

                {/* 5. CURRICULUM STRUCTURE */}
                <section id="curriculum" className="mb-24">
                    <h2 className="text-3xl font-bold mb-12 text-white">Curriculum Structure</h2>
                    <div className="relative border-l border-white/10 ml-3 space-y-16">
                        {course.structure.map((module, idx) => (
                            <div key={idx} className="pl-10 relative">
                                <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-[#a3ff12]"></span>
                                <div className="mb-4">
                                    <span className="text-sm font-mono text-[#a3ff12] uppercase tracking-wide">
                                        {module.title}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mt-1">{module.focus}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {module.outcomes.map((outcome, i) => (
                                        <li key={i} className="text-gray-400 before:content-['—'] before:mr-2 before:text-gray-600">
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. WHAT YOU WILL BUILD */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-10 text-white">Artifacts You Will Build</h2>
                    <div className="grid gap-8">
                        {course.projects.map((project, idx) => (
                            <div key={idx} className="bg-white/[0.03] border border-white/5 p-8 sm:p-10 rounded-lg hover:border-white/10 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                                <p className="text-gray-400 leading-relaxed max-w-2xl">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. OUTCOMES */}
                <section className="mb-24">
                    <h2 className="text-2xl font-semibold mb-8 text-white">Learning Outcomes</h2>
                    <div className="flex flex-col gap-4">
                        {course.outcomes.map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-4 text-lg text-gray-300">
                                <span className="text-[#a3ff12] font-bold">0{idx + 1}</span>
                                {outcome}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="w-full h-px bg-white/10 mb-20"></div>

                {/* 8. FORMAT & 9. ETHICS */}
                <section className="grid md:grid-cols-2 gap-16 mb-32">
                    <div>
                        <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Format & Access</h4>
                        <div className="space-y-4">
                            <div>
                                <span className="block text-gray-500 text-sm mb-1">Type</span>
                                <span className="text-white text-lg">{course.format.type}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 text-sm mb-1">Access</span>
                                <span className="text-white text-lg">{course.format.access}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 text-sm mb-1">Certification</span>
                                <span className="text-[#a3ff12] text-lg">{course.format.certification}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Ethics & Responsibility</h4>
                        <p className="text-gray-400 leading-relaxed font-light">
                            {course.ethics}
                        </p>
                    </div>
                </section>

                {/* 10. FINAL CTA */}
                <section className="text-center py-20 bg-white/[0.02] rounded-2xl border border-white/5">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Build the future.</h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                        Stop watching tutorials. Start shipping production-grade AI systems.
                    </p>
                    <button className="px-10 py-4 bg-[#a3ff12] text-black font-bold text-lg rounded-lg hover:bg-[#b4ff3d] transition-all transform hover:-translate-y-0.5">
                        Secure Your Spot
                    </button>
                </section>

            </main>
            <Footer />
        </div>
    );
}
