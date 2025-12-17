import React from 'react';
import { ArrowUpRight, Cpu, Layers, Workflow, Shield, Users, Zap } from 'lucide-react';
import Button from './ui/Button';

export default function Consulting() {
    const services = [
        { title: "AI Strategy", icon: <Layers /> },
        { title: "Workflow Automation", icon: <Workflow /> },
        { title: "AI Product Dev", icon: <Cpu /> },
        { title: "Agent Systems", icon: <Zap /> },
        { title: "Enterprise Training", icon: <Users /> },
        { title: "Custom Solutions", icon: <Shield /> },
    ];

    return (
        <section id="consulting" className="py-24 bg-[var(--bg-card)] border-t border-[var(--border-color)]">
            <div className="container flex flex-col md:flex-row gap-16">
                <div className="md:w-1/3">
                    <p className="text-[var(--primary)] font-bold tracking-widest uppercase mb-4">Enterprise</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Business.</h2>
                    <p className="text-[var(--text-muted)] text-lg mb-8">
                        We don't just teach AI. We implement enterprise-grade systems for forward-thinking companies.
                    </p>
                    <Button variant="primary">
                        Why Partner with AI Mantra?
                        <ArrowUpRight className="ml-2" />
                    </Button>
                </div>

                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                    {services.map((service, idx) => (
                        <div key={idx} className="flex items-center gap-4 group cursor-default">
                            <div className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="font-medium text-lg text-gray-300 group-hover:text-white transition-colors">{service.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
