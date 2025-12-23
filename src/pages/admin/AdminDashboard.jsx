import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    BookOpen,
    IndianRupee,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Search,
    Filter,
    MoreVertical,
    PlusCircle, // Added for Quick Actions
    Settings // Added for Quick Actions
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
    const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalStudents: 0,
        activeEnrollments: 0,
        completedLessons: 0
    });

    const [recentEnrollments, setRecentEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    const isAdmin = user?.primaryEmailAddress?.emailAddress === 'kumawatnaresh@gmail.com';

    useEffect(() => {
        if (isUserLoaded && isSignedIn && isAdmin) {
            fetchAdminStats();
        } else if (isUserLoaded && (!isSignedIn || !isAdmin)) {
            setLoading(false);
        }
    }, [isUserLoaded, isSignedIn, isAdmin]);

    const fetchAdminStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();

            if (data.success) {
                setStats(data.stats || stats);
                setRecentEnrollments(data.recentEnrollments || []);
            }
        } catch (error) {
            console.error('Error fetching admin stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isUserLoaded || (loading && isSignedIn && isAdmin)) {
        return (
            <div className="min-h-screen bg-[#050507] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isSignedIn || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    const statCards = [
        { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, change: '+12.5%', isUp: true },
        { label: 'Total Students', value: stats.totalStudents.toLocaleString(), icon: Users, change: '+18.2%', isUp: true },
        { label: 'Total Enrollments', value: stats.activeEnrollments, icon: BookOpen, change: '+2', isUp: true },
        { label: 'Completed Lessons', value: stats.completedLessons, icon: Activity, change: '+5.4%', isUp: true },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
                    <p className="text-gray-400">Welcome to your admin control center.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl group hover:border-[#00ff88]/30 transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#00ff88]/10 transition-colors">
                                    <stat.icon className="text-[#00ff88]" size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Enrollments Table */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Recent Enrollments</h2>
                            <div className="flex items-center gap-2">
                                <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all">
                                    <Filter size={18} />
                                </button>
                                <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5">
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-400">Student</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-400">Course</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-400">Amount</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-400 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentEnrollments.map((enrollment, index) => (
                                        <tr
                                            key={enrollment.id}
                                            className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm">{enrollment.full_name || 'Anonymous'}</span>
                                                    <span className="text-xs text-gray-500">{enrollment.email || enrollment.clerk_user_id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm capitalize">{enrollment.course_slug.replace(/-/g, ' ')}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold">₹{enrollment.payment_id ? 'Paid' : 'Free/Manual'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`
                                                    px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                    ${enrollment.completed ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                        'bg-blue-500/10 text-blue-500 border border-blue-500/20'}
                                                `}>
                                                    {enrollment.completed ? 'Completed' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-gray-500">
                                                {new Date(enrollment.enrolled_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-white/5 text-center">
                                <button className="text-[#00ff88] text-sm font-bold hover:underline">
                                    View All Transactions
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions / Recent Activity */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">Quick Actions</h2>
                        <div className="space-y-3">
                            {[
                                { label: 'Create Announcement', icon: Activity },
                                { label: 'Add Static Resource', icon: PlusCircle },
                                { label: 'Manage Instructors', icon: Users },
                                { label: 'System Settings', icon: Settings },
                            ].map((action) => (
                                <button
                                    key={action.label}
                                    className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-[#00ff88]/30 transition-all text-left"
                                >
                                    <div className="p-2 bg-white/5 rounded-lg text-[#00ff88]">
                                        <action.icon size={18} />
                                    </div>
                                    <span className="font-medium text-sm">{action.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="bg-gradient-to-br from-[#00ff88]/10 to-transparent border border-[#00ff88]/20 p-6 rounded-2xl">
                            <h3 className="font-bold mb-2">Need Help?</h3>
                            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                                Our platform management tools are designed to be intuitive. Check the documentation for advanced features.
                            </p>
                            <button className="w-full py-2 bg-[#00ff88] text-black font-bold rounded-xl text-sm">
                                View Docs
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
