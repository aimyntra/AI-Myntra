import React from 'react';
import { Target, Users, Zap, Terminal, Cpu, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const ValueCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#a3ff12]/30 transition-all duration-300">
        <div className="w-12 h-12 rounded-lg bg-[#a3ff12]/10 flex items-center justify-center mb-4 text-[#a3ff12]">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
);

export default function About() {
    return (
        <>
            <Navbar />
            <main className="pt-24 min-h-screen bg-[#050505]">

                {/* Hero Section */}
                <section className="relative px-6 lg:px-12 py-20 max-w-7xl mx-auto">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a3ff12] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6 tracking-tight">
                            We Build Concepts. <br />
                            <span className="text-white">Not Just Slides.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
                            AI Mantra exists to bridge the gap between "watching AI tutorials" and <span className="text-white font-medium">deploying production-grade AI systems</span>. We are an accelerator for engineers, creators, and founders who want to build the future, not just watch it happen.
                        </p>
                    </div>
                </section>

                {/* The Methodology */}
                <section className="px-6 lg:px-12 py-20 bg-white/[0.02] border-y border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">The Methodology</h2>
                            <p className="text-gray-400 max-w-2xl">
                                Traditional education is too slow for the AI revolution. Our curriculum is updated weekly to reflect the latest state-of-the-art tools and frameworks.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <ValueCard
                                icon={Terminal}
                                title="Code-First Learning"
                                description="We don't do theory without practice. Every concept is consolidated with a hands-on build, immediately applied in a real-world scenario."
                            />
                            <ValueCard
                                icon={Cpu}
                                title="Production Grade"
                                description="Hello World is not enough. We teach you how to handle rate limits, observability, security, and deployment on scalable infrastructure."
                            />
                            <ValueCard
                                icon={Zap}
                                title="Speed to Market"
                                description="Our bootcamps and accelerators are designed to get you from zero to deployed MVP in days, not months. Speed is the ultimate leverage."
                            />
                            <ValueCard
                                icon={Users}
                                title="Community of Builders"
                                description="Join a network of elite engineers and founders. Our alumni don't just graduate; they hire each other and launch startups together."
                            />
                            <ValueCard
                                icon={Globe}
                                title="Global Standards"
                                description="We follow the engineering standards of top Silicon Valley AI labs, ensuring your skills are transferable and highly valued globally."
                            />
                            <ValueCard
                                icon={Target}
                                title="Outcome Obsessed"
                                description="We measure success by what you ship. Portfolios, deployed apps, and active users are the only metrics that matter to us."
                            />
                        </div>
                    </div>
                </section>

                {/* Philosophy / Story */}
                <section className="px-6 lg:px-12 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Built by Engineers, <br />For Engineers</h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                The AI landscape changes every 48 hours. Traditional university curriculums become obsolete before the ink dries. We needed a new kind of institution.
                            </p>
                            <p>
                                One that moves at the speed of Twitter/X research papers. One that treats prompt engineering as a science and agentic workflows as an art form.
                            </p>
                            <p>
                                At AI Myntra, we curate the noise and distill it into signal. We test every tool, verify every framework, and package the "verified stack" into intensive learning sprints.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Link to="/programs/ai-empowerment-mastery">
                                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 h-auto text-base">
                                    View Our Programs
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#a3ff12]/20 to-transparent blur-3xl opacity-20" />
                        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex gap-4">
                                    <span className="text-gray-500">1</span>
                                    <span className="text-purple-400">class</span>
                                    <span className="text-yellow-300">AI_Engineer</span>
                                    <span className="text-white">{`{`}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">2</span>
                                    <span className="text-blue-400 pl-4">constructor</span>
                                    <span className="text-white">() {`{`}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">3</span>
                                    <span className="text-white pl-8">this.mindset =</span>
                                    <span className="text-green-300">"Builder"</span>
                                    <span className="text-white">;</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">4</span>
                                    <span className="text-white pl-8">this.focus =</span>
                                    <span className="text-green-300">"Production"</span>
                                    <span className="text-white">;</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">5</span>
                                    <span className="text-white pl-4">{`}`}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">6</span>
                                    <span className="text-blue-400 pl-4">deploy</span>
                                    <span className="text-white">() {`{`}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">7</span>
                                    <span className="text-white pl-8">return</span>
                                    <span className="text-green-300">"Ship It!"</span>
                                    <span className="text-white">;</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">8</span>
                                    <span className="text-white pl-4">{`}`}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">9</span>
                                    <span className="text-white">{`}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
