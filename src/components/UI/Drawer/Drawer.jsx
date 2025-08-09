import React from 'react'
import DataForm from './DataForm'

export default function Drawer({ isDrawerOpen, toggleDrawer }) {
  return (
    <div>
    <div 
        className={`p-3 fixed top-0 right-0 h-full bg-white border-l border-gray-300 shadow-lg transition-transform duration-300 ease-in-out z-[1001] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '600px' }}
      >


        {/* Drawer Content */}
        <div className="p-4 h-full">
          <DataForm></DataForm>
        </div>

        
    </div>




      {/* Drawer Toggle Button */}
      <button
        onClick={toggleDrawer}
        className={`fixed top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-300 shadow-lg px-3 py-6 z-[1002] transition-all duration-300 ease-in-out ${
          isDrawerOpen ? 'right-[600px]' : 'right-0'
        } rounded-l-lg`}
      >
        <div className="flex flex-col items-center">
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isDrawerOpen ? '' : 'rotate-180'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  )
}
