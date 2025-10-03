import { v4 as uuidv4 } from 'uuid'

const USERS_KEY = 'ladies-taxi-users'
const RIDES_KEY = 'ladies-taxi-rides'
const CURRENT_USER_KEY = 'ladies-taxi-current-user'

// helpers
function load(key) {
  return JSON.parse(localStorage.getItem(key) || '[]')
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// users
export function getUsers() {
  return load(USERS_KEY)
}

export function registerUser({ name, email, password, role }) {
  const users = getUsers()
  if (users.some(u => u.email === email)) throw new Error('Email already exists')
  const newUser = { id: uuidv4(), name, email, password, role }
  users.push(newUser)
  save(USERS_KEY, users)
  setCurrentUser(newUser)
  return newUser
}

export function loginUser({ email, password }) {
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid credentials')
  setCurrentUser(user)
  return user
}

export function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null')
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

// rides
export function getRides() {
  return load(RIDES_KEY)
}

export function createRide({ clientId, from, to, offer, notes }) {
  const rides = getRides()
  const ride = {
    id: uuidv4(),
    clientId,
    from,
    to,
    offer,
    notes,
    status: 'open',
    bids: [],
    createdAt: new Date().toISOString()
  }
  rides.push(ride)
  save(RIDES_KEY, rides)
  return ride
}

export function addBid({ rideId, driverId, amount }) {
  const rides = getRides()
  const ride = rides.find(r => r.id === rideId)
  if (!ride) throw new Error('Ride not found')
  ride.bids.push({ id: uuidv4(), driverId, amount, createdAt: new Date().toISOString() })
  save(RIDES_KEY, rides)
}

export function acceptBid({ rideId, bidId }) {
  const rides = getRides()
  const ride = rides.find(r => r.id === rideId)
  if (!ride) throw new Error('Ride not found')
  const bid = ride.bids.find(b => b.id === bidId)
  if (!bid) throw new Error('Bid not found')
  ride.status = 'accepted'
  ride.acceptedBid = bid
  save(RIDES_KEY, rides)
}

export function resetAll() {
  localStorage.removeItem(USERS_KEY)
  localStorage.removeItem(RIDES_KEY)
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function loadDemoData() {
  if (getUsers().length === 0) {
    registerUser({ name: 'Admin', email: 'admin@demo.local', password: 'admin', role: 'admin' })
  }
}