import { useMap } from '../../context/MapContext'
import { useState, useEffect } from 'react'
import ConfirmBox from '../common/ConfirmBox'

export default function DataForm() {
   const { regionLevel, setRegionLevel, regionData, setRegionData } = useMap()
   const [inputData, setInputData] = useState({})

   // Update local input data when regionLevel or regionData changes
   useEffect(() => {
     if (regionData[regionLevel]) {
       const initialData = {}
       regionData[regionLevel].forEach((region) => {
         initialData[region.name] = region.value
       })
       setInputData(initialData)
     }
   }, [regionLevel, regionData])

   // Handle input changes
   const handleInputChange = (name, value) => {
     setInputData(prev => ({
       ...prev,
       [name]: parseFloat(value) || 0
     }))
   }

   // Handle OK button press - update regionData with inputData values
   const handleSubmit = () => {
     setRegionData(prevRegionData => ({
       ...prevRegionData,
       [regionLevel]: prevRegionData[regionLevel].map(region => ({
         ...region,
         value: inputData[region.name] || 0
       }))
     }))
   }

  return (
    <div>

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


      {/* Region data input fields */}
      <div className="mb-4">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {regionData[regionLevel]?.map((region, index) => (
            <div key={region.name} className="flex flex-col">
              <label 
                htmlFor={`region-${region.name}`}
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                {region.name}
              </label>
              <input
                id={`region-${region.name}`}
                type="number"
                value={inputData[region.name] || ''}
                onChange={(e) => handleInputChange(region.name, e.target.value)}
                placeholder="Enter value"
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Button Panel */}
      <div className="p-4 flex-shrink-0">
        <div className="flex gap-3 justify-end">
          <button className="btn btn-sm btn-soft px-4">
            Clear
          </button>
          <button className="btn btn-sm btn-soft px-4">
            Random
          </button>
          <button 
            className="btn btn-sm btn-success px-4"
            onClick={handleSubmit}
          >
            OK
          </button>
        </div>
      </div>



    </div>
  )
}
