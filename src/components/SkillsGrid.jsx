import React from 'react';
import { Terminal, Bot, Settings, Database, Mic, Video, Code, DollarSign, Layers } from 'lucide-react';

export default function SkillsGrid() {
    const skills = [
        { name: "Prompt Engineering", icon: <Terminal size={24} /> },
        { name: "AI Agents", icon: <Bot size={24} /> },
        { name: "Global Automations", icon: <Settings size={24} /> },
        { name: "RAG Systems", icon: <Database size={24} /> },
        { name: "Voice AI", icon: <Mic size={24} /> },
        { name: "Video Gen", icon: <Video size={24} /> },
        { name: "No-Code Products", icon: <Layers size={24} /> },
        { name: "Production Deploy", icon: <Code size={24} /> },
        { name: "Monetization", icon: <DollarSign size={24} /> },
    ];

    return (
        <section className="py-20 bg-[var(--bg-color)]">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Master</h2>
                    <p className="text-[var(--text-muted)]">A complete ecosystem of modern AI skills.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {skills.map((skill, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center text-center gap-4 group">
                            <div className="p-0 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors transform group-hover:scale-110 duration-300">
                                {skill.icon}
                            </div>
                            <h3 className="font-medium text-base text-gray-300 group-hover:text-white transition-colors">{skill.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
