import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer '
import BackToTop from './components/BackToTop'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BrandsPage from './pages/BrandsPage'
import ServicesPage from './pages/ServicesPage'
import MoonlitCirclePage from './pages/MoonlitCirclePage'
import AboutPage from './pages/AboutPage'
import PartnerPage from './pages/PartnerPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
    <Navbar/>
    <BackToTop/>
    <Routes>
         <Route path="/" element={<HomePage/>} />
          <Route path="/brands" element={<BrandsPage/>} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path= "/loyalty-program" element={<MoonlitCirclePage/>} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact-us"  element ={<PartnerPage/>}/>
      </Routes>
 
    <Footer/>
    </BrowserRouter>

    </>
  )
}

export default App
