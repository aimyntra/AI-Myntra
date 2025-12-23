import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    IndianRupee,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Download,
    Filter,
    Calendar,
    BarChart
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Revenue() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        currentMonth: 0,
        previousMonth: 0,
        growth: 0
    });
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRevenueData();
    }, []);

    const fetchRevenueData = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            const data = await response.json();
            if (data.success) {
                setStats({
                    totalRevenue: data.stats?.totalRevenue || 0,
                    currentMonth: data.stats?.totalRevenue || 0, // Mock for now
                    previousMonth: 0,
                    growth: 100
                });
                setTransactions(data.recentEnrollments || []);
            }
        } catch (error) {
            console.error('Error fetching revenue:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Revenue Analytics</h1>
                        <p className="text-gray-400">Track your earnings and transaction history.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all text-sm">
                        <Download size={18} />
                        Export Report
                    </button>
                </div>

                {/* Performance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                                <IndianRupee size={24} />
                            </div>
                            <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                                <TrendingUp size={14} /> +{stats.growth}%
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Revenue</h3>
                        <p className="text-3xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>

                    <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                <BarChart size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Average Order Value</h3>
                        <p className="text-3xl font-bold text-white">₹4,999</p>
                    </div>

                    <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                                <Calendar size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Last 30 Days</h3>
                        <p className="text-3xl font-bold text-white">₹{stats.currentMonth.toLocaleString()}</p>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Transaction History</h2>
                        <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all">
                            <Filter size={18} />
                        </button>
                    </div>

                    <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Payment ID</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Customer</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Course</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Amount</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-400 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No recent transactions found.
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((tx) => (
                                        <tr key={tx.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="text-xs bg-white/5 px-2 py-1 rounded text-orange-400">
                                                    {tx.payment_id || 'manual_entry'}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-sm">
                                                {tx.full_name || tx.email || 'Anonymous'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {tx.course_slug.replace(/-/g, ' ')}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#00ff88]">
                                                ₹{tx.payment_id ? '4,999' : '0'}
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-500 text-sm">
                                                {new Date(tx.enrolled_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
