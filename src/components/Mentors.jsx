import React from 'react';
import { Linkedin, Twitter, User } from 'lucide-react';

export default function Mentors() {
    const mentors = [
        {
            name: "Dr. Elena Vance",
            role: "Lead AI Research Scientist",
            company: "Ex-DeepMind | Stanford PhD",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
            linkedin: "#",
            twitter: "#"
        },
        {
            name: "Marcus Chen",
            role: "Senior LLM Engineer",
            company: "Anthropic Contributor",
            image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2670&auto=format&fit=crop",
            linkedin: "#",
            twitter: "#"
        },
        {
            name: "Sarah Jenkins",
            role: "AI Product Architect",
            company: "Built 3 AI Unicorns",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
            linkedin: "#",
            twitter: "#"
        }
    ];

    return (
        <section className="py-24 bg-[var(--bg-card)] border-y border-[var(--border-color)]">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Learn from Builders, Not Content Creators</h2>
                        <p className="text-[var(--text-muted)] text-lg">
                            Our mentors are actively building and shipping AI systems in the real world.
                        </p>
                    </div>
                    <a href="#" className="text-[var(--primary)] font-semibold hover:underline">See all mentors</a>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {mentors.map((mentor, idx) => (
                        <div key={idx} className="group relative rounded-[var(--radius)] overflow-hidden bg-transparent hover:bg-white/[0.03] transition-colors duration-300">
                            {/* Accent Line on Hover */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

                            <div className="aspect-[3/4] bg-gray-900 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img
                                    src={mentor.image}
                                    alt={mentor.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                                {/* Social Links - Subtle bottom right */}
                                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                    <a href={mentor.linkedin} className="text-white hover:text-[var(--primary)] transition-colors"><Linkedin size={18} /></a>
                                    <a href={mentor.twitter} className="text-white hover:text-[var(--primary)] transition-colors"><Twitter size={18} /></a>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">{mentor.name}</h3>
                                <p className="text-gray-300 text-sm font-medium mb-1">{mentor.role}</p>
                                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider">{mentor.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
