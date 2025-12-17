import React from 'react';
import { Facebook, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import { courses } from '../data/courses';

export default function Footer() {
    // Group courses for footer display
    const fellowships = courses.filter(c => c.title.includes('Fellowship') || c.title.includes('Empowerment') || c.title.includes('Accelerator'));
    const masterminds = courses.filter(c => c.title.includes('Mastermind'));
    const bootcamps = courses.filter(c => c.title.includes('Bootcamp') || c.title.includes('Intensive'));

    return (
        <footer className="bg-[#050505] text-[#888] py-16 px-4 md:px-12 border-t border-[#222] font-sans">
            <div className="container mx-auto max-w-7xl">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    {/* Left Brand Section - Spans 4 columns */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full">
                        <div>
                            <a href="#" className="flex items-center gap-3 mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[var(--primary)] blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="relative border border-white/10 bg-white/5 p-2 rounded-lg group-hover:border-[var(--primary)]/50 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--primary)]">
                                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-white text-2xl font-semibold tracking-tight">AI Mantra</span>
                            </a>
                            <p className="text-sm mb-8">
                                © 2025 AI Mantra. All rights reserved
                            </p>
                        </div>

                        <div className="flex items-center gap-4 mt-auto">
                            <a href="#" className="w-10 h-10 bg-[#111] hover:bg-[#222] flex items-center justify-center rounded transition-colors text-white">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#111] hover:bg-[#222] flex items-center justify-center rounded transition-colors text-white">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#111] hover:bg-[#222] flex items-center justify-center rounded transition-colors text-white">
                                <Linkedin size={18} />
                            </a>

                            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-medium text-sm ml-4">
                                INR <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Right Links Section - Spans 8 columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-white font-bold text-sm tracking-wider mb-6">FELLOWSHIPS</h4>
                            <ul className="space-y-4 text-sm">
                                {fellowships.map(course => (
                                    <li key={course.id}>
                                        <a href={`/programs/${course.slug}`} className="hover:text-white transition-colors">{course.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm tracking-wider mb-6">WORKSHOPS</h4>
                            <ul className="space-y-4 text-sm">
                                {masterminds.map(course => (
                                    <li key={course.id}>
                                        <a href={`/programs/${course.slug}`} className="hover:text-white transition-colors">{course.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm tracking-wider mb-6">BOOTCAMPS</h4>
                            <ul className="space-y-4 text-sm">
                                {bootcamps.map(course => (
                                    <li key={course.id}>
                                        <a href={`/programs/${course.slug}`} className="hover:text-white transition-colors">{course.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm tracking-wider mb-6">COMPANY</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Creator Partnerships</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border border-[#222] rounded-xl p-8 bg-gradient-to-r from-[#111] to-[#0a0a0a] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <h3 className="text-white text-lg font-bold mb-2">Join our newsletter</h3>
                        <p className="text-sm">Keep up to date with everything AI Mantra</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white text-black px-4 py-3 rounded w-full md:w-80 outline-none focus:ring-2 focus:ring-[#CCF381]"
                        />
                        <button className="bg-[#CCF381] hover:bg-[#bbe075] text-black font-bold px-8 py-3 rounded transition-colors whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
