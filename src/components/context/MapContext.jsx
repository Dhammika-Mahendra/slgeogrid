import React, { createContext, useContext, useState, useEffect } from 'react'
import L1Data from '../maps/L1.json'
import L2Data from '../maps/L2.json'
import L3Data from '../maps/L3.json'

// Create the context
const MapContext = createContext()

// Create a custom hook to use the context
export const useMap = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMap must be used within a MapProvider')
  }
  return context
}

// Create the provider component
export const MapProvider = ({ children }) => {
  const [showTileLayer, setShowTileLayer] = useState(false)
  const [regionLevel, setRegionLevel] = useState('L2')
  const [regionData, setRegionData] = useState({})
  
  // Initialize regionData with objects from the GeoJSON files
  useEffect(() => {
    const initializedRegionData = {
      'L1': L1Data.features.map(feature => ({
        name: feature.properties.name,
        value: 0,
        color: "#FFFFFF"
      })),
      'L2': L2Data.features.map(feature => ({
        name: feature.properties.name,
        value: 0,
        color: "#FFFFFF"
      })),
      'L3': L3Data.features.map(feature => ({
        name: feature.properties.name,
        value: 0,
        color: "#FFFFFF"
      }))
    };
    
    setRegionData(initializedRegionData);
  }, []);
  
  const toggleTileLayer = () => {
    setShowTileLayer(prev => !prev)
  }

  const value = {
    showTileLayer,
    setShowTileLayer,
    toggleTileLayer,
    regionLevel,
    setRegionLevel,
    regionData,
    setRegionData
  }

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  )
}
