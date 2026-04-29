import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import Services from './components/sections/Services.jsx'
import About from './components/sections/About.jsx'
import Courses from './components/sections/Courses.jsx'
import Contact from './components/sections/Contact.jsx'
import Footer from './components/Footer.jsx'
import AdminLogin from './components/admin/AdminLogin.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('geobint_admin_token')
    if (token) setIsAdmin(true)
    
    // Check URL for admin route
    if (window.location.hash === '#/admin') {
      setShowAdmin(true)
    }
    
    const handleHashChange = () => {
      setShowAdmin(window.location.hash === '#/admin')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleLogin = () => {
    setIsAdmin(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('geobint_admin_token')
    setIsAdmin(false)
    window.location.hash = ''
  }

  // Admin panel view
  if (showAdmin) {
    if (!isAdmin) {
      return <AdminLogin onLogin={handleLogin} />
    }
    return <AdminDashboard onLogout={handleLogout} />
  }

  // Public site
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Courses />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
