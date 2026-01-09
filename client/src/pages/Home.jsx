import React, { Suspense } from 'react'
import ThemeToggle from '../components/ThemeToggle'
import { HeroSection } from '../components/HeroSection'
import { AboutSection } from '../components/AboutSection'
import { Footer } from '../components/Footer'

// Lazy Load heavy sections
const SkillsSection = React.lazy(() => import('../components/SkillSection').then(module => ({ default: module.SkillsSection })));
const ProjectsSection = React.lazy(() => import('../components/ProjectSection').then(module => ({ default: module.ProjectsSection })));
const TimelineSection = React.lazy(() => import('../components/TimelineSection').then(module => ({ default: module.TimelineSection })));
const ContactSection = React.lazy(() => import('../components/ContactSection').then(module => ({ default: module.ContactSection })));

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Main Content - Add top padding for fixed navbar */}
        <main className="pt-20">
          <HeroSection />
          <AboutSection />

          <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground">Loading...</div>}>
            <SkillsSection />
            <ProjectsSection />
            <TimelineSection />
            <ContactSection />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Home