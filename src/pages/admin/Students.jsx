import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Calendar, User, MoreVertical, BookOpen } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            const data = await response.json();
            if (data.success) {
                // For now use enrollment data as student data
                setStudents(data.recentEnrollments || []);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students.filter(student =>
        (student.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Student Management</h1>
                    <p className="text-gray-400">View and manage all registered learners.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0a0a0f] border border-white/5 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                        />
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Student</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Course</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Joined</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Progress</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        Loading students...
                                    </td>
                                </tr>
                            ) : filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No students found.
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#00ff88]">
                                                    <User size={20} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm">{student.full_name || 'Anonymous'}</span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Mail size={12} /> {student.email || student.clerk_user_id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm capitalize">{student.course_slug.replace(/-/g, ' ')}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-400 flex items-center gap-1">
                                                <Calendar size={14} /> {new Date(student.enrolled_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                                                    <div
                                                        className="h-full bg-[#00ff88] transition-all"
                                                        style={{ width: `${student.progress || 0}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold">{student.progress || 0}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
