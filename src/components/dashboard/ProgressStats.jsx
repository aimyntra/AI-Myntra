import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Award, Clock } from 'lucide-react';

export default function ProgressStats({ enrollments }) {
    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(e => e.completed).length;
    const totalProgress = enrollments.reduce((sum, e) => sum + e.progress, 0);
    const avgProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;

    const stats = [
        {
            icon: BookOpen,
            label: 'Enrolled Courses',
            value: totalCourses,
            color: '#00ff88',
            bgColor: 'rgba(0, 255, 136, 0.1)'
        },
        {
            icon: TrendingUp,
            label: 'Average Progress',
            value: `${avgProgress}%`,
            color: '#00bfff',
            bgColor: 'rgba(0, 191, 255, 0.1)'
        },
        {
            icon: Award,
            label: 'Completed',
            value: completedCourses,
            color: '#ffd700',
            bgColor: 'rgba(255, 215, 0, 0.1)'
        },
        {
            icon: Clock,
            label: 'In Progress',
            value: totalCourses - completedCourses,
            color: '#ff6b6b',
            bgColor: 'rgba(255, 107, 107, 0.1)'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#121216] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
                    style={{ backgroundColor: stat.bgColor }}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: stat.color + '20', color: stat.color }}
                        >
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                            <p className="text-white text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
