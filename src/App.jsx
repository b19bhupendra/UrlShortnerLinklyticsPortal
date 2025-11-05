import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { ContextProvider } from './contextApi/ContextApi' // <-- Import ContextProvider
import ContactPage from './components/ContactPage'


function App() {
  return (
    <ContextProvider>
      <Router>
        <NavBar />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage/>} />
          </Routes>
        <Footer />
      </Router>
    </ContextProvider>
  )
}

export default App
/**
 * <BrowserRouter>   
 * It’s a wrapper component from react-router-dom.
 * It enables your React app to use routes (URLs) like /, /login, /dashboard.
 * Without it, your app is just one page; with it, you can build a multi-page experience.     
 * </BrowserRouter>
 * 
 * <BrowserRouter>: Provides routing context for your app.
 * <Routes>: Container for all routes.
 * <Route>: Defines a URL path and what component to show.
 * <Link>: Like <a>, but doesn’t reload page
 * 
 * </NavBar> : Renders the navigation bar at the top of the app.
 * <Footer> : Renders the footer at the bottom of the app.
 */