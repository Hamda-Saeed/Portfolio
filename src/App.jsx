import React from 'react'
import BackgroundWrapper from './background'
import Loader from './Loader'
import Hero from './Hero'
import NavBar from './NavBar'
import SideBar from './SideBar'
import EnhancedTechStack from './EnhancedTechStack'
import EnhancedProjects from './EnhancedProjects'
import Certificates from './Certificates'
import AboutMe from './AboutMe'

export default function App() {
  return (
    <>
      {/* Loader sits on top of everything and disappears when done */}
      <Loader />

      {/* All actual content under it */}
      <NavBar />
      <BackgroundWrapper>
        <Hero />
        <SideBar />
        <AboutMe />
        <EnhancedTechStack />
        <EnhancedProjects />
        <Certificates />
      </BackgroundWrapper>
    </>
  )
}
