import React from 'react'
import mapIcon from '../../../assets/icons/map.png'
import { useMap } from '../../context/MapContext'
import { lightGrey } from '../../utils/constants'
import Optionbutton from './Optionbutton'

export default function Options() {
  const { showTileLayer, toggleTileLayer } = useMap()

  return (
    <div 
    className="h-screen border-r border-gray-300 shadow-lg "
    style={{ width: '50px', backgroundColor: lightGrey, hover: lightGrey }}
    >
    {/* Content for the left floating element can be added here */}
    <Optionbutton
      imageSrc={mapIcon}
      altText="Toggle Base Map"
      isActive={showTileLayer}
      onClick={toggleTileLayer}
      tooltip={showTileLayer ? 'Hide Base Map' : 'Show Base Map'}
    />

    </div>
  )
}
