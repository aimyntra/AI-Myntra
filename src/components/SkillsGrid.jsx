import React from 'react';
import { Terminal, Bot, Settings, Database, Mic, Video, Code, DollarSign, Layers, Sparkles } from 'lucide-react';

export default function SkillsGrid() {
    const skills = [
        { name: "Prompt Engineering", icon: <Terminal className="text-blue-400" />, desc: "Master the art of instructing LLMs." },
        { name: "AI Agents", icon: <Bot className="text-purple-400" />, desc: "Build autonomous multi-agent systems." },
        { name: "RAG Systems", icon: <Database className="text-emerald-400" />, desc: "Connect LLMs to your private data." },
        { name: "Voice AI", icon: <Mic className="text-rose-400" />, desc: "Create human-like voice interfaces." },
        { name: "Video Generation", icon: <Video className="text-orange-400" />, desc: "Produce cinematic AI video content." },
        { name: "Global Automations", icon: <Settings className="text-yellow-400" />, desc: "Automate complex business workflows." },
        { name: "No-Code Products", icon: <Layers className="text-cyan-400" />, desc: "Ship apps without writing code." },
        { name: "Production Deployment", icon: <Code className="text-white" />, desc: "Scale your AI apps to millions." },
        { name: "Monetization", icon: <DollarSign className="text-green-400" />, desc: "Turn your skills into profit." },
    ];

    return (
        <section className="py-24 bg-[#080808] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,0),rgba(0,0,0,1))] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container relative z-10">
                <div className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-[#CCF381] uppercase mb-4">
                        Curriculum
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
                        What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCF381] to-emerald-400">Master</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Don't just watch AI happen. Build the future with a complete ecosystem of modern technical and creative skills.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-[#0F0F0F] border border-white/5 p-8 rounded-2xl hover:border-[#CCF381]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(204,243,129,0.1)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-[#1a1a1a] border border-white/10 group-hover:border-[#CCF381]/30 transition-colors">
                                    {React.cloneElement(skill.icon, { size: 28 })}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#CCF381] transition-colors">{skill.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {skill.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
