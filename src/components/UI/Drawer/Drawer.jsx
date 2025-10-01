import React from 'react'
import DataForm from './DataForm'
import ColorScale from './ColorScale'

export default function Drawer() {
  return (
    <div className="w-full">
    <div 
      className='w-full h-full bg-white border-l border-gray-300 shadow-lg flex flex-col'  
    >

        {/* Drawer Content */}
        <div className="p-4 flex-1 flex overflow-hidden">
          <ColorScale></ColorScale>
          <DataForm></DataForm>
        </div>

    </div>

    </div>
  )
}
