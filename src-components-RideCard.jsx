import React, { useState } from 'react'

export default function RideCard({ ride, onAccept, onBid, isClient }) {
  const [bidAmount, setBidAmount] = useState('')

  return (
    <div className="card">
      <h4>{ride.from} → {ride.to}</h4>
      <p><b>Offer:</b> {ride.offer} EGP</p>
      {ride.notes && <p><i>{ride.notes}</i></p>}
      <p>Status: {ride.status}</p>

      {ride.status === 'open' && !isClient && (
        <div>
          <input
            type="number"
            value={bidAmount}
            onChange={e => setBidAmount(e.target.value)}
            placeholder="Your bid (EGP)"
          />
          <button
            className="btn small"
            onClick={() => {
              onBid(ride.id, parseInt(bidAmount))
              setBidAmount('')
            }}
          >
            Bid
          </button>
        </div>
      )}

      {ride.bids.length > 0 && (
        <ul className="bids">
          {ride.bids.map(b => (
            <li key={b.id}>
              {b.amount} EGP{' '}
              {isClient && ride.status === 'open' && (
                <button
                  className="btn small"
                  onClick={() => onAccept(ride.id, b.id)}
                >
                  Accept
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {ride.status === 'accepted' && ride.acceptedBid && (
        <div className="success">
          Accepted Bid: {ride.acceptedBid.amount} EGP
        </div>
      )}
    </div>
  )
}
