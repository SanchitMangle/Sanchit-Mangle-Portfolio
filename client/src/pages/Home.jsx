import React from 'react'
import ThemeToggle from '../components/ThemeToggle'
import { HeroSection } from '../components/HeroSection'
import { AboutSection } from '../components/AboutSection'
import { SkillsSection } from '../components/SkillSection'
import { ProjectsSection } from '../components/ProjectSection'
import { TimelineSection } from '../components/TimelineSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Main Content - Add top padding for fixed navbar */}
        <main className="pt-20">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <TimelineSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Home