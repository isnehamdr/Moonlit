import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandCollections from './components/BrandCollection'
import MoonlitCircleTiers from './components/MoonlitCircleTiers'

import DiscoverMoonlit from './components/DiscoverMoonlit'
import WhyMoonlit from './components/WhyMoonlit'
import Footer from './components/Footer '
import BackToTop from './components/BackToTop'
import KeyFacts from './components/KeyFacts'
import LoyaltyOffer from './components/LoyaltyOffer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <BackToTop/>
    <Hero/>
    <BrandCollections/>
    
  <LoyaltyOffer/>
  <MoonlitCircleTiers/>
    <KeyFacts/>
    <DiscoverMoonlit/>
    <WhyMoonlit/>
    <Footer/>

    </>
  )
}

export default App
