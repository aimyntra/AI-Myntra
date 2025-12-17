import React from 'react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';
import { ArrowRight } from 'lucide-react';

export default function MegaMenu({ isOpen, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div
            className="absolute top-full right-0 mt-4 w-[900px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl p-6 z-50 animate-fade-in-up"
            onMouseLeave={onClose}
        >
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course, index) => (
                    <div
                        key={course.id}
                        onClick={() => {
                            navigate(`/programs/${course.slug}`);
                            onClose();
                        }}
                        className="group relative p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
                    >
                        {/* Visual Divider (Top line for rows except first) */}
                        {index > 2 && (
                            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                        )}

                        <div className="flex flex-col gap-2">
                            <h4 className="text-white font-bold group-hover:text-[var(--primary)] transition-colors flex items-center justify-between">
                                {course.title}
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                            </h4>
                            <p className="text-xs text-[#888] line-clamp-2 leading-relaxed">
                                {course.tagline}
                            </p>
                            <span className="text-[10px] text-[#555] font-mono mt-1 border border-white/5 w-fit px-2 py-0.5 rounded">
                                {course.duration}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Add simple CSS for fade animation if not present (tailwind config usually handles it, but fallback style block ensuring visible transition)
