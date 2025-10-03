// src-App.jsx
import React, { useState, useEffect } from 'react'
import Auth from './src-components-Auth.jsx'
import ClientDashboard from './src-components-ClientDashboard.jsx'
import DriverDashboard from './src-components-DriverDashboard.jsx'
import Admin from './src-components-Admin.jsx'
import { getCurrentUser, logoutUser, loadDemoData } from './src-lib-storage.js'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Load demo admin if none exists
    loadDemoData()
    // Restore current user from localStorage
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

  return <div style={{ padding: 20 }}>Invalid role. Please log in again.</div>
}
