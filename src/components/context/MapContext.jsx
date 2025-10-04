import { createContext, useContext, useState } from 'react'


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
