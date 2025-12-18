import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, TrendingUp, Award } from 'lucide-react';

export default function EnrolledCourseCard({ enrollment, courseData }) {
    const { course_slug, progress, completed } = enrollment;

    // Find course data from courses.js
    const course = courseData;

    if (!course) return null;

    return (
        <motion.div
            whileHover={{ scale: 1.02, translateY: -5 }}
            className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] transition-all group"
        >
            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.heroImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />

                {/* Completion Badge */}
                {completed && (
                    <div className="absolute top-4 right-4 bg-[#00ff88] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Award size={14} /> Completed
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-1">{course.tagline}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">Progress</span>
                        <span className="text-xs font-bold text-[#00ff88]">{progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#00ff88] to-[#00cc6a] rounded-full"
                        />
                    </div>
                </div>

                {/* CTA */}
                <Link to={`/learn/${course_slug}`}>
                    <button className="w-full py-3 bg-[#00ff88]/10 hover:bg-[#00ff88]/20 border border-[#00ff88]/30 text-[#00ff88] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                        <PlayCircle size={18} />
                        {completed ? 'Review Course' : 'Continue Learning'}
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}
