import React from 'react'
import DataForm from './DataForm'
import ColorScale from './ColorScale'
import Chart from './Chart'

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
      <div className="w-full h-screen bg-gray-50 border-l border-gray-300 shadow-lg p-4 flex overflow-hidden">
        <ColorScale colorScale={colorScale} setColorScale={setColorScale} />
        <Chart />
        <DataForm min={colorScale.minValue} max={colorScale.maxValue} minColor={colorScale.minColor} maxColor={colorScale.maxColor} grouped={colorScale.grouped} groups={colorScale.groups} />
      </div>
  )
}
