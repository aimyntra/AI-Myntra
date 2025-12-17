import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import AllCourses from '../components/AllCourses';
import SkillsGrid from '../components/SkillsGrid';
import Workshops from '../components/Workshops';
import ToolsStack from '../components/ToolsStack';
import Mentors from '../components/Mentors';
import Testimonials from '../components/Testimonials';
import Consulting from '../components/Consulting';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import StickyBottomBar from '../components/layout/StickyBottomBar';
import SectionDivider from '../components/ui/SectionDivider';
import ProminentDivider from '../components/ui/ProminentDivider';

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <SectionDivider />
            <AllCourses />
            <SectionDivider />
            <SkillsGrid />
            <SectionDivider />
            <Workshops />
            <SectionDivider />
            <ToolsStack />
            <SectionDivider />
            <Mentors />
            <SectionDivider />
            <Testimonials />
            <SectionDivider />
            <Consulting />
            <ProminentDivider />
            <TrustedBy />
            <SectionDivider />
            <CallToAction />
            <Footer />
            <StickyBottomBar />
        </div>
    );
}
