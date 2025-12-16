import React from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-12 border-t border-[var(--border-color)] bg-[var(--bg-color)] text-sm">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-[var(--primary)] rounded-full"></div>
                            AI Myntra
                        </a>
                        <p className="text-[var(--text-muted)] max-w-sm mb-6">
                            Helping professionals and companies build real value with Artificial Intelligence. No fluff. Just skills.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-[var(--bg-card)] rounded-full text-[var(--text-muted)] hover:text-white hover:bg-[var(--border-color)] transition-all"><Twitter size={18} /></a>
                            <a href="#" className="p-2 bg-[var(--bg-card)] rounded-full text-[var(--text-muted)] hover:text-white hover:bg-[var(--border-color)] transition-all"><Linkedin size={18} /></a>
                            <a href="#" className="p-2 bg-[var(--bg-card)] rounded-full text-[var(--text-muted)] hover:text-white hover:bg-[var(--border-color)] transition-all"><Github size={18} /></a>
                            <a href="#" className="p-2 bg-[var(--bg-card)] rounded-full text-[var(--text-muted)] hover:text-white hover:bg-[var(--border-color)] transition-all"><Mail size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-white">Programs</h4>
                        <ul className="space-y-2 text-[var(--text-muted)]">
                            <li><a href="#" className="hover:text-[var(--primary)]">Engineering Accelerator</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">AI Empowerment</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Intensive</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Bootcamps</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-white">Agency</h4>
                        <ul className="space-y-2 text-[var(--text-muted)]">
                            <li><a href="#" className="hover:text-[var(--primary)]">Consulting</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Corporate Training</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Workshops</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4 text-[var(--text-dim)]">
                    <p>&copy; {new Date().getFullYear()} AI Myntra. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[var(--text-muted)]">Privacy Policy</a>
                        <a href="#" className="hover:text-[var(--text-muted)]">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
