import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { courses } from '../../data/courses';
import Button from '../ui/Button';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const menuVariants = {
    closed: {
        opacity: 0,
        y: "-100%",
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
};

export default function MobileMenu({ onClose }) {
    const [coursesOpen, setCoursesOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[60] bg-[#050505]/98 backdrop-blur-xl flex flex-col p-6 overflow-y-auto"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <Link to="/" onClick={onClose} className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-white leading-none">AI Mantra</span>
                    <span className="text-[10px] text-[var(--primary)] tracking-widest uppercase font-semibold">Build the Future</span>
                </Link>
                <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-white/10"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-6 flex-1">
                <motion.div variants={itemVariants}>
                    <button
                        onClick={() => handleNavigation('/about')}
                        className="text-3xl font-bold text-white hover:text-[var(--primary)] transition-colors w-full text-left"
                    >
                        Methodology
                    </button>
                    <div className="h-px bg-white/5 mt-6 w-full" />
                </motion.div>

                {/* Courses Accordion */}
                <motion.div variants={itemVariants} className="flex flex-col">
                    <button
                        onClick={() => setCoursesOpen(!coursesOpen)}
                        className="flex items-center justify-between text-3xl font-bold text-white hover:text-[var(--primary)] transition-colors w-full text-left group"
                    >
                        Explore Programs
                        <ChevronDown
                            size={24}
                            className={`transition-transform duration-300 ${coursesOpen ? 'rotate-180 text-[var(--primary)]' : 'text-gray-500'}`}
                        />
                    </button>

                    <AnimatePresence>
                        {coursesOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="py-6 flex flex-col gap-4 pl-4 border-l border-white/10 ml-2 mt-4">
                                    {courses.map((course) => (
                                        <div
                                            key={course.id}
                                            onClick={() => handleNavigation(`/programs/${course.slug}`)}
                                            className="group/item flex items-center justify-between py-2 cursor-pointer"
                                        >
                                            <span className="text-gray-400 group-hover/item:text-white transition-colors text-lg font-medium">
                                                {course.title}
                                            </span>
                                            <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-[var(--primary)]" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="h-px bg-white/5 mt-6 w-full" />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <button className="text-3xl font-bold text-white hover:text-[var(--primary)] transition-colors w-full text-left">
                        Alumni Stories
                    </button>
                    <div className="h-px bg-white/5 mt-6 w-full" />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <button className="text-3xl font-bold text-white hover:text-[var(--primary)] transition-colors w-full text-left">
                        For Business
                    </button>
                </motion.div>
            </div>

            {/* Footer Actions */}
            <motion.div variants={itemVariants} className="mt-12 flex flex-col gap-4">
                <SignedOut>
                    <Link to="/sign-in" onClick={onClose}>
                        <Button className="w-full justify-center !py-4 text-lg">
                            Sign In / Join
                        </Button>
                    </Link>
                </SignedOut>

                <SignedIn>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 border border-white/20"
                                }
                            }}
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">My Account</span>
                            <span className="text-xs text-gray-400">Manage your profile</span>
                        </div>
                    </div>
                </SignedIn>

                <Link to="/apply-mentor" onClick={onClose}>
                    <Button variant="secondary" className="w-full justify-center !py-4 text-lg">
                        Apply as Mentor
                    </Button>
                </Link>

                <div className="flex items-center justify-center gap-6 mt-6 text-gray-500">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                </div>
            </motion.div>
        </motion.div>
    );
}
