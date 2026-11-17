import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandCollections from './components/BrandCollection'
import MoonlitCircleTiers from './components/MoonlitCircleTiers'
import FranchiseOffer from './components/FranchiseOffer'
import BrandLogos from './components/BrandLogos'
import DiscoverMoonlit from './components/DiscoverMoonlit'
import WhyMoonlit from './components/WhyMoonlit'
import Footer from './components/Footer '

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Hero/>
    <BrandCollections/>
    <MoonlitCircleTiers/>
    <FranchiseOffer/>
    <BrandLogos/>
    <DiscoverMoonlit/>
    <WhyMoonlit/>
    <Footer/>

    </>
  )
}

export default App
