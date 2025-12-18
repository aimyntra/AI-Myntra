import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, CreditCard, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export default function PaymentModal({ isOpen, onClose, price, courseTitle, initialValues = {} }) {
    const [step, setStep] = useState('details'); // details, processing, success
    const [formData, setFormData] = useState({
        name: initialValues.name || '',
        email: initialValues.email || '',
        phone: initialValues.phone || ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');
        setStep('processing');

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            setError('Razorpay SDK failed to load. Are you online?');
            setStep('details');
            return;
        }

        try {
            // 1. Create Order
            const cleanPrice = Number(price.toString().replace(/[^0-9]/g, ''));
            const orderUrl = "/api/create-order"; // Relative URL
            const result = await fetch(orderUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: cleanPrice,
                    currency: 'INR',
                    receipt: `receipt_${Date.now()}`
                })
            });

            const order = await result.json();

            if (!order || !order.id) {
                throw new Error("Server error. Are you online?");
            }

            // 2. Open Razorpay Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use public key from env
                amount: order.amount,
                currency: order.currency,
                name: "AI Myntra",
                description: `Enrollment for ${courseTitle}`,
                image: "https://via.placeholder.com/150",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyUrl = "/api/verify-payment";
                        const verifyRes = await fetch(verifyUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            setStep('success');
                            triggerConfetti();
                        } else {
                            setError('Payment verification failed.');
                            setStep('details');
                        }
                    } catch (err) {
                        setError('Payment verification failed.');
                        setStep('details');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#00ff88"
                },
                modal: {
                    ondismiss: function () {
                        setStep('details');
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong');
            setStep('details');
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
                        className="relative w-full max-w-md bg-[#0e0e0e] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,255,136,0.1)] overflow-hidden"
                    >
                        {/* Header Gradient */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-50"></div>

                        <div className="p-8">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Title */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {step === 'success' ? 'Enrollment Complete!' : 'Secure Checkout'}
                                </h3>
                                {step !== 'success' && (
                                    <p className="text-gray-400 text-sm">
                                        You are enrolling in <br />
                                        <span className="text-[#00ff88] font-semibold">{courseTitle}</span>
                                    </p>
                                )}
                            </div>

                            {step === 'details' && (
                                <form onSubmit={handlePayment} className="space-y-4">
                                    {error && (
                                        <div className="text-red-500 text-xs text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                                            {error}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] transition-all"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-[#00ff88] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                                    >
                                        <Shield size={18} /> Pay ₹{price} Securely
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 mt-4">
                                        <Lock size={10} />
                                        <span>256-bit SSL Encrypted Payment</span>
                                    </div>
                                </form>
                            )}

                            {step === 'processing' && (
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-12 h-12 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gray-400 text-sm animate-pulse">Initializing Payment Gateway...</p>
                                </div>
                            )}

                            {step === 'success' && (
                                <div className="py-6 text-center space-y-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-[#00ff88]/10 rounded-full flex items-center justify-center mx-auto text-[#00ff88] border border-[#00ff88]/20"
                                    >
                                        <Check size={40} strokeWidth={3} />
                                    </motion.div>

                                    <div>
                                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                                            Payment Successful! <br />
                                            A confirmation email has been sent to <span className="text-white">{formData.email}</span>.
                                        </p>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="w-full py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                                    >
                                        Close
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
