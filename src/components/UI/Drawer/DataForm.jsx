import { useState, useCallback, useRef } from 'react'
import geoData from '../../maps/SL_L3.json'

export default function DataForm() {

  // Extract unique ADM3_EN values with their corresponding ADM2_EN and ADM1_EN
  const getUniqueADM3Data = () => {
    const admData = geoData.features.map(feature => ({
      ADM3_EN: feature.properties.ADM3_EN,
      ADM2_EN: feature.properties.ADM2_EN,
      ADM1_EN: feature.properties.ADM1_EN
    }))
    
    // Remove duplicates based on ADM3_EN and sort by ADM3_EN
    const uniqueData = admData.filter((item, index, self) =>
      index === self.findIndex(t => t.ADM3_EN === item.ADM3_EN)
    ).sort((a, b) => a.ADM3_EN.localeCompare(b.ADM3_EN))
    
    return uniqueData
  }

  const admData = getUniqueADM3Data()

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="space-y-4">
        {admData.map((item) => (
          <div key={item.ADM3_EN} className="flex flex-col">
            <label 
              htmlFor={`input-${item.ADM3_EN}`}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              <div className="font-semibold">{item.ADM3_EN}</div>
              <div className="text-xs text-gray-500 mt-1">
                {item.ADM2_EN} • {item.ADM1_EN}
              </div>
            </label>
            <input
              id={`input-${item.ADM3_EN}`}
              type="number"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
