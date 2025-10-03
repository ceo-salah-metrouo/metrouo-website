import React, { useState } from 'react'
import { resetAll, getUsers, getRides } from '../lib/storage'

export default function Admin({ onLogout }) {
  const [users, setUsers] = useState(getUsers())
  const [rides, setRides] = useState(getRides())

  function reset() {
    resetAll()
    setUsers([])
    setRides([])
  }

  return (
    <div className="app">
      <header>
        <h1>Admin Panel</h1>
        <button className="btn small" onClick={onLogout}>Logout</button>
      </header>
      <main>
        <section className="panel">
          <button className="btn danger" onClick={reset}>Reset All Data</button>
        </section>
        <section className="panel">
          <h3>Users</h3>
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </section>
        <section className="panel">
          <h3>Rides</h3>
          <pre>{JSON.stringify(rides, null, 2)}</pre>
        </section>
      </main>
    </div>
  )
}