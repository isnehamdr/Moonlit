import React from 'react'
import BrandCollections from '../components/BrandCollection'
import LoyaltyOffer from '../components/LoyaltyOffer'
import MoonlitCircleTiers from '../components/MoonlitCircleTiers'
import KeyFacts from '../components/KeyFacts'
import DiscoverMoonlit from '../components/DiscoverMoonlit'
import WhyMoonlit from '../components/WhyMoonlit'
import Hero from '../components/Hero'

const HomePage = () => {
  return (
  <>
  <Hero/>
      <BrandCollections/>
    <LoyaltyOffer/>
    <MoonlitCircleTiers/>
      <KeyFacts/>
      <DiscoverMoonlit/>
      <WhyMoonlit/>
  </>
  )
}

export default HomePage