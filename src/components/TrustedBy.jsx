import React from 'react';

export default function TrustedBy() {
    const companies = [
        "Startups", "Agencies", "Creators", "Freelancers", "Corporate Teams"
    ];

    return (
        <section className="py-10 border-b border-[var(--border-color)] bg-[var(--bg-color)]">
            <div className="container text-center">
                <p className="text-sm font-medium text-[var(--text-muted)] mb-6 uppercase tracking-wider">
                    Trusted by professionals, founders, and teams building with AI
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {companies.map((company, index) => (
                        <span key={index} className="text-xl font-bold text-[var(--text-dim)] hover:text-white transition-colors cursor-default">
                            {company}
                        </span>
                    ))}
                    {/* Note: Real logos would go here. Using text placeholders as per instructions. */}
                </div>
            </div>
        </section>
    );
}
