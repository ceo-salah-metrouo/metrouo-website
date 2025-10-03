import React, { useState, useEffect } from 'react'
import Auth from './components/Auth.jsx'
import ClientDashboard from './components/ClientDashboard.jsx'
import DriverDashboard from './components/DriverDashboard.jsx'
import Admin from './components/Admin.jsx'
import { getCurrentUser, logoutUser, loadDemoData } from './lib/storage.js'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Load demo admin user if none exists
    loadDemoData()
    // Restore logged in user
    setUser(getCurrentUser())
  }, [])

  function handleLogout() {
    logoutUser()
    setUser(null)
  }

  if (!user) {
    return <Auth onLogin={setUser} />
  }

  if (user.role === 'client') {
    return <ClientDashboard user={user} onLogout={handleLogout} />
  }

  if (user.role === 'driver') {
    return <DriverDashboard user={user} onLogout={handleLogout} />
  }

  if (user.role === 'admin') {
    return <Admin onLogout={handleLogout} />
  }

  return <div>Invalid role. Please log in again.</div>
}