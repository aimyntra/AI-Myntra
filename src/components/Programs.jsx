import React from 'react';
import ProgramCard from './ui/ProgramCard';

export default function Programs() {
    const programs = [
        {
            title: "AI Empowerment Mastery",
            slug: "ai-empowerment-mastery",
            duration: "8 Weeks",
            level: "Beginner → Intermediate",
            description: "Master no-code workflow automation and monetization strategies. Build your AI portfolio.",
            tools: ["ChatGPT", "Claude", "Gemini", "Notion AI", "Zapier", "Make"],
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
            tools: ["OpenAI", "LangGraph", "LlamaIndex", "LangSmith", "Vector DBs"],
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
            tools: ["Diffusion", "Agents", "Media", "Automations", "Fine-tuning"],
            outcome: "Complete career transformation & portfolio",
            cta: "Explore Intensive",
            highlight: true
        }
    ];

    return (
        <section id="programs" className="items-center py-24 bg-[var(--bg-color)] relative">
            <div className="container">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        One Program. <span className="text-gradient-green">Lifetime of Skills.</span>
                    </h2>
                    <p className="text-[var(--text-muted)] text-lg">
                        Choose the path that fits your career goals. Whether you're a non-tech founder or a senior engineer, we have a fast-track for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {programs.map((prog, idx) => (
                        <div key={idx} className="h-full">
                            <ProgramCard {...prog} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
