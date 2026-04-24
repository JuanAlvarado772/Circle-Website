import { useState, useCallback } from 'react'

import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Problem  from './components/Problem'
import Solution from './components/Solution'
import Phases   from './components/Phases'
import Model    from './components/Model'
import CTA      from './components/CTA'
import Footer   from './components/Footer'

import WaitlistTransition from './waitlist/WaitlistTransition'
import WaitlistPage       from './waitlist/WaitlistPage'

export default function App() {
  const [scene, setScene] = useState('home')

  const handleWaitlistClick = useCallback((e) => {
    if (e) e.preventDefault()
    document.body.style.background = '#100E0B'
    setScene('transitioning')
  }, [])

  const handleTransitionComplete = useCallback(() => {
    setScene('waitlist')
  }, [])

  const handleBack = useCallback(() => {
    document.body.style.background = ''
    setScene('home')
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <div style={{ visibility: scene === 'home' ? 'visible' : 'hidden' }}>
        <Navbar   onWaitlistClick={handleWaitlistClick} />
        <Hero     onWaitlistClick={handleWaitlistClick} />
        <Problem />
        <Solution />
        <Phases />
        <Model />
        <CTA      onWaitlistClick={handleWaitlistClick} />
        <Footer />
      </div>

      {scene === 'transitioning' && (
        <WaitlistTransition onComplete={handleTransitionComplete} />
      )}

      {scene === 'waitlist' && (
        <WaitlistPage onBack={handleBack} />
      )}
    </>
  )
}