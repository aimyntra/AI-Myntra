import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Check, Send, Linkedin, FileText, Upload } from 'lucide-react';
import Button from '../components/ui/Button';
import confetti from 'canvas-confetti';

export default function MentorApply() {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        linkedin: '',
        expertise: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/apply-mentor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    email: user.primaryEmailAddress.emailAddress,
                    userId: user.id
                })
            });

            if (response.ok) {
                setStatus('success');
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-lg w-full bg-[#0a0a0a] border border-[var(--primary)]/20 rounded-3xl p-10 text-center shadow-[0_0_50px_rgba(57,255,20,0.1)]"
                >
                    <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--primary)] border border-[var(--primary)]/20">
                        <Check size={40} strokeWidth={3} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Application Received!</h2>
                    <p className="text-gray-400 mb-8">
                        Thanks for applying, <span className="text-white">{formData.name}</span>. We're reviewing your profile and will be in touch at <span className="text-white">{user?.primaryEmailAddress?.emailAddress}</span> soon.
                    </p>
                    <Button onClick={() => window.location.href = '/'}>
                        Return Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <SignedOut>
                <RedirectToSignIn afterSignInUrl="/apply-mentor" />
            </SignedOut>

            <SignedIn>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 tracking-tight">
                            Become a <span className="text-[var(--primary)]">Mentor</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Share your expertise, guide the next generation of AI engineers, and earn while you make an impact.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Benefits / Info */}
                        <div className="space-y-8">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Why AI Mantra?</h3>
                                <ul className="space-y-4 text-gray-400">
                                    <li className="flex gap-3">
                                        <Check className="text-[var(--primary)] flex-shrink-0" />
                                        <span>Highest industry compensation/hour</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <Check className="text-[var(--primary)] flex-shrink-0" />
                                        <span>Curated curriculum provided</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <Check className="text-[var(--primary)] flex-shrink-0" />
                                        <span>Network with top 1% talent</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/20 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-2">Requirement</h3>
                                <p className="text-sm text-gray-400">
                                    Ideally 3+ years of meaningful experience in AI, ML, or Full Stack Development. Passion for teaching is a must.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] focus:outline-none transition-colors"
                                        placeholder="Dr. Alan Turing"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] focus:outline-none transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn or Resume URL</label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="url"
                                            required
                                            value={formData.linkedin}
                                            onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[var(--primary)] focus:outline-none transition-colors"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Link to your LinkedIn profile or a Google Drive link to your PDF resume.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Core Expertise</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.expertise}
                                        onChange={e => setFormData({ ...formData, expertise: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] focus:outline-none transition-colors"
                                        placeholder="e.g. LLMs, RAG, React, Python, System Design..."
                                    />
                                </div>

                                <Button className="w-full justify-center !py-4 text-lg mt-4">
                                    Submit Application <Send size={18} />
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </SignedIn>
        </div>
    );
}
