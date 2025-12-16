import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { Check, ArrowRight, Star, Shield, Cpu, Users, Zap, BookOpen, Layout } from 'lucide-react';
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
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-main)] font-sans selection:bg-[var(--accent-green)] selection:text-black">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)] via-transparent to-[var(--bg-color)] z-10"></div>
                <div className="absolute inset-0 opacity-20">
                    <img src={course.heroImage} alt={course.title} className="w-full h-full object-cover grayscale" />
                </div>

                <div className="container relative z-20 mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-color)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse"></span>
                        <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{course.duration}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white text-balance">
                        {course.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto mb-10 text-balance leading-relaxed">
                        {course.tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-[var(--accent-green)] text-black font-semibold rounded-lg hover:bg-[#2ed60f] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                            Apply for Program
                        </button>
                        <Link to="/" className="px-8 py-4 bg-transparent border border-[var(--border-color)] text-white font-medium rounded-lg hover:bg-white/5 transition-all w-full sm:w-auto">
                            View Methodology
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. WHO THIS IS FOR */}
            <section className="py-20 border-b border-[var(--border-color)]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                                <Users className="text-[var(--accent-green)]" />
                                Who This Is For
                            </h2>
                            <p className="text-[var(--text-muted)]">Designed specifically for professionals ready to integrate AI deeply into their work.</p>
                        </div>
                        <div className="md:w-2/3 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {course.audience.map((item, idx) => (
                                <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 rounded-xl hover:border-[var(--accent-green)] transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[var(--accent-green)] group-hover:text-black transition-colors">
                                        <Check size={16} />
                                    </div>
                                    <p className="font-medium text-white">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. WHAT YOU WILL MASTER */}
            <section className="py-24 bg-[var(--bg-secondary)]">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">What You Will Master</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {course.skills.map((skill, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-[var(--bg-color)] border border-[var(--border-color)] hover:border-white/20 transition-all">
                                <div className="bg-[rgba(57,255,20,0.1)] w-12 h-12 rounded-lg flex items-center justify-center text-[var(--accent-green)] mb-6">
                                    <Star size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{skill}</h3>
                                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                    Deep dive into practical application and strategic implementation of {skill.toLowerCase()}.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. TOOLS & TECHNOLOGIES */}
            <section className="py-24 border-b border-[var(--border-color)]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/4">
                            <h2 className="text-3xl font-bold mb-4">Tools Stack</h2>
                            <p className="text-[var(--text-muted)]">We don't just talk about tools. We build with them.</p>
                        </div>
                        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {Object.entries(course.tools).map(([category, items]) => (
                                items.length > 0 && (
                                    <div key={category}>
                                        <h4 className="text-[var(--accent-green)] text-sm uppercase tracking-wider font-bold mb-4 border-b border-[var(--border-color)] pb-2">
                                            {category}
                                        </h4>
                                        <ul className="space-y-3">
                                            {items.map((tool, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[var(--text-muted)]">
                                                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                                                    {tool}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PROGRAM STRUCTURE */}
            <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-3xl font-bold mb-16 text-center">Curriculum Structure</h2>
                    <div className="max-w-4xl mx-auto space-y-8">
                        {course.structure.map((module, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                                <div className="md:w-48 flex-shrink-0">
                                    <span className="text-5xl font-bold text-white/5 group-hover:text-[var(--accent-green)]/20 transition-colors">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mt-2">{module.title}</h3>
                                </div>
                                <div className="flex-grow pt-4 border-t border-[var(--border-color)] md:border-t-0 md:border-l md:pl-12 md:pb-8 relative">
                                    <div className="absolute left-[-5px] top-[22px] w-2.5 h-2.5 bg-[var(--accent-green)] rounded-full hidden md:block"></div>
                                    <h4 className="text-lg font-bold text-white mb-2">{module.focus}</h4>
                                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                                        {module.outcomes.map((outcome, i) => (
                                            <li key={i} className="text-[var(--text-muted)] text-sm flex items-start gap-2">
                                                <Check size={14} className="mt-1 text-[var(--accent-green)]" />
                                                {outcome}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. HANDS-ON PROJECTS */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-3">
                        <Cpu /> What You Will Build
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {course.projects.map((project, idx) => (
                            <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent-green)] transition-all group">
                                <div className="p-8">
                                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--accent-green)] group-hover:text-black transition-colors">
                                        <Layout size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                    <p className="text-[var(--text-muted)] leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. OUTCOMES */}
            <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Outcomes & Deliverables</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {course.outcomes.map((outcome, idx) => (
                            <div key={idx} className="px-6 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-full text-white font-medium flex items-center gap-2">
                                <Check size={16} className="text-[var(--accent-green)]" />
                                {outcome}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FORMAT */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)] border border-[var(--border-color)] rounded-2xl bg-[var(--card-bg)]">
                        <div className="p-8 text-center">
                            <div className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Format</div>
                            <div className="text-xl font-bold">{course.format.type}</div>
                        </div>
                        <div className="p-8 text-center">
                            <div className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Access</div>
                            <div className="text-xl font-bold">{course.format.access}</div>
                        </div>
                        <div className="p-8 text-center">
                            <div className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Certification</div>
                            <div className="text-xl font-bold text-[var(--accent-green)]">{course.format.certification}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. ETHICS */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--border-color)] rounded-xl p-8 flex gap-6 items-start">
                        <Shield className="text-[var(--text-muted)] flex-shrink-0" size={32} />
                        <div>
                            <h3 className="text-lg font-bold mb-2">Ethics & Responsibility</h3>
                            <p className="text-[var(--text-muted)] leading-relaxed">
                                {course.ethics}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. FINAL CTA */}
            <section className="py-32 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Start?</h2>
                    <p className="text-xl text-[var(--text-muted)] mb-12 max-w-2xl mx-auto">
                        Join a network of elite professionals building the future with AI.
                    </p>
                    <button className="px-10 py-5 bg-[var(--accent-green)] text-black font-bold text-lg rounded-xl hover:bg-[#2ed60f] transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(57,255,20,0.3)]">
                        Secure Your Spot
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
