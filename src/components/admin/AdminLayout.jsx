import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    BarChart3,
    Settings,
    PlusCircle,
    LogOut,
    Menu,
    X,
    TrendingUp,
    IndianRupee,
    GraduationCap,
    Clock
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
        { icon: Users, label: 'Students', path: '/admin/students' },
        { icon: BarChart3, label: 'Revenue', path: '/admin/revenue' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#050507] text-white flex">
            {/* Sidebar */}
            <aside
                className={`
                    ${isSidebarOpen ? 'w-64' : 'w-20'} 
                    bg-[#0a0a0f] border-r border-white/5 transition-all duration-300 flex flex-col fixed h-full z-50
                `}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#00ff88] to-[#00cc6a] rounded-lg flex items-center justify-center font-bold text-black text-sm">
                                AM
                            </div>
                            <span className="font-bold text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                AI Myntra
                            </span>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-[#00ff88] rounded-lg flex items-center justify-center font-bold text-black text-sm mx-auto">
                            AM
                        </div>
                    )}
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                        >
                            <motion.div
                                whileHover={{ x: 5 }}
                                className={`
                                    flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                                    ${location.pathname === item.path
                                        ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                <item.icon size={20} />
                                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                            </motion.div>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-4 px-4 py-3">
                        <UserButton afterSignOutUrl="/" />
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">Admin Panel</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Header */}
                <header className="h-16 border-b border-white/5 bg-[#050507]/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="flex items-center gap-4">
                        <Link to="/admin/courses/new">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#00ff88] text-black font-bold rounded-xl text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                                <PlusCircle size={18} />
                                Create Course
                            </button>
                        </Link>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
