import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ChevronRight, Zap, Play, Star, ShieldCheck, Users } from 'lucide-react';
import Button from '../ui/Button';

// Reusing ScrambleText for consistent Viral Vibe
const ScrambleText = ({ text, className }) => {
    const [display, setDisplay] = useState(text);
    const chars = "XY01_#<>";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(text.split("").map((iframe, index) => {
                if (index < iterations) return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 2;
        }, 50);
        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{display}</span>;
};

// Reusing Magnetic Button
const MagneticButton = ({ children, className, onClick, variant = "primary" }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        x.set((clientX - (left + width / 2)) * 0.3);
        y.set((clientY - (top + height / 2)) * 0.3);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: xSpring, y: ySpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="inline-block"
            onClick={onClick}
        >
            <Button variant={variant} className={className}>{children}</Button>
        </motion.div>
    );
};

export default function CourseHero({ course }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const rotateX = useTransform(scrollY, [0, 500], [0, 15]);

    // Mouse Follow (3D Card Effect)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const ref = useRef(null);

    function handleMouseMove({ clientX, clientY, currentTarget }) {
        let { left, top, width, height } = currentTarget.getBoundingClientRect();
        let xPos = clientX - left;
        let yPos = clientY - top;
        mouseX.set(xPos);
        mouseY.set(yPos);
    }

    const backgroundGradient = useMotionTemplate`radial-gradient(
      800px circle at ${mouseX}px ${mouseY}px,
      rgba(0, 255, 136, 0.08),
      transparent 80%
    )`;

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#0a0a0f] perspective-1000"
        >
            {/* 1. Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Mouse Spotlight */}
                <motion.div className="absolute inset-0 opacity-100" style={{ background: backgroundGradient }} />

                {/* 3D Moving Grid */}
                <div className="absolute inset-x-0 bottom-[-20%] h-[80%] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transform perspective-[500px] rotate-x-[60deg] scale-[2.5] opacity-20 animate-grid-move" />

                {/* Floating Orbs */}
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
                <div className="absolute bottom-[0%] left-[0%] w-[600px] h-[600px] bg-[#00ff88]/5 rounded-full blur-[100px] animate-float-slow mix-blend-screen" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Enhanced Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Live Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] font-bold text-xs uppercase tracking-widest mb-8 animate-pulse shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                        <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
                        {course.format.type || "High Intensity Cohort"}
                    </div>

                    {/* Massive Typography */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
                        {course.title.split(' ').slice(0, -1).join(' ')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 relative inline-block">
                            {course.title.split(' ').slice(-1)}
                            {/* Underline Decoration */}
                            <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#00ff88] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-xl font-light">
                        <ScrambleText text={course.tagline} className="text-gray-300 font-medium" />
                    </p>

                    {/* High-Contrast CTAs */}
                    <div className="flex flex-col sm:flex-row gap-5 mb-12">
                        <MagneticButton className="!px-10 !py-5 !text-xl !font-black !uppercase tracking-wide shadow-[0_0_50px_-10px_#00ff88] hover:shadow-[0_0_80px_-10px_#00ff88] transition-all">
                            Join The Cohort
                        </MagneticButton>
                        <MagneticButton variant="outline" className="!px-10 !py-5 !text-xl !font-bold !border-white/10 hover:!bg-white/5 backdrop-blur-xl">
                            <Play size={20} className="mr-2 fill-current" /> Watch Trailer
                        </MagneticButton>
                    </div>

                    {/* Social Proof Stack */}
                    <div className="flex items-center gap-6 pt-8 border-t border-white/5">
                        <div className="flex -space-x-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0a0a0f] bg-gray-800 overflow-hidden relative">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-2 border-[#0a0a0f] bg-[#1a1a20] flex items-center justify-center text-xs font-bold text-white">
                                +2k
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 text-[#00ff88] mb-1">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-400 text-sm font-medium">Rated 4.9/5 by Engineers</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right: 3D Holographic Card Concept */}
                <motion.div
                    style={{ y: y1, rotateX }}
                    className="hidden lg:block relative z-20 perspective-1000"
                >
                    {/* The Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative w-full aspect-[4/5] max-w-md mx-auto bg-[#121216] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden group transform transition-transform duration-500 hover:scale-[1.02]"
                    >
                        {/* Image Layer */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
                            <img src={course.heroImage} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        {/* Glass Overlay Content */}
                        <div className="absolute bottom-0 inset-x-0 p-8 z-20">
                            <div className="p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg mb-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[#00ff88] text-xs font-bold uppercase tracking-widest mb-1">Next Batch</p>
                                        <h3 className="text-2xl font-bold text-white">Feb 12, 2025</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center text-black">
                                        <Zap size={20} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-300">
                                        <ShieldCheck size={16} className="text-[#00ff88] mr-2" />
                                        <span>Certified Curriculum</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <Users size={16} className="text-[#00ff88] mr-2" />
                                        <span>Limited to 50 Seats</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Holographic Shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine pointer-events-none" />
                    </motion.div>

                    {/* Floating Background Elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00ff88] rounded-full blur-[80px] opacity-40 animate-pulse-slow" />
                    <div className="absolute top-1/2 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-[90px] opacity-30 animate-float" />
                </motion.div>
            </div>
        </section>
    );
}
