import { useState, useCallback } from 'react'

// Your existing components (unchanged)
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Problem  from './components/Problem'
import Solution from './components/Solution'
import Phases   from './components/Phases'
import Model    from './components/Model'
import CTA      from './components/CTA'
import Footer   from './components/Footer'

// Waitlist flow
import WaitlistTransition from './waitlist/WaitlistTransition'
import WaitlistPage       from './waitlist/WaitlistPage'

export default function App() {
  // Three possible states:
  //  'home'          → normal homepage
  //  'transitioning' → cinematic interlude playing
  //  'waitlist'      → waitlist page visible
  const [scene, setScene] = useState('home')

  // Called when ANY "Join the Waitlist" button is clicked
  const handleWaitlistClick = useCallback((e) => {
    if (e) e.preventDefault()
    setScene('transitioning')
  }, [])

  // Called when the transition animation finishes
  const handleTransitionComplete = useCallback(() => {
    setScene('waitlist')
  }, [])

  // Called when user clicks "← Circle" on the waitlist page
  const handleBack = useCallback(() => {
    setScene('home')
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      {/* Homepage — stays mounted the whole time so Three.js doesn't reload */}
      <div style={{ visibility: scene === 'waitlist' ? 'hidden' : 'visible' }}>
        <Navbar   onWaitlistClick={handleWaitlistClick} />
        <Hero     onWaitlistClick={handleWaitlistClick} />
        <Problem />
        <Solution />
        <Phases />
        <Model />
        <CTA      onWaitlistClick={handleWaitlistClick} />
        <Footer />
      </div>

      {/* Cinematic overlay — only mounts while transitioning */}
      {scene === 'transitioning' && (
        <WaitlistTransition onComplete={handleTransitionComplete} />
      )}

      {/* Waitlist page — only mounts when transition is done */}
      {scene === 'waitlist' && (
        <WaitlistPage onBack={handleBack} />
      )}
    </>
  )
}
