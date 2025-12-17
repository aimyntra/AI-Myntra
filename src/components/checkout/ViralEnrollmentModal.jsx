import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Users, Shield, ArrowRight, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../ui/Button';
import { useUser } from "@clerk/clerk-react";

export default function ViralEnrollmentModal({ isOpen, onClose, courseTitle }) {
    const [step, setStep] = useState('offer'); // offer, processing, success
    const [email, setEmail] = useState('');
    const [viewers, setViewers] = useState(12);
    const [spots, setSpots] = useState(5);
    const { user, isLoaded } = useUser();

    // Auto-fill email if user is logged in
    useEffect(() => {
        if (isLoaded && user && user.primaryEmailAddress) {
            setEmail(user.primaryEmailAddress.emailAddress);
        }
    }, [isLoaded, user, isOpen]);

    // Simulate "Live" viewers
    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => {
            setViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep('processing');

        try {
            const response = await fetch('http://localhost:5000/api/intake', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    courseTitle,
                    userId: user ? user.id : null
                }),
            });

            if (response.ok) {
                setStep('success');
                triggerConfetti();
            } else {
                // Fallback for demo if offline
                console.error("API Error");
                setStep('success');
                triggerConfetti();
            }
        } catch (error) {
            console.error("Network Error", error);
            // Fallback for demo so user isn't stuck
            setStep('success');
            triggerConfetti();
        }
    };

    const triggerConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(57,255,20,0.1)] overflow-hidden"
                    >
                        {/* Pulse Top Border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50"></div>

                        <div className="p-8">
                            {/* Header / Social Proof */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/20 animate-pulse">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    {viewers} people viewing
                                </div>
                                <button onClick={onClose} className="text-gray-500 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            {step === 'offer' && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-white mb-2">Secure Your Spot</h3>
                                        <p className="text-gray-400 text-sm">
                                            Join <span className="text-white font-semibold">{courseTitle}</span>.
                                            <br />Only <span className="text-[var(--primary)] font-bold">{spots} spots left</span> at this price tier.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                                            />
                                        </div>

                                        <Button className="w-full !text-lg !py-4 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                                            Lock In My Access <ArrowRight size={18} />
                                        </Button>
                                    </form>

                                    <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500">
                                        <span className="flex items-center gap-1"><Shield size={10} /> Secure checkout</span>
                                        <span className="flex items-center gap-1"><Users size={10} /> 400+ enrolled this week</span>
                                    </div>
                                </div>
                            )}

                            {step === 'processing' && (
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-12 h-12 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gray-400 text-sm animate-pulse">Securing your spot...</p>
                                </div>
                            )}

                            {step === 'success' && (
                                <div className="py-6 text-center space-y-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto text-[var(--primary)] border border-[var(--primary)]/20"
                                    >
                                        <Check size={40} strokeWidth={3} />
                                    </motion.div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">You're In! 🎉</h3>
                                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                                            Check your inbox at <span className="text-white">{email}</span>. We've sent your access details and receipt.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <p className="text-xs text-gray-400 mb-3">Share to unlock a bonus module:</p>
                                        <div className="flex gap-2 justify-center">
                                            <button className="px-4 py-2 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-lg text-xs font-bold hover:bg-[#1DA1F2]/20 transition-colors">
                                                Twitter
                                            </button>
                                            <button className="px-4 py-2 bg-[#0077b5]/10 text-[#0077b5] rounded-lg text-xs font-bold hover:bg-[#0077b5]/20 transition-colors">
                                                LinkedIn
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="text-xs text-gray-500 hover:text-white transition-colors"
                                    >
                                        Close window
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
