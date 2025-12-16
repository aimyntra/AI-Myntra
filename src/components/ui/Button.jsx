import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[var(--primary)] text-black hover:bg-[var(--primary-dim)] shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]",
    secondary: "border border-[var(--border-color)] text-white hover:border-[var(--primary)] hover:text-[var(--primary)] bg-transparent",
    outline: "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black",
    ghost: "text-[var(--text-muted)] hover:text-white bg-transparent hover:bg-white/5",
    glow: "bg-black text-[var(--primary)] border border-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)] hover:shadow-[0_0_25px_var(--primary-glow)]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
