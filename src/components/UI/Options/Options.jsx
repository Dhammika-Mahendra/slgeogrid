import React from 'react'
import { useMap } from '../../context/MapContext'
import { lightGrey } from '../../utils/constants'
import Optionbutton from './Optionbutton'

export default function Options() {
  const { showTileLayer, toggleTileLayer, showLables, toggleLables } = useMap()

  return (
    <div 
    className="h-screen border-r border-gray-300 shadow-lg "
    style={{ width: '50px', backgroundColor: lightGrey, hover: lightGrey }}
    >
    {/* Content for the left floating element can be added here */}
        <Optionbutton
          icon={<svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.005 11.19V12l6.998 4.042L19 12v-.81M5 16.15v.81L11.997 21l6.998-4.042v-.81M12.003 3 5.005 7.042l6.998 4.042L19 7.042 12.003 3Z"/>
                </svg>}
          altText="Toggle Base Map"
          isActive={showTileLayer}
          onClick={toggleTileLayer}
          tooltip={showTileLayer ? 'Hide Base Map' : 'Show Base Map'}
        />

        <Optionbutton
          icon={<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.2 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11.2a1 1 0 0 0 .747-.334l4.46-5a1 1 0 0 0 0-1.332l-4.46-5A1 1 0 0 0 15.2 6Z"/>
              </svg>}
          altText="Toggle Labels"
          isActive={showLables}
          onClick={toggleLables}
          tooltip={showLables ? 'Hide Labels' : 'Show Labels'}
        />
        
        <Optionbutton
          icon={<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
              </svg>}
          altText="Toggle Base Map"
          isActive={showTileLayer}
          onClick={toggleTileLayer}
          tooltip={showTileLayer ? 'Download map' : 'Download map'}
        />

        

    </div>
  )
}
