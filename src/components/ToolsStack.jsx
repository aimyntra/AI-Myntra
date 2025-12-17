import React from 'react';
import {
    Bot, Image, Video, Mic, Code, Zap, Globe, Cpu, Workflow, Database,
    Sparkles, MessageSquare, Terminal, Layout, Share2, Search, PenTool,
    Layers, Aperture, Command, Box, Radio, Activity, Grid
} from 'lucide-react';

export default function ToolsStack() {
    const categories = [
        {
            name: "LLMs & Chat",
            tools: [
                { name: "ChatGPT", icon: <MessageSquare className="text-green-400" />, desc: "OpenAI", url: "https://chat.openai.com" },
                { name: "Claude 3.5", icon: <Bot className="text-orange-400" />, desc: "Anthropic", url: "https://claude.ai" },
                { name: "Gemini", icon: <Sparkles className="text-blue-400" />, desc: "Google", url: "https://gemini.google.com" },
                { name: "Grok", icon: <Terminal className="text-white" />, desc: "xAI", url: "https://grok.x.ai" },
                { name: "Perplexity", icon: <Search className="text-teal-400" />, desc: "Search", url: "https://perplexity.ai" },
                { name: "Mistral", icon: <Aperture className="text-yellow-400" />, desc: "Open Source", url: "https://mistral.ai" },
                { name: "Llama 3", icon: <Cpu className="text-blue-500" />, desc: "Meta", url: "https://llama.meta.com" }
            ]
        },
        {
            name: "Image & Video",
            tools: [
                { name: "Midjourney", icon: <Image className="text-purple-400" />, desc: "Art Gen", url: "https://midjourney.com" },
                { name: "Stable Diff.", icon: <Layers className="text-pink-400" />, desc: "SDXL", url: "https://stability.ai" },
                { name: "Runway", icon: <Video className="text-red-400" />, desc: "Video Gen", url: "https://runwayml.com" },
                { name: "Pika", icon: <Zap className="text-yellow-300" />, desc: "Animation", url: "https://pika.art" },
                { name: "Luma", icon: <Box className="text-cyan-400" />, desc: "3D/Video", url: "https://lumalabs.ai" },
                { name: "Kling AI", icon: <Activity className="text-indigo-400" />, desc: "Cinematic", url: "https://kling.ai" },
                { name: "Magnific", icon: <Aperture className="text-orange-300" />, desc: "Upscaling", url: "https://magnific.ai" }
            ]
        },
        {
            name: "Coding & Agents",
            tools: [
                { name: "Cursor", icon: <Code className="text-blue-400" />, desc: "IDE", url: "https://cursor.sh" },
                { name: "GitHub Copilot", icon: <Bot className="text-white" />, desc: "Assistant", url: "https://github.com/features/copilot" },
                { name: "Replit", icon: <Terminal className="text-orange-500" />, desc: "Cloud IDE", url: "https://replit.com" },
                { name: "V0", icon: <Layout className="text-white" />, desc: "UI Gen", url: "https://v0.dev" },
                { name: "Devin", icon: <Cpu className="text-purple-500" />, desc: "Engineer", url: "https://cognition.ai/devin" },
                { name: "CrewAI", icon: <Share2 className="text-red-400" />, desc: "Agents", url: "https://crewai.com" },
                { name: "LangChain", icon: <Workflow className="text-green-500" />, desc: "Framework", url: "https://langchain.com" }
            ]
        },
        {
            name: "Automation & Voice",
            tools: [
                { name: "Make", icon: <Workflow className="text-purple-600" />, desc: "Automation", url: "https://make.com" },
                { name: "Zapier", icon: <Zap className="text-orange-500" />, desc: "Connect", url: "https://zapier.com" },
                { name: "n8n", icon: <Workflow className="text-pink-500" />, desc: "Workflow", url: "https://n8n.io" },
                { name: "ElevenLabs", icon: <Mic className="text-white" />, desc: "Voice", url: "https://elevenlabs.io" },
                { name: "HeyGen", icon: <Video className="text-purple-400" />, desc: "Avatars", url: "https://heygen.com" },
                { name: "Suno", icon: <Radio className="text-white" />, desc: "Music", url: "https://suno.com" },
                { name: "Udio", icon: <Radio className="text-red-400" />, desc: "Audio", url: "https://udio.com" }
            ]
        },
        {
            name: "Productivity",
            tools: [
                { name: "Notion AI", icon: <Grid className="text-white" />, desc: "Docs", url: "https://notion.so" },
                { name: "Gamma", icon: <Layout className="text-yellow-400" />, desc: "Slides", url: "https://gamma.app" },
                { name: "Beautiful.ai", icon: <Sparkles className="text-blue-400" />, desc: "Design", url: "https://beautiful.ai" },
                { name: "Otter.ai", icon: <Mic className="text-blue-500" />, desc: "Meetings", url: "https://otter.ai" },
                { name: "Rewind", icon: <Activity className="text-orange-400" />, desc: "Memory", url: "https://rewind.ai" },
                { name: "Descript", icon: <PenTool className="text-green-400" />, desc: "Editing", url: "https://descript.com" }
            ]
        }
    ];

    return (
        <section className="py-24 bg-[#050505] overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16 relative z-10">
                    <span className="text-[#CCF381] font-mono text-xs tracking-widest uppercase mb-4 block">Powerhouse Toolkit</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Master the AI Stack <span className="text-[#CCF381]">Professionals Use</span>
                    </h2>
                    <p className="text-[#888] text-lg max-w-2xl mx-auto">
                        We don't just teach theory. We build with these 30+ enterprise-grade tools every single day to deliver real results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="space-y-4">
                            <h3 className="text-white font-bold text-sm tracking-widest border-b border-[#222] pb-2 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#CCF381]"></span>
                                {cat.name}
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {cat.tools.map((tool, tIdx) => (
                                    <a
                                        key={tIdx}
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#CCF381]/30 rounded-lg p-3 flex items-center gap-3 transition-all duration-300 hover:bg-[#111] hover:-translate-y-1"
                                    >
                                        <div className="w-8 h-8 rounded bg-[#151515] flex items-center justify-center border border-[#222] group-hover:border-[#CCF381]/20 transition-colors">
                                            {React.cloneElement(tool.icon, { size: 16 })}
                                        </div>
                                        <div>
                                            <div className="text-white font-semibold text-sm group-hover:text-[#CCF381] transition-colors">{tool.name}</div>
                                            <div className="text-[#555] text-[10px] uppercase tracking-wider">{tool.desc}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
