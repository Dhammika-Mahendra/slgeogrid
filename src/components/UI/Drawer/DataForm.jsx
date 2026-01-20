import { useMap } from '../../context/MapContext'
import { useState, useEffect } from 'react'
import AlertBox from '../common/AlertBox'
import { getRandomInt, interpolateColor, interpolateGroupColor } from '../../utils/functions'
import { activeLightGrey } from '../../utils/constants'

export default function DataForm({min, max, minColor, maxColor, grouped, groups,setColorScale}) {
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

  const updateColorScale = (field, value) => {
      setColorScale(prev => ({
          ...prev,
          [field]: value
      }))
  }

  return (
    <>
    <div className="w-[60%] h-full flex flex-col justify-between">

    {/*------------------------------------------------------------------*/}
    {/* Region data input fields */}
    {
      regionLevel == 'L1'|| regionLevel == 'L2'?
    <div
      className="grid grid-cols-3 gap-x-4 gap-y-2 rounded border border-gray-200 p-2 flex-grow"
    >
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
      :
    <div
      className="rounded border border-gray-200 p-2 flex-grow overflow-y-scroll"
    >
      {(
        (() => {
          // Group regions by district
          const groupedByDistrict = regionData.reduce((acc, region) => {
            const district = region.district || 'Unknown District';
            if (!acc[district]) acc[district] = [];
            acc[district].push(region);
            return acc;
          }, {});
          return Object.entries(groupedByDistrict).map(([district, regions]) => (
            <div key={district} className="mb-4">
              <div className="text-xs text-base text-gray-500 border-t border-gray-300 mb-2 pt-1">{district}</div>
              <div className="grid grid-cols-2 gap-2">
                {regions.map(region => (
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
            </div>
          ));
        })()
      )}
    </div>
    }

    { /* Region level selction dropdown----------------------------------*/}
    <div className="dropdown" style={{position:'absolute', right:'55%', top:'10px', zIndex:'1000'}}>
      <div tabIndex={0} role="button" className="select select-bordered flex items-center justify-between w-40 bg-white" data-theme="light">
        {regionLevel === 'L1' ? 'Province' : regionLevel === 'L2' ? 'District' : 'Secretariat'}
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow" data-theme="light">
        <li onClick={() => {setRegionLevel('L1'); document.activeElement.blur()}}><a>Province</a></li>
        <li onClick={() => {setRegionLevel('L2'); document.activeElement.blur()}}><a>District</a></li>
        <li onClick={() => {setRegionLevel('L3'); document.activeElement.blur()}}><a>Secretariat</a></li>
      </ul>
    </div>

    {/* --------------------------------------------------------------------*/}
    {/* Button Panel */}
    <div className="p-4 flex-shrink-0"
      style={{position:'fixed', bottom:'10px', right:'10px'}}
      >

      <div className="flex gap-3 justify-center">
        <button className="btn btn-sm btn-soft px-1 ml-[20px] w-[60px]" onClick={handleRandom}>
          Import
        </button>
        <button className="btn btn-sm btn-soft px-1 ml-[20px] w-[60px]" onClick={handleRandom}>
          Random
        </button>
        <button className="btn btn-sm btn-soft px-1 ml-[20px] w-[60px]" onClick={handleClear}>
          Clear
        </button>

        <div className='flex items-center ml-[200px] mr-[40px]'>
          <button className="btn btn-sm btn-soft px-1 w-[60px]" 
          onClick={() => updateColorScale('grouped', !grouped)}>
            {grouped ? 'Ungroup' : 'Group'}
          </button>
          <input
              type="number"
              value={groups}
              onChange={(e) => updateColorScale('groups', parseInt(e.target.value) || 2)}
              style={{ width: '35px', visibility: grouped ? 'visible' : 'hidden' }}
              className="block text-sm text-center border border-gray-300 rounded focus:outline-none transition-colors ml-[5px]"
              min={1}
          />
        </div>

        <button className="btn btn-sm btn-neutral px-1 ml-[20px] w-[80px]" onClick={handleSubmit}>
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
