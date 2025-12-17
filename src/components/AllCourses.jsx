import React from 'react';
import ProgramCard from './ui/ProgramCard';
import { GraduationCap, Zap, Rocket } from 'lucide-react';

export default function AllCourses() {
    const categories = [
        {
            title: "Career Fellowships",
            subtitle: "One Program. Lifetime of Skills.",
            description: "Choose the path that fits your career goals. Whether you're a non-tech founder or a senior engineer.",
            icon: <GraduationCap size={32} />,
            accentColor: "from-blue-500 to-cyan-500",
            courses: [
                {
                    title: "AI Empowerment Mastery",
                    slug: "ai-empowerment-mastery",
                    duration: "8 Weeks",
                    level: "Beginner → Intermediate",
                    description: "Master no-code workflow automation and monetization strategies. Build your AI portfolio.",
                    outcome: "10+ workflows, portfolio, monetization plan",
                    cta: "View Program",
                    highlight: true
                },
                {
                    title: "AI Engineering Accelerator",
                    slug: "ai-engineering-accelerator",
                    duration: "14 days",
                    level: "Developers & Engineers",
                    description: "Intensive deep dive into building production-grade AI applications, RAG, and Agentic systems.",
                    outcome: "Build & deploy 8+ production-grade AI apps",
                    cta: "Apply Now",
                    highlight: true
                },
                {
                    title: "AI Revolution Intensive",
                    slug: "ai-revolution-intensive",
                    duration: "100 Hours",
                    level: "Career Switchers",
                    description: "Comprehensive mastery of Generative AI, from diffusion models to advanced autonomous agents.",
                    outcome: "Complete career transformation & portfolio",
                    cta: "Explore Intensive",
                    highlight: true
                }
            ]
        },
        {
            title: "Weekend Masterminds",
            subtitle: "Deep Dives in 48 Hours",
            description: "Intensive workshops to master specific AI domains in just one weekend.",
            icon: <Zap size={32} />,
            accentColor: "from-purple-500 to-pink-500",
            courses: [
                {
                    title: "AI Mastermind",
                    slug: "ai-mastermind",
                    duration: "2 Days",
                    level: "Designers & Marketers",
                    description: "Build AI apps & visuals, prompt engineering mastery, and no-code workflows.",
                    outcome: "Build AI apps, Stunning Visuals",
                    cta: "View Details",
                    highlight: true
                },
                {
                    title: "GenAI Engineering",
                    slug: "genai-engineering-mastermind",
                    duration: "2 Days",
                    level: "Developers & Builders",
                    description: "LLM APIs, Tool Calling, Multi-agent systems, and production deployment strategies.",
                    outcome: "LLM APIs, Multi-agent Systems",
                    cta: "View Details",
                    highlight: true
                }
            ]
        },
        {
            title: "Project Bootcamps",
            subtitle: "Launch in One Week",
            description: "Fast-track your shipping muscle. Build and launch a complete project in 7 days.",
            icon: <Rocket size={32} />,
            accentColor: "from-orange-500 to-yellow-500",
            courses: [
                {
                    title: "AI Builder Bootcamp",
                    slug: "ai-builder-bootcamp",
                    duration: "1 Week",
                    level: "Makers & Builders",
                    description: "Build & launch AI projects in one week. Voice agents, automations, and AI clones.",
                    outcome: "MVP Launch, No-code + Light Code",
                    cta: "Join Bootcamp",
                    highlight: true
                }
            ]
        }
    ];

    return (
        <section id="programs" className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-[200px] pointer-events-none"></div>

            <div className="container relative z-10">
                {/* Main Section Header */}
                <div className="text-center mb-24 max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                        <span className="w-2 h-2 bg-[#CCF381] rounded-full animate-pulse"></span>
                        <span className="text-[#CCF381] font-mono text-xs tracking-widest uppercase">World-Class Curriculum</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tighter leading-[0.9] text-center mx-auto pl-32 md:pl-40">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCF381] via-emerald-400 to-[#CCF381] animate-text-shimmer bg-[length:200%_auto]">AI Path</span>
                    </h2>
                    <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-center">
                        From weekend deep dives to comprehensive fellowships. We have a program for every stage of your AI journey.
                    </p>
                </div>

                {/* Categories */}
                <div className="space-y-32">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="relative group">
                            {/* Stunning Category Header */}
                            <div className="mb-16 relative">
                                <div className="max-w-6xl mx-auto">
                                    {/* Icon & Title Row */}
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${cat.accentColor} shadow-[0_0_40px_-10px] shadow-current`}>
                                            {React.cloneElement(cat.icon, { className: "text-white" })}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2 leading-none">
                                                {cat.title}
                                            </h3>
                                            <p className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.accentColor} tracking-tight`}>
                                                {cat.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="pl-[88px]">
                                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl">
                                            {cat.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Decorative Line */}
                                <div className={`mt-8 h-[2px] bg-gradient-to-r ${cat.accentColor} opacity-20 rounded-full`}></div>
                            </div>

                            {/* Category Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {cat.courses.map((course, cIdx) => (
                                    <div
                                        key={cIdx}
                                        className="h-full transform transition-all duration-300 hover:scale-[1.02]"
                                        style={{ animationDelay: `${cIdx * 100}ms` }}
                                    >
                                        <ProgramCard {...course} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
