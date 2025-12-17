import React from 'react';

export default function ProminentDivider() {
    return (
        <div className="relative py-20 overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-gradient-to-r from-[var(--primary)]/20 via-purple-500/20 to-[var(--primary)]/20 blur-[100px] pointer-events-none"></div>

            {/* Visual Divider */}
            <div className="container relative">
                <div className="flex items-center gap-4 max-w-4xl mx-auto">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-white/40"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-[var(--primary)]/60"></div>
                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></div>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
                </div>
            </div>
        </div>
    );
}
