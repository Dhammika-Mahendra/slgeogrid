import { useState, useCallback, useMemo, memo } from 'react'
import geoData from '../../maps/L2.json'
import { useMap } from '../../context/MapContext'

// Create a memoized input field component to prevent unnecessary re-renders
const InputField = memo(({ admName, value, onChange, admData }) => {
  return (
    <div className="flex flex-col">
      <label 
        htmlFor={`input-${admName}`}
        className="text-sm font-medium text-gray-700 mb-1"
      >
        <div className="font-semibold">{admName}</div>
      </label>
      <input
        id={`input-${admName}`}
        type="number"
        value={value || ''}
        onChange={(e) => onChange(admName, e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
  )
})

InputField.displayName = 'InputField'

export default function DataForm() {
  // Get region level from context
  const { regionLevel, setRegionLevel } = useMap()
  
  // State to store all input values
  const [inputValues, setInputValues] = useState({})

  // Memoize the unique ADM2 data to avoid recalculating on every render
  const admData = useMemo(() => {
    const admData = geoData.features.map(feature => ({
      L2: feature.properties.L2
    }))
    
    // Remove duplicates based on L2 and sort by L2
    return admData.filter((item, index, self) =>
      index === self.findIndex(t => t.L2 === item.L2)
    ).sort((a, b) => a.L2.localeCompare(b.L2))
  }, [])

  // Handler function to update input values
  const handleInputChange = useCallback((admName, value) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [admName]: value
    }))
  }, [])

  return (
    <div className="h-full overflow-y-auto p-4">

      { /* Region level selction dropdown*/}
      <div className="mb-4">
        <label 
          htmlFor="region-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Region Level
        </label>
        <select
          id="region-select"
          value={regionLevel}
          onChange={(e) => setRegionLevel(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="L1">Province</option>
          <option value="L2">District</option>
          <option value="L3">Secretariat</option>
        </select>
      </div>

      { /* Input fields*/}
      <div className="space-y-4">
        {admData.map((item) => (
          <InputField
            key={item.L2}
            admName={item.L2}
            value={inputValues[item.L2]}
            onChange={handleInputChange}
            admData={item}
          />
        ))}
      </div>
    </div>
  )
}
