import React, { useState } from 'react'
import { getRides, addBid } from './src-lib-storage.js'
import RideCard from './src-components-RideCard.jsx'

export default function DriverDashboard({ user, onLogout }) {
  const [rides, setRides] = useState(getRides())
  const [msg, setMsg] = useState('')

  function placeBid(rideId, amount) {
    try {
      addBid({ rideId, driverId: user.id, amount })
      setRides(getRides())
      setMsg('Bid placed!')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>LadiesBid — Driver</h1>
        <div>
          <span>{user.name} ({user.email})</span>
          <button className="btn small" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main>
        {msg && <div className="success">{msg}</div>}
        <section className="panel">
          <h3>Open Rides</h3>
          <div className="list">
            {rides.filter(r => r.status === 'open').map(r => (
              <RideCard 
                key={r.id} 
                ride={r} 
                onBid={placeBid} 
                isClient={false} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
