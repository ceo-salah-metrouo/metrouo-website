import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export function MapPreview({ locations = [] }) {
  const defaultCenter = [30.590, 32.265] // Ismailia City

  return (
    <div className="map-box">
      <MapContainer center={defaultCenter} zoom={13} style={{ height: 250, width: '100%' }}>
        {/* FINAL EDIT: Switched to standard OpenStreetMap tiles (NO TOKEN REQUIRED) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* We only plot generic markers — for simplicity */}
        {locations.map((loc, i) => (
          <Marker key={i} position={defaultCenter}>
            <Popup>{loc.from} → {loc.to}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
