import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import Button from './ui/Button';

// Scramble Text Component
const ScrambleText = ({ text, className }) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{display}</span>;
}

// Magnetic Button Component
const MagneticButton = ({ children, className, variant = "primary" }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.3); // Magnet strength
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: xSpring, y: ySpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            <Button variant={variant} className={className}>
                {children}
            </Button>
        </motion.div>
    );
};

export default function Hero() {
    const [taglineIndex, setTaglineIndex] = useState(0);
    const taglines = [
        "Build, Automate & Monetize with AI",
        "From AI Curiosity to AI Mastery",
        "Your Gateway to Practical AI"
    ];

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }, 4000); // Slower for scramble effect
        return () => clearInterval(interval);
    }, []);

    // Mouse follow effect for background
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ clientX, clientY, currentTarget }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        let xPosition = clientX - left;
        let yPosition = clientY - top;
        mouseX.set(xPosition);
        mouseY.set(yPosition);
    }

    const backgroundGradient = useMotionTemplate`radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(57, 255, 20, 0.06),
      transparent 80%
    )`;

    return (
        <section
            className="relative min-h-[95vh] flex items-center justify-center overflow-hidden perspective-1000"
            onMouseMove={handleMouseMove}
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[#050505] z-0">
                {/* Mouse Follow Glow */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-100"
                    style={{ background: backgroundGradient }}
                />

                {/* Moving Grid */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary)]/5 to-transparent opacity-30 transform perspective-[500px] rotate-x-[60deg] scale-[2] animate-grid-move pointer-events-none"></div>

                {/* Floating Orbs */}
                <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[10%] w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] animate-pulse-glow" />
                <motion.div style={{ y: y2 }} className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[100px] animate-float-slow" />
            </div>

            <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">

                {/* Viral Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative group"
                >
                    <div className="absolute inset-0 bg-[var(--primary)] blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                    <div className="relative inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[#0A0A0A]/80 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
                        </span>
                        <ScrambleText
                            text={taglines[taglineIndex]}
                            className="text-sm font-mono font-medium text-[var(--primary)] tracking-wide uppercase"
                        />
                    </div>
                </motion.div>

                {/* Headline */}
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95] text-white">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="block"
                    >
                        Transform Your
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
                    >
                        Career with <span className="text-[var(--primary)] inline-block relative">
                            AI Skills
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--primary)] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>
                    </motion.span>
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed"
                >
                    Stop watching the AI revolution from the sidelines. <span className="text-white font-medium">Build engines, not just prompts.</span> master the tools that replace 10x engineers.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <MagneticButton className="!px-10 !py-4 !text-lg shadow-[0_0_40px_-5px_var(--primary)] hover:shadow-[0_0_60px_-5px_var(--primary)] transition-shadow">
                        Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
                    </MagneticButton>

                    <MagneticButton variant="outline" className="!px-10 !py-4 !text-lg !border-white/10 hover:!bg-white/5 backdrop-blur-sm group">
                        <Play className="mr-2 w-5 h-5 fill-white" /> Watch Demo
                    </MagneticButton>
                </motion.div>

                {/* Social Proof / Mini Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 pt-10 border-t border-white/5 grid grid-cols-3 gap-8 md:gap-20"
                >
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">20k+</div>
                        <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Students</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
                        <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Rating</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">500+</div>
                        <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Projects Shipped</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
