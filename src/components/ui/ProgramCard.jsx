import React from 'react';
import { Check, ArrowRight, Clock, BarChart, Sparkles } from 'lucide-react';
import Button from './Button';

export default function ProgramCard({
  title,
  duration,
  level,
  description,
  tools,
  outcome,
  cta,
  highlight = false
}) {
  return (
    <div className={`
      relative p-6 rounded-[14px] transition-all duration-300 flex flex-col h-full border
      ${highlight
        ? 'active-card z-10'
        : 'hover:border-[var(--border-color)] border-transparent bg-transparent hover:bg-white/[0.03]'
      }
    `}>
      {highlight && (
        <div className="absolute -top-3 left-8 bg-[var(--primary)] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mb-8 flex-grow">
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50 mb-4">You will achieve</h4>

          {/* Converting string description/outcome into bullet points style if not provided */}
          <div className="flex items-start gap-3">
            <Check size={16} className="text-[var(--primary)] mt-1 shrink-0 px-0" />
            <span className="text-gray-300 text-sm">{outcome || "Complete project portfolio"}</span>
          </div>
          <div className="flex items-start gap-3">
            <Check size={16} className="text-[var(--primary)] mt-1 shrink-0 px-0" />
            <span className="text-gray-300 text-sm">Certificate of Completion</span>
          </div>
          <div className="flex items-start gap-3">
            <Check size={16} className="text-[var(--primary)] mt-1 shrink-0 px-0" />
            <span className="text-gray-300 text-sm">Lifetime Community Access</span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          variant={highlight ? 'primary' : 'outline'}
          className={`w-full !justify-center !py-3 !text-sm ${!highlight && '!border-white/10 !text-white hover:!bg-white hover:!text-black'}`}
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}
