import { useState } from 'react'
import './index.css'
import Map from './components/UI/map'
import Drawer from './components/UI/Drawer/Drawer'
import { MapProvider } from './components/context/MapContext'
import Options from './components/UI/Options/Options'

function App() {

  return (
    <MapProvider>
      <div className="relative flex">

        {/* Left Side Floating Element */}
        <Options />

        {/* Main Content */}
        <div className="w-[90%] h-screen">
          <Map/>
        </div>
        
        {/* Drawer */}
        <Drawer className="flex-1 h-screen"/>

      </div>
    </MapProvider>
  )
}

export default App
