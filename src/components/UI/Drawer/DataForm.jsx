import { useState, useCallback, useMemo, memo } from 'react'
import geoData from '../../maps/SL_L3.json'

// Create a memoized input field component to prevent unnecessary re-renders
const InputField = memo(({ admName, value, onChange, admData }) => {
  return (
    <div className="flex flex-col">
      <label 
        htmlFor={`input-${admName}`}
        className="text-sm font-medium text-gray-700 mb-1"
      >
        <div className="font-semibold">{admName}</div>
        <div className="text-xs text-gray-500 mt-1">
          {admData.ADM2_EN} • {admData.ADM1_EN}
        </div>
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
  // State to store all input values
  const [inputValues, setInputValues] = useState({})

  // Memoize the unique ADM3 data to avoid recalculating on every render
  const admData = useMemo(() => {
    const admData = geoData.features.map(feature => ({
      ADM3_EN: feature.properties.ADM3_EN,
      ADM2_EN: feature.properties.ADM2_EN,
      ADM1_EN: feature.properties.ADM1_EN
    }))
    
    // Remove duplicates based on ADM3_EN and sort by ADM3_EN
    return admData.filter((item, index, self) =>
      index === self.findIndex(t => t.ADM3_EN === item.ADM3_EN)
    ).sort((a, b) => a.ADM3_EN.localeCompare(b.ADM3_EN))
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
      <div className="space-y-4">
        {admData.map((item) => (
          <InputField
            key={item.ADM3_EN}
            admName={item.ADM3_EN}
            value={inputValues[item.ADM3_EN]}
            onChange={handleInputChange}
            admData={item}
          />
        ))}
      </div>
    </div>
  )
}
