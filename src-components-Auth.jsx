import React, { useState } from 'react'
import { registerUser, loginUser } from '../lib/storage'

export default function Auth({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', role: 'client' 
  })

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (isRegistering) {
        const user = registerUser(form)
        onLogin(user)
      } else {
        const user = loginUser(form)
        onLogin(user)
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="auth-container">
      <h1>LadiesBid Taxi</h1>
      <form onSubmit={handleSubmit}>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {isRegistering && (
          <input name="name" placeholder="Name" required onChange={e => setForm({...form, name: e.target.value})} />
        )}
        <input name="email" type="email" placeholder="Email" required onChange={e => setForm({...form, email: e.target.value})} />
        <input name="password" type="password" placeholder="Password" required onChange={e => setForm({...form, password: e.target.value})} />
        {isRegistering && (
          <select name="role" onChange={e => setForm({...form, role: e.target.value})} value={form.role}>
            <option value="client">Client</option>
            <option value="driver">Driver</option>
          </select>
        )}
        
        {error && <div className="error">{error}</div>}

        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Go to Login' : 'Go to Register'}
        </button>
      </form>
    </div>
  )
}
