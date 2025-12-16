import React from 'react';

export default function ToolsStack() {
    const tools = [
        "ChatGPT", "Claude", "Gemini", "Grok", "Midjourney",
        "Runway", "ElevenLabs", "Zapier", "Make", "LangChain",
        "LangGraph", "LlamaIndex", "Hugging Face", "Notion AI"
    ];

    return (
        <section className="py-20 bg-[var(--bg-color)]">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Master the AI Stack Professionals Use</h2>
                    <p className="text-[var(--text-muted)]">We don't just teach theory. We build with these tools daily.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Make */}
                    <div className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-6 hover:border-[var(--primary)]/30 transition-all duration-300">
                        <div className="h-40 w-full bg-gradient-to-br from-purple-900/20 to-black rounded-[12px] border border-white/5 flex items-center justify-center mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] transition-shadow">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <span className="text-2xl font-bold text-white z-10">make</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#888888] bg-[#1a1a1a] px-2 py-1 rounded-[6px] border border-white/5 uppercase">No-Code Automation</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Make.com</h3>
                        <p className="text-sm text-[var(--text-muted)]">Advanced no-code workflow automation builder.</p>
                    </div>

                    {/* Claude */}
                    <div className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-6 hover:border-[var(--primary)]/30 transition-all duration-300">
                        <div className="h-40 w-full bg-gradient-to-br from-orange-900/20 to-black rounded-[12px] border border-white/5 flex items-center justify-center mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-shadow">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <svg className="h-12 w-auto fill-current text-[#D97757]" viewBox="0 0 24 24"><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" /></svg>
                        </div>
                        <div className="mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#888888] bg-[#1a1a1a] px-2 py-1 rounded-[6px] border border-white/5 uppercase">LLM Assistant</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Claude 3.5 Sonnet</h3>
                        <p className="text-sm text-[var(--text-muted)]">Top-tier reasoning and coding capabilities.</p>
                    </div>

                    {/* Cursor */}
                    <div className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-6 hover:border-[var(--primary)]/30 transition-all duration-300">
                        <div className="h-40 w-full bg-gradient-to-br from-blue-900/20 to-black rounded-[12px] border border-white/5 flex items-center justify-center mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-shadow">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <svg className="h-10 w-auto fill-current text-white" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z" /></svg>
                        </div>
                        <div className="mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#888888] bg-[#1a1a1a] px-2 py-1 rounded-[6px] border border-white/5 uppercase">AI Code Editor</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Cursor</h3>
                        <p className="text-sm text-[var(--text-muted)]">The AI-first code editor for rapid development.</p>
                    </div>

                    {/* Runway */}
                    <div className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-6 hover:border-[var(--primary)]/30 transition-all duration-300">
                        <div className="h-40 w-full bg-gradient-to-br from-pink-900/20 to-black rounded-[12px] border border-white/5 flex items-center justify-center mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-shadow">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <span className="text-xl font-bold text-white italic tracking-tighter">runway</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#888888] bg-[#1a1a1a] px-2 py-1 rounded-[6px] border border-white/5 uppercase">Video Generation</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Runway Gen-3</h3>
                        <p className="text-sm text-[var(--text-muted)]">Cinematic AI video generation and editing.</p>
                    </div>

                    {/* Luma AI */}
                    <div className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-6 hover:border-[var(--primary)]/30 transition-all duration-300">
                        <div className="h-40 w-full bg-gradient-to-br from-cyan-900/20 to-black rounded-[12px] border border-white/5 flex items-center justify-center mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-shadow">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <span className="text-xl font-bold text-white tracking-widest">LUMA</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#888888] bg-[#1a1a1a] px-2 py-1 rounded-[6px] border border-white/5 uppercase">3D & Video</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Luma Dream Machine</h3>
                        <p className="text-sm text-[var(--text-muted)]">High-fidelity text-to-video generation.</p>
                    </div>

                    {/* Midjourney */}
                    <div className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-6 hover:border-[var(--primary)]/30 transition-all duration-300">
                        <div className="h-40 w-full bg-gradient-to-br from-white/10 to-black rounded-[12px] border border-white/5 flex items-center justify-center mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <svg className="h-10 w-auto fill-current text-white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.5 17L12 14L10.5 17L8 12L10.5 7L12 10L13.5 7L16 12L13.5 17Z" /></svg>
                        </div>
                        <div className="mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#888888] bg-[#1a1a1a] px-2 py-1 rounded-[6px] border border-white/5 uppercase">Image Generation</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Midjourney v6</h3>
                        <p className="text-sm text-[var(--text-muted)]">The gold standard for AI imagery.</p>
                    </div>

                    {/* V0 */}
                    <div className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-6 hover:border-[var(--primary)]/30 transition-all duration-300">
                        <div className="h-40 w-full bg-gradient-to-br from-gray-800 to-black rounded-[12px] border border-white/5 flex items-center justify-center mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow">
                            <span className="text-2xl font-mono font-bold text-white">v0</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#888888] bg-[#1a1a1a] px-2 py-1 rounded-[6px] border border-white/5 uppercase">UI Generation</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">v0 by Vercel</h3>
                        <p className="text-sm text-[var(--text-muted)]">Generate UI components with simple prompts.</p>
                    </div>

                    {/* ElevenLabs */}
                    <div className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-6 hover:border-[var(--primary)]/30 transition-all duration-300">
                        <div className="h-40 w-full bg-gradient-to-br from-green-900/20 to-black rounded-[12px] border border-white/5 flex items-center justify-center mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-shadow">
                            <span className="text-2xl font-bold text-white">II</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#888888] bg-[#1a1a1a] px-2 py-1 rounded-[6px] border border-white/5 uppercase">Voice Synthesis</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">ElevenLabs</h3>
                        <p className="text-sm text-[var(--text-muted)]">Hyper-realistic AI voice generation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
