import React from 'react'
import mapIcon from '../../../assets/icons/map.png'
import { useMap } from '../../context/MapContext'
import Drawerbutton from './Optionbutton'

export default function Options() {
  const { showTileLayer, toggleTileLayer } = useMap()

  return (
    <div 
    className="fixed top-0 left-0 h-screen bg-white border-r border-gray-300 shadow-lg z-[1001]"
    style={{ width: '50px' }}
    >
    {/* Content for the left floating element can be added here */}
    <Drawerbutton
      imageSrc={mapIcon}
      altText="Toggle Base Map"
      isActive={showTileLayer}
      onClick={toggleTileLayer}
      tooltip={showTileLayer ? 'Hide Base Map' : 'Show Base Map'}
      className="w-7 h-7"
    />
    </div>
  )
}
