import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    CheckCircle,
    XCircle,
    Copy,
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { courses } from '../../data/courses';

export default function AdminCourseManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [dbCourses, setDbCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/admin/courses');
            const data = await response.json();
            if (data.success) {
                // Normalize DB courses to match static structure where needed
                const normalizedDb = (data.courses || []).map(c => ({
                    ...c,
                    heroImage: c.image_url, // fallback
                    isDb: true
                }));
                setDbCourses(normalizedDb);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    // Combine static and dynamic
    const allCourses = [...dbCourses, ...courses];

    const filteredCourses = allCourses.filter(course =>
        (course.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Course Management</h1>
                        <p className="text-gray-400">Create, edit, and manage your learning content.</p>
                    </div>
                    <Link to="/admin/courses/new">
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                            <Plus size={20} />
                            Add New Course
                        </button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 bg-[#0a0a0f] border border-white/5 p-4 rounded-2xl">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                        />
                    </div>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-colors">
                        Filters
                    </button>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-[#0a0a0f] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#00ff88]/30 transition-all"
                        >
                            <div className="relative aspect-video">
                                <img
                                    src={course.heroImage || course.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995'}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`
                                        px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10
                                        ${course.status === 'Published' ? 'text-green-400' : 'text-yellow-400'}
                                    `}>
                                        {course.status || 'Published'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold line-clamp-1">{course.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-1">/{course.slug}</p>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="text-gray-400">
                                        <span className="text-white font-bold">₹{course.price}</span>
                                        <span className="mx-2">•</span>
                                        <span>{course.curriculum?.length || 0} Modules</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[#00ff88]">
                                        <CheckCircle size={14} />
                                        <span className="font-semibold">Ready</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <Link
                                        to={course.isDb ? `/admin/courses/edit/${course.slug}` : '#'}
                                        className={`flex-1 flex items-center justify-center gap-2 p-2.5 border border-white/10 rounded-xl text-sm font-semibold transition-colors ${course.isDb ? 'bg-white/5 hover:bg-white/10' : 'bg-white/5 opacity-50 cursor-not-allowed'}`}
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/programs/${course.slug}`}
                                        target="_blank"
                                        className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
                                    >
                                        <Eye size={16} />
                                        View
                                    </Link>
                                    <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
