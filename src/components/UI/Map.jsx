import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import geoData from '../maps/SL_L3.json'
import { useMap } from '../context/MapContext'

export default function Map() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const tileLayerRef = useRef(null)
  const { showTileLayer} = useMap()

  useEffect(() => {
    // Initialize the map only once
    if (!mapInstanceRef.current) {
      // Create the map instance
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [7.8731, 80.7718], // Center of Sri Lanka
        zoom: 7,
        zoomControl: false, // Remove zoom control buttons
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        scrollWheelZoom: true,
        boxZoom: true,
        keyboard: true,
        attributionControl: false, // Remove the attribution control
      })

      // Set white background for the map
      mapInstanceRef.current.getContainer().style.backgroundColor = '#ffffff'

      // Create OpenStreetMap tile layer but don't add it initially
      tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      })

      // Add the GeoJSON layer to the map
      L.geoJSON(geoData, {
        style: {
          fillColor: '#ffffff',
          weight: 1,
          opacity: 1,
          color: '#010101',
          fillOpacity: 0.3,
        },
        onEachFeature: (feature, layer) => {
          // Add popup if properties exist
          if (feature.properties) {
            const popupContent = Object.entries(feature.properties)
              .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
              .join('<br>')
            layer.bindPopup(popupContent)
          }
          
          // Add hover effects
          layer.on({
            mouseover: (e) => {
              const layer = e.target
              layer.setStyle({
                weight: 1,
                color: '#010101',
                fillColor: '#ffffff',
                dashArray: '',
                fillOpacity: 0.3,
              })
              layer.bringToFront()
            },
            mouseout: (e) => {
              const layer = e.target
              layer.setStyle({
                weight: 1,
                fillColor: '#ffffff',
                color: '#010101',
                fillOpacity: 0.3,
              })
            },
          })
        },
      }).addTo(mapInstanceRef.current)

      // Fit the map to the bounds of the GeoJSON data
      const bounds = L.geoJSON(geoData).getBounds()
      mapInstanceRef.current.fitBounds(bounds)
    }
  }, [])

  // Effect to handle tile layer toggling
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return
    
    if (showTileLayer) {
      tileLayerRef.current.addTo(mapInstanceRef.current)
    } else {
      mapInstanceRef.current.removeLayer(tileLayerRef.current)
    }
  }, [showTileLayer])


  return (
    <div 
      className={`relative h-screen transition-all duration-300`}
    >
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 w-full h-full"
      />
      
    </div>
  )
}
