import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText } from 'lucide-react';

export default function LessonContent({ lesson, week }) {
    if (!lesson) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Select a lesson to begin</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            key={`${week}-${lesson.day}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 max-w-4xl mx-auto"
        >
            {/* Lesson Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <span>Week {week}</span>
                    <span>•</span>
                    <span>{lesson.day}</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    {lesson.topic}
                </h1>
                <p className="text-xl text-gray-400">
                    {lesson.description}
                </p>
            </div>

            {/* Video Player Placeholder */}
            <div className="mb-8">
                <div className="aspect-video bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0f] rounded-2xl border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-4">
                            <Video size={40} className="text-[#00ff88]" />
                        </div>
                        <p className="text-gray-400 mb-2">Video Content</p>
                        <p className="text-sm text-gray-600">
                            Video player will be integrated here
                        </p>
                    </div>
                </div>
            </div>

            {/* Lesson Content */}
            <div className="prose prose-invert max-w-none">
                <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-[#00ff88]" />
                        Lesson Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                        {lesson.description}
                    </p>
                </div>

                {/* Key Takeaways */}
                <div className="bg-gradient-to-br from-[#00ff88]/5 to-transparent border border-[#00ff88]/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                        What You'll Learn
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                            <span className="text-[#00ff88] mt-1">•</span>
                            <span>Core concepts and foundational knowledge</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#00ff88] mt-1">•</span>
                            <span>Practical implementation techniques</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#00ff88] mt-1">•</span>
                            <span>Real-world applications and use cases</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#00ff88] mt-1">•</span>
                            <span>Best practices and industry standards</span>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
