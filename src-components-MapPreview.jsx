import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export function MapPreview({ locations = [] }) {
  const defaultCenter = [30.590, 32.265] // Ismailia City

  return (
    <div className="map-box">
      <MapContainer center={defaultCenter} zoom={13} style={{ height: 250, width: '100%' }}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`}
          attribution='© <a href="https://www.mapbox.com/">Mapbox</a> © <a href="https://www.openstreetmap.org/">OSM</a>'
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