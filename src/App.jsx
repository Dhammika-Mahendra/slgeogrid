import { useState } from 'react'
import './index.css'
import Map from './components/UI/map'
import Drawer from './components/UI/Drawer/Drawer'
import { MapProvider } from './components/context/MapContext'
import Options from './components/UI/Options/Options'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <MapProvider>
      <div className="relative">

        {/* Main Content */}
        <div className="w-full">
          <Map/>
        </div>

        {/* Left Side Floating Element */}
        <Options />

        {/* Drawer */}
        <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      </div>
    </MapProvider>
  )
}

export default App
