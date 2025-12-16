import React from 'react';
import Button from './ui/Button';

export default function CallToAction() {
    return (
        <section className="py-32 relative overflow-hidden flex items-center justify-center">
            {/* Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/10 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--primary)] opacity-20 blur-[150px] rounded-full"></div>

            <div className="container relative z-10 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                    Ready to Build Your <br />
                    <span className="text-white text-shadow-glow">AI Edge?</span>
                </h2>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="primary" className="px-8 py-4 text-xl">
                        Join a Program
                    </Button>
                    <Button variant="secondary" className="px-8 py-4 text-xl">
                        Book a Consultation
                    </Button>
                </div>
            </div>
        </section>
    );
}
