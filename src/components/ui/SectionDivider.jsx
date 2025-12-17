import React from 'react';

export default function SectionDivider() {
    return (
        <div className="w-full flex justify-center py-8 md:py-12">
            <div className="w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#333] to-transparent relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50 blur-[1px]"></div>
            </div>
        </div>
    );
}
