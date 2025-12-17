import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Programs from '../components/Programs';
import Masterminds from '../components/Masterminds';
import Bootcamps from '../components/Bootcamps';
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

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <SectionDivider />
            <TrustedBy />
            <SectionDivider />
            <Programs />
            <SectionDivider />
            <Masterminds />
            <SectionDivider />
            <Bootcamps />
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
            <SectionDivider />
            <CallToAction />
            <Footer />
            <StickyBottomBar />
        </>
    );
}
