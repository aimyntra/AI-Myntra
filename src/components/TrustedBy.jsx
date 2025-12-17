import React from 'react';

export default function TrustedBy() {
    const companies = [
        "Startups", "Agencies", "Creators", "Freelancers", "Corporate Teams"
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
            {/* Crystal Effects */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div className="container text-center relative z-10">
                <p className="text-sm font-bold text-gray-500 mb-8 uppercase tracking-widest flex items-center justify-center gap-4">
                    <span className="w-12 h-px bg-gray-300"></span>
                    Trusted by professionals, founders, and teams building with AI
                    <span className="w-12 h-px bg-gray-300"></span>
                </p>

                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                    {companies.map((company, index) => (
                        <div key={index} className="group relative">
                            <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-600 transition-all duration-300 group-hover:from-black group-hover:to-gray-800 cursor-default">
                                {company}
                            </span>
                            {/* Reflection/Glow Effect */}
                            <div className="absolute -bottom-2 left-0 w-full h-4 bg-black/5 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
