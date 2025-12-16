import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Programs from './components/Programs';
import Masterminds from './components/Masterminds';
import Bootcamps from './components/Bootcamps';
import SkillsGrid from './components/SkillsGrid';
import Workshops from './components/Workshops';
import ToolsStack from './components/ToolsStack';
import Mentors from './components/Mentors';
import Testimonials from './components/Testimonials';
import Consulting from './components/Consulting';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-main)] overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Programs />
      <Masterminds />
      <Bootcamps />
      <SkillsGrid />
      <Workshops />
      <ToolsStack />
      <Mentors />
      <Testimonials />
      <Consulting />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
