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
  const { showTileLayer, regionLevel, regionData } = useMap()

  useEffect(() => {
    // Only initialize the map when regionData is loaded and not empty
    if (!mapInstanceRef.current && regionData && Object.keys(regionData).length > 0) {
      // Create the map instance
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [7.8731, 80.7718], // Center of Sri Lanka
        zoom: 10,
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
      const currentRegionData = regionData[regionLevel] || []
      
      geoJSONLayerRef.current = L.geoJSON(currentGeoData, {
        style: (feature) => {
          const featureName = feature.properties[regionLevel]
          const regionEntry = currentRegionData.find(item => item.name === featureName)
          const fillColor = regionEntry ? regionEntry.color : '#ffffff'
          
          return {
            fillColor: fillColor,
            weight: 0.5,
            opacity: 1,
            color: '#010101',
            fillOpacity: 0.7,
          }
        }
      }).addTo(mapInstanceRef.current)

      // Fit the map to the bounds of the GeoJSON data
      const bounds = L.geoJSON(currentGeoData).getBounds()
      mapInstanceRef.current.fitBounds(bounds)
    }
  }, [regionData])

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
    const currentRegionData = regionData[regionLevel] || []

    // Update the GeoJSON layer with new data
    geoJSONLayerRef.current.clearLayers()
    geoJSONLayerRef.current.addData(newGeoData)
    
    // Apply styling to the new data
    geoJSONLayerRef.current.eachLayer((layer) => {
      const feature = layer.feature
      const featureName = feature.properties[regionLevel]
      const regionEntry = currentRegionData.find(item => item.name === featureName)
      const fillColor = regionEntry ? regionEntry.color : '#ffffff'
      
      layer.setStyle({
        fillColor: fillColor,
        weight: 0.5,
        opacity: 1,
        color: '#010101',
        fillOpacity: 0.7,
      })
    })

    // Fit the map to the new bounds
    const bounds = L.geoJSON(newGeoData).getBounds()
    mapInstanceRef.current.fitBounds(bounds)
  }, [regionLevel, regionData])

  // Show loading indicator if regionData is not yet loaded
  if (!regionData || Object.keys(regionData).length === 0) {
    return (
      <div className="relative h-screen flex items-center justify-center">
        <p>Loading map data...</p>
      </div>
    )
  }

  return (
    <div className={`relative h-screen transition-all duration-300`}>
      <div ref={mapRef} className="absolute inset-0 w-full h-full"/> 
    </div>
  )
}
