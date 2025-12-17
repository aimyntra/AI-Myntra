import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StickyBottomBar() {
    const navigate = useNavigate();
    // Set target date to 4 hours and 50 minutes from now (simulated as per snapshot)
    // In a real app, this might be a fixed date or stored in local storage to persist
    const [timeLeft, setTimeLeft] = useState(4 * 60 * 60 + 50 * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `04:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; // Hardcoded '04' hour match snapshot logic for visual compliance or dynamic? 
        // The snapshot says "04:50" which looks like MM:SS or HH:MM? 
        // "Offer expires in 04:50". usually MM:SS. Let's assume MM:SS for a short deadline or HH:MM for longer.
        // If it's "Only 25 Slots Left!", usually urgency is high.
        // Let's make it MM:SS format if < 1 hour, or HH:MM if > 1 hour.
        // Snapshot shows "04:50". Could be 4 minutes 50 seconds.
    };

    // Re-implementing format for 04:50 (MM:SS) style to match snapshot exactly if it's a short timer
    // OR HH:MM? "Offer expires in 04:50". 
    // Let's assume it's Minutes:Seconds for high urgency.
    const formatTimeDisplay = (totalSeconds) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#1a1a0f] border-t border-[#39FF14]/30 z-50 py-3 px-4 md:px-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Left: Text Info */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-white text-lg md:text-xl font-serif font-medium">
                        AI Mastermind
                    </h3>
                    <p className="text-[#888] text-xs md:text-sm">
                        Final Call: Only 25 Slots Left!
                    </p>
                </div>

                {/* Center/Right: CTA & Timer */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/programs/gen-ai-mastermind')}
                        className="bg-[#CCF381] hover:bg-[#bbe075] text-black font-semibold px-6 py-2 rounded-md transition-colors cursor-pointer"
                    >
                        Join the free Mastermind
                    </button>

                    <div className="hidden md:block h-8 w-[1px] bg-[#333]"></div>

                    <div className="text-right hidden md:block">
                        <div className="text-white font-medium flex items-center gap-2">
                            <span className="text-[#888] line-through text-sm">₹24,999</span>
                            <span>Free</span>
                        </div>
                        <div className="text-[#888] text-xs">
                            Offer expires in <span className="text-white font-mono">{formatTimeDisplay(timeLeft)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
