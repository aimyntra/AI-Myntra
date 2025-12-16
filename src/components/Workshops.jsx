import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

export default function Workshops() {
    return (
        <section className="py-24 bg-[var(--bg-card)] border-t border-[var(--border-color)]">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-12">

                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        48 Hours That Can <br />
                        <span className="text-[var(--primary)] text-stroke">Change Everything</span>
                    </h2>
                    <p className="text-[var(--text-muted)] text-xl mb-8 leading-relaxed">
                        Hands-on, practical weekend workshops designed for working professionals.
                        Stop watching tutorials. Start building real AI workflows with expert guidance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-[var(--primary)]/10 p-2 rounded-full text-[var(--primary)]">
                                <Calendar size={24} />
                            </div>
                            <span className="font-medium">Every Weekend</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-[var(--primary)]/10 p-2 rounded-full text-[var(--primary)]">
                                <Clock size={24} />
                            </div>
                            <span className="font-medium">Live & Interactive</span>
                        </div>
                    </div>

                    <Button variant="primary" className="px-8 text-lg">
                        See Upcoming Workshops <ArrowRight className="ml-2" />
                    </Button>
                </div>

                {/* Visual Decoration */}
                <div className="relative w-full md:w-1/3 aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-transparent opacity-20 rounded-full blur-[80px]"></div>
                    <div className="relative w-full h-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-3xl p-6 flex items-center justify-center shadow-2xl rotate-6">
                        <div className="text-center">
                            <div className="text-6xl font-black text-[var(--text-main)] mb-2">SAT</div>
                            <div className="text-6xl font-black text-[var(--primary)] mb-2">&</div>
                            <div className="text-6xl font-black text-[var(--text-main)]">SUN</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
