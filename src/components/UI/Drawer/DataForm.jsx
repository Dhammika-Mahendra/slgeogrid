import { useMap } from '../../context/MapContext'
import { useState, useEffect } from 'react'
import AlertBox from '../common/AlertBox'
import { getRandomInt, interpolateColor, interpolateGroupColor } from '../../utils/functions'
import { activeLightGrey } from '../../utils/constants'

export default function DataForm({min, max, minColor, maxColor, grouped, groups}) {
   const { regionLevel, setRegionLevel, regionData, setRegionData } = useMap()
   const [inputData, setInputData] = useState({})

   const [isVisible, setIsVisible] = useState(false)//set alert box visibility
   const [msg, setMsg] = useState("")//alert box message
   const [functionExec, setFunctionExec] = useState(null)//function to execute on alert confirmation

  //--------------------------------------------------------
  //     Map data object ops
  //--------------------------------------------------------

  // Update local input data when regionLevel or regionData changes
   useEffect(() => {
     if (regionData) {
       const initialData = {}
       regionData.forEach((region) => {
         initialData[region.name] = region.value
       })
       setInputData(initialData)
     }
   }, [regionData])

  // Handle input changes
   const handleInputChange = (name, value) => {
     setInputData(prev => ({
       ...prev,
       [name]: parseFloat(value) || 0
     }))
   }

  //--------------------------------------------------------
  //     Button Handlers
  //--------------------------------------------------------
   const handleSubmit = () => {
  setRegionData(prevRegionData =>
    prevRegionData.map(region => ({
      ...region,
      value: inputData[region.name] || 0,
      color: !grouped
        ? interpolateColor(minColor, maxColor, min, max, inputData[region.name] || 0)
        : interpolateGroupColor(minColor, maxColor, min, max, inputData[region.name] || 0, groups)
    }))
  )
}

   const handleClear = () => {
    setIsVisible(true)
    setMsg("Are you sure you want to clear all data?")
    setFunctionExec(()=>()=>
      setRegionData(prevRegionData =>
        prevRegionData.map(region => ({
          ...region,
          value: 0,
          color: "#FFFFFF"
        }))
      )
    )
   }

  const handleRandom = () => {
  setIsVisible(true)
  setMsg("Are you sure you want to fill random data?")
  setFunctionExec(() => () =>
    setRegionData(prevRegionData =>
      prevRegionData.map(region => {
        const randomValue = getRandomInt(min, max)
        return {
          ...region,
          value: randomValue,
          color: !grouped
            ? interpolateColor(minColor, maxColor, min, max, randomValue)
            : interpolateGroupColor(minColor, maxColor, min, max, randomValue, groups)
        }
      })
    )
  )
}

  return (
    <>
    <div className="w-[60%] h-full flex flex-col justify-between">

    {/*---------------------------------------------------------------- */}
    {/* Region data input fields */}

      <div
        className="grid grid-cols-3 gap-x-4 gap-y-2 rounded border border-gray-200 p-2"
        style={{ minHeight: '400px' }}
      >
        {/* 9, 9, 7 vertical columns */}
        {[0, 1, 2].map(col => (
          <div key={col} className="flex flex-col gap-y-2">
            {regionData
              .slice(col === 0 ? 0 : col === 1 ? 9 : 18, col === 0 ? 9 : col === 1 ? 18 : 25)
              .map((region, idx) => (
                <div key={region.name} className="flex flex-col">
                  <label
                    htmlFor={`region-${region.name}`}
                    className="block text-sm text-gray-600"
                  >
                    {region.name}
                  </label>
                  <input
                    id={`region-${region.name}`}
                    type="number"
                    value={inputData[region.name] || ''}
                    onChange={(e) => handleInputChange(region.name, e.target.value)}
                    className="block w-[100%] px-2 text-sm border border-gray-300 rounded focus:outline-none transition-colors"
                  />
                </div>
              ))}
          </div>
        ))}
      </div>

      { /* Region level selction dropdown*/}
        <div >
          <select
            id="region-select"
            value={regionLevel}
            onChange={(e) => setRegionLevel(e.target.value)}
            className={`block w-[100px] px-1 py-1 border border-gray-300 rounded-md focus:outline-none transition-colors`}
            style={{position:'absolute', left:'40%', top:'10px', zIndex:'1000'}}
          >
            <option value="L1">Province</option>
            <option value="L2">District</option>
            <option value="L3">Secretariat</option>
          </select>
        </div>

      {/* ---------------------------------------------------------------------------------- */}
      {/* Button Panel */}
      <div className="p-4 flex-shrink-0">
        <div className="flex gap-3 justify-center">
          <button className="btn btn-sm btn-soft px-4"
            onClick={handleClear}>
            Clear
          </button>
          <button className="btn btn-sm btn-soft px-4"
           onClick={handleRandom}
          >
            Random
          </button>
          <button 
            className="btn btn-sm btn-success px-4 text-white"
            onClick={handleSubmit}
          >
            OK
          </button>


          { /* Alert Box Component */}
          <AlertBox isVisible={isVisible} setIsVisible={setIsVisible} msg={msg} functionExec={functionExec} />
        </div>
      </div>
    </div>
    </>

  )
}
