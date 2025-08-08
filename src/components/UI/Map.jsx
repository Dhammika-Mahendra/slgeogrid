import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import * as topojson from 'topojson-client'
import 'leaflet/dist/leaflet.css'
import topoData from '../maps/SL-l3.json'

export default function Map() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const tileLayerRef = useRef(null)
  const [showTileLayer, setShowTileLayer] = useState(false)

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

      // Convert TopoJSON to GeoJSON
      const geoData = topojson.feature(topoData, topoData.objects.lka_admbnda_adm3_slsd_20220816)

      // Add the GeoJSON layer to the map
      L.geoJSON(geoData, {
        style: {
          fillColor: '#ffffff',
          weight: 1,
          opacity: 1,
          color: '#222222',
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
                weight: 2,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7,
              })
              layer.bringToFront()
            },
            mouseout: (e) => {
              const layer = e.target
              layer.setStyle({
                weight: 1,
                color: '#222222',
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


  // Toggle tile layer
  const toggleTileLayer = () => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return
    
    if (showTileLayer) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current)
    } else {
      tileLayerRef.current.addTo(mapInstanceRef.current)
    }
    setShowTileLayer(!showTileLayer)
  }

  return (
    <div 
      className={`relative h-screen transition-all duration-300 w-[calc(100vw-320px)]`}
    >
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Floating Toggle Button */}
      <button
        onClick={toggleTileLayer}
        className="absolute top-4 right-4 z-[1000] bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 shadow-lg font-medium text-sm transition-colors"
      >
        {showTileLayer ? 'Hide Base Map' : 'Show Base Map'}
      </button>
    </div>
  )
}
