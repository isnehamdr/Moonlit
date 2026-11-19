import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer '
import BackToTop from './components/BackToTop'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BrandsPage from './pages/BrandsPage'

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
      </Routes>
 
    <Footer/>
    </BrowserRouter>

    </>
  )
}

export default App
