import React from 'react';
import { Play, Star, Quote, CheckCircle } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Alex Rivera",
            role: "Senior Developer @ TechFlow",
            text: "I built a production-ready RAG pipeline in 48 hours. The engineering mastermind adds years to your career.",
            video: "https://cdn.coverr.co/videos/coverr-coding-on-laptop-2651/1080p.mp4",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
            type: "video"
        },
        {
            name: "Sarah Chen",
            role: "Founder, AI Studio",
            text: "AI Mantra's templates are pure gold. We automated our entire content engine and saved $5k/month.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=200&h=200",
            type: "text"
        },
        {
            name: "James Wilson",
            role: "Product Manager",
            text: "Finally, a course that actually explains how to deploy Agents, not just prompt them. My team is now 10x faster.",
            video: "https://cdn.coverr.co/videos/coverr-people-working-in-a-start-up-4509/1080p.mp4",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=200&h=200",
            type: "video"
        },
        {
            name: "Emily Davis",
            role: "Digital Artist",
            text: "The Midjourney and Runway workflows blew my mind. I'm producing cinematic ads for clients solo now.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=200&h=200",
            type: "text"
        },
        {
            name: "Michael Chang",
            role: "Freelance Engineer",
            text: "Direct ROI. I landed a $15k contract using the multi-agent framework I learned here.",
            video: "https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2646/1080p.mp4",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=200&h=200",
            type: "video"
        },
        {
            name: "Priya Patel",
            role: "Marketing Director",
            text: "We replaced our expensive agency with an internal AI team trained by AI Mantra. Best decision ever.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200",
            type: "text"
        }
    ];

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background Doodles */}
            <div className="absolute top-20 left-10 w-32 h-32 border border-[#CCF381] opacity-20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-t from-[var(--primary)]/10 to-transparent rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#111] border border-white/10 rounded-full px-4 py-1.5 mb-6">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border-2 border-[#111] overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <span className="text-xs text-white font-medium pl-2">Trusted by 5,000+ Alumni</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Real Impact. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCF381] to-emerald-400">Real Results.</span>
                    </h2>
                    <p className="text-[#888] text-lg max-w-2xl mx-auto">
                        See how developers, founders, and creatives are transforming their careers with our programs.
                    </p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className={`group relative rounded-2xl overflow-hidden border border-white/5 bg-[#0A0A0A] hover:border-[#CCF381]/30 transition-all duration-500 hover:-translate-y-2 ${t.type === 'video' ? 'row-span-2' : ''}`}
                        >
                            {t.type === 'video' ? (
                                // Video Card
                                <div className="h-full min-h-[400px] relative">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                                    >
                                        <source src={t.video} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 w-full p-6">
                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                                            <Play className="fill-white text-white ml-1" size={20} />
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex text-[#CCF381] mb-2">
                                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                            </div>
                                            <p className="text-white font-medium text-lg leading-snug">"{t.text}"</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full border border-white/20" />
                                            <div>
                                                <div className="text-white font-bold text-sm">{t.name}</div>
                                                <div className="text-gray-400 text-xs">{t.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Text Card
                                <div className="p-8 h-full flex flex-col justify-between relative">
                                    <Quote className="text-[#222] absolute top-6 right-6" size={40} />
                                    <div>
                                        <div className="flex text-[#CCF381] mb-4">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                        </div>
                                        <p className="text-gray-300 leading-relaxed mb-6">"{t.text}"</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="relative">
                                            <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full border border-white/10" />
                                            <div className="absolute -bottom-1 -right-1 bg-[#CCF381] rounded-full p-0.5 border border-black">
                                                <CheckCircle size={10} className="text-black" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">{t.name}</div>
                                            <div className="text-gray-500 text-xs">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
