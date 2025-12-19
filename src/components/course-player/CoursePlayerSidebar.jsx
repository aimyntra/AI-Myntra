import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Lock } from 'lucide-react';

export default function CoursePlayerSidebar({ course, currentLesson, onLessonSelect, completedLessons }) {
    const [expandedWeeks, setExpandedWeeks] = useState([1]); // First week expanded by default

    const toggleWeek = (weekNum) => {
        setExpandedWeeks(prev =>
            prev.includes(weekNum)
                ? prev.filter(w => w !== weekNum)
                : [...prev, weekNum]
        );
    };

    const isLessonCompleted = (week, day) => {
        return completedLessons.some(l => l.week === week && l.day === day);
    };

    const isCurrentLesson = (week, day) => {
        return currentLesson?.week === week && currentLesson?.day === day;
    };

    return (
        <div className="h-full bg-[#0a0a0f] border-r border-white/10 overflow-y-auto">
            {/* Course Info Header */}
            <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-400">{course.duration}</p>
            </div>

            {/* Curriculum Tree */}
            <div className="p-4">
                {course.curriculum?.map((weekData) => (
                    <div key={weekData.week} className="mb-2">
                        {/* Week Header */}
                        <button
                            onClick={() => toggleWeek(weekData.week)}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all group"
                        >
                            <div className="flex items-center gap-2">
                                {expandedWeeks.includes(weekData.week) ? (
                                    <ChevronDown size={16} className="text-gray-400" />
                                ) : (
                                    <ChevronRight size={16} className="text-gray-400" />
                                )}
                                <span className="text-sm font-semibold text-white">
                                    Week {weekData.week}: {weekData.title}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">
                                {weekData.days?.length || 0} lessons
                            </span>
                        </button>

                        {/* Days/Lessons */}
                        <AnimatePresence>
                            {expandedWeeks.includes(weekData.week) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="ml-6 mt-1 space-y-1 overflow-hidden"
                                >
                                    {weekData.days?.map((dayData, index) => {
                                        const completed = isLessonCompleted(weekData.week, index + 1);
                                        const isCurrent = isCurrentLesson(weekData.week, index + 1);

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => onLessonSelect(weekData.week, index + 1, dayData)}
                                                className={`
                                                    w-full flex items-start gap-3 p-2 rounded-lg transition-all text-left
                                                    ${isCurrent ? 'bg-[#00ff88]/10 border border-[#00ff88]/30' : 'hover:bg-white/5'}
                                                `}
                                            >
                                                {/* Completion Icon */}
                                                <div className="mt-0.5">
                                                    {completed ? (
                                                        <CheckCircle size={16} className="text-[#00ff88]" />
                                                    ) : (
                                                        <Circle size={16} className="text-gray-600" />
                                                    )}
                                                </div>

                                                {/* Lesson Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-xs font-medium mb-1 ${isCurrent ? 'text-[#00ff88]' : 'text-white'}`}>
                                                        {dayData.day}: {dayData.topic}
                                                    </p>
                                                    <p className="text-xs text-gray-500 line-clamp-1">
                                                        {dayData.description}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
