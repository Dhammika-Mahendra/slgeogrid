import React from 'react'
import DataForm from './DataForm'
import ColorScale from './ColorScale'

export default function Drawer() {
  return (
      <div className="w-full h-screen bg-gray-50 border-l border-gray-300 shadow-lg p-4 flex overflow-hidden">
        <ColorScale></ColorScale>
        <DataForm></DataForm>
      </div>
  )
}
