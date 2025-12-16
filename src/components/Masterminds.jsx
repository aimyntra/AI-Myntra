import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Calendar, Users } from 'lucide-react';
import Button from './ui/Button';

export default function Masterminds() {
    const masterminds = [
        {
            title: "AI Mastermind",
            slug: "ai-mastermind",
            duration: "2 Days",
            target: "Designers & Marketers",
            features: ["Build AI apps & visuals", "Prompt engineering mastery", "No coding required"],
            icon: <Flame className="text-orange-500" size={32} />
        },
        {
            title: "GenAI Engineering",
            slug: "genai-engineering-mastermind",
            duration: "2 Days",
            target: "Developers & Builders",
            features: ["LLM APIs & Tool Calling", "Multi-agent systems", "Production deployment"],
            icon: <Flame className="text-[var(--primary)]" size={32} />
        }
    ];

    return (
        <section id="masterminds" className="py-20 bg-[var(--bg-card)] border-y border-[var(--border-color)]">
            <div className="container">
                <div className="text-center mb-12">
                    <p className="text-[var(--primary)] font-bold tracking-widest uppercase mb-2">Weekend Intensives</p>
                    <h2 className="text-3xl md:text-5xl font-bold">Deep Dives in 48 Hours</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {masterminds.map((mm, idx) => (
                        <div key={idx} className="bg-transparent p-0 rounded-[var(--radius)] hover:bg-[var(--bg-card)] transition-colors group flex flex-col md:flex-row gap-6 items-start md:items-center py-8 px-8 border border-transparent hover:border-[var(--border-color)]">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[var(--primary)]">{mm.icon}</span>
                                    <h3 className="text-xl font-bold text-white">{mm.title}</h3>
                                </div>
                                <p className="text-[var(--text-muted)] text-sm mb-4 flex items-center gap-2">
                                    <Users size={14} /> Ideal for {mm.target} &bull; {mm.duration}
                                </p>
                                <ul className="space-y-2">
                                    {mm.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-dim)] group-hover:text-[var(--text-muted)] transition-colors">
                                            <span className="w-1 h-1 rounded-full bg-[var(--text-dim)] group-hover:bg-[var(--primary)]"></span>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link to={`/programs/${mm.slug}`}>
                                <Button variant="outline" className="shrink-0 border-[var(--border-color)] text-[var(--text-muted)] hover:text-white hover:border-white">
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
