import React from 'react'
import DataForm from './DataForm'
import ColorScale from './ColorScale'
import Chart from './Chart'
import { lightGrey } from '../../utils/constants'

export default function Drawer() {

  const [colorScale, setColorScale] = React.useState(
      {
          minValue: 0,
          maxValue: 100,
          minColor: '#0000ff',
          maxColor: '#ff0000',
          grouped: false,
          groups: 2
      }
  )

  return (
      <div className="w-full h-screen border-l border-gray-300 shadow-lg p-4 flex justify-between"
        style={{backgroundColor:lightGrey}}
      >
        <DataForm min={colorScale.minValue} max={colorScale.maxValue} minColor={colorScale.minColor} maxColor={colorScale.maxColor} grouped={colorScale.grouped} groups={colorScale.groups} />
        
        <div className="flex flex-row align-center items-center" style={{position:'relative', top:'-30px'}} >
          <ColorScale colorScale={colorScale} setColorScale={setColorScale}/>
          <Chart />
        </div>
      
      </div>
  )
}
