import React, { useEffect, useState } from 'react'
import { getRides, createRide, acceptBid } from '../lib/storage'
import RideCard from './RideCard'
import { MapPreview } from './MapPreview'
import { distanceKm } from '../lib/distanceKm'

export default function ClientDashboard({ user, onLogout }) {
  const [rides, setRides] = useState(getRides())
  const [form, setForm] = useState({ from: '', to: '', notes: '' })
  const [msg, setMsg] = useState('')

  function handleChange(e){ setForm({...form, [e.target.name]: e.target.value}) }

  // FINAL EDIT: Mapbox dependency removed. Uses fixed coordinates for demo distance.
  async function calculateFare(from, to) {
    // Simulating geocoded coordinates for distance calculation
    const fromCoords = { lat: 30.590, lon: 32.265 } // Ismailia Center
    const toCoords = { lat: 30.580, lon: 32.255 }  // Nearby location
    
    const km = distanceKm(fromCoords.lat, fromCoords.lon, toCoords.lat, toCoords.lon)
    const fare = Math.round(km * 5)
    
    return { km: km.toFixed(2), fare }
  }

  function submit(e) {
    e.preventDefault()
    calculateFare(form.from, form.to).then(result => {
      if (!result) {
        setMsg('Could not calculate fare.')
        return
      }
      const { km, fare } = result
      createRide({
        clientId: user.id,
        from: form.from,
        to: form.to,
        offer: fare,
        notes: form.notes || ''
      })
      setRides(getRides())
      setForm({ from: '', to: '', notes: '' })
      setMsg(`Ride posted. Distance ~${km} km, Fare = ${fare} EGP`)
      setTimeout(()=>setMsg(''), 4000)
    })
  }

  function onAccept(rideId,bidId){
    acceptBid({rideId,bidId})
    setRides(getRides())
  }

  return (
    <div className="app">
      <header>
        <h1>LadiesBid — Client</h1>
        <div>
          <span>{user.name} ({user.email})</span>
          <button className="btn small" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main>
        <section className="panel">
          <h3>Request a ride</h3>
          <form onSubmit={submit} className="inline-form">
            <input name="from" placeholder="From (address)" value={form.from} onChange={handleChange} required />
            <input name="to" placeholder="To (address)" value={form.to} onChange={handleChange} required />
            <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange}/>
            <button className="btn" type="submit">Post</button>
          </form>
          {msg && <div className="success">{msg}</div>}
        </section>

        <section className="panel">
          <h3>Your active rides</h3>
          <div className="list">
            {rides.filter(r=>r.clientId===user.id).map(r=>(
              <RideCard key={r.id} ride={r} onAccept={onAccept} isClient={true} />
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Map preview</h3>
          <MapPreview locations={rides.filter(r=>r.clientId===user.id).map(r=>({from:r.from,to:r.to}))} />
        </section>
      </main>
    </div>
  )
}