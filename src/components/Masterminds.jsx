import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Calendar, Users } from 'lucide-react';
import Button from './ui/Button';
import ProgramCard from './ui/ProgramCard';

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

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                    {masterminds.map((mm, idx) => (
                        // Using ProgramCard style for consistency
                        <div key={idx} className="h-full">
                            <ProgramCard
                                title={mm.title}
                                slug={mm.slug}
                                duration={mm.duration}
                                level={`Ideal for ${mm.target}`}
                                description="Deep dive production workshop in 48 hours. Build real world applications with guidance."
                                outcome={mm.features.join(", ")}
                                cta="View Details"
                                highlight={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
