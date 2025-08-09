import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L1Data from '../maps/L1.json'
import L2Data from '../maps/L2.json'
import L3Data from '../maps/L3.json'
import { useMap } from '../context/MapContext'

export default function Map() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const tileLayerRef = useRef(null)
  const geoJSONLayerRef = useRef(null)
  const { showTileLayer, regionLevel } = useMap()

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

      // Initialize the map with the current region level
      const currentGeoData = regionLevel === 'L1' ? L1Data : regionLevel === 'L2' ? L2Data : L3Data
      geoJSONLayerRef.current = L.geoJSON(currentGeoData, {
        style: {
          fillColor: '#ffffff',
          weight: 0.5,
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
                weight: 0.5,
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
                weight: 0.5,
                fillColor: '#ffffff',
                color: '#010101',
                fillOpacity: 0.3,
              })
            },
          })
        },
      }).addTo(mapInstanceRef.current)

      // Fit the map to the bounds of the GeoJSON data
      const bounds = L.geoJSON(currentGeoData).getBounds()
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

  // Effect to handle region level changes
  useEffect(() => {
    if (!mapInstanceRef.current || !geoJSONLayerRef.current) return

    // Get the new GeoJSON data based on the region level
    const newGeoData = regionLevel === 'L1' ? L1Data : regionLevel === 'L2' ? L2Data : L3Data

    // Update the GeoJSON layer with new data
    geoJSONLayerRef.current.clearLayers()
    geoJSONLayerRef.current.addData(newGeoData)

    // Fit the map to the new bounds
    const bounds = L.geoJSON(newGeoData).getBounds()
    mapInstanceRef.current.fitBounds(bounds)
  }, [regionLevel])

  return (
    <div className={`relative h-screen transition-all duration-300`}>
      <div ref={mapRef} className="absolute inset-0 w-full h-full"/> 
    </div>
  )
}
