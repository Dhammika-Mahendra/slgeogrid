import React from 'react'
import { groupColorScale } from '../../utils/functions'
import Optionbutton from '../Options/Optionbutton'

export default function ColorScale({colorScale, setColorScale}) {

    const updateColorScale = (field, value) => {
        setColorScale(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div style={{ height: '95%', marginRight:'20px', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center', position:'relative' }}>

            {/* Max value */}
            <input
                type="number"
                value={colorScale.maxValue}
                onChange={(e) => updateColorScale('maxValue', parseFloat(e.target.value) || 0)}
                style={{ width: '50px' }}
                className="block text-sm text-center border rounded focus:outline-none transition-colors"
            />

            {/* Max color selector */}
            <input
                type="color"
                value={colorScale.maxColor}
                onChange={(e) => updateColorScale('maxColor', e.target.value)}
                className="p-0 w-0 h-0 rounded-full mt-[5px] mb-[2px]"  
                style={{border:`10px solid ${colorScale.maxColor}`}}
            />
                        
            {/* Gradient bar */}
            <div
                style={{
                    width: '20px',
                    flex: 1,
                    background: colorScale.grouped
                        ? groupColorScale(colorScale.minColor, colorScale.maxColor, colorScale.groups)
                        : `linear-gradient(to bottom, ${colorScale.maxColor}, ${colorScale.minColor})`,
                    margin: '2px 0',
                    borderRadius: '15px',
                }}
            />
                        
            {/* Min color selector */}
            <input
                type="color"
                value={colorScale.minColor}
                onChange={(e) => updateColorScale('minColor', e.target.value)}
                className="p-0 w-0 h-0 rounded-full mb-[5px] mt-[2px]"  
                style={{border:`10px solid ${colorScale.minColor}`}}
            />
            
            {/* Min value */}
            <input
                type="number"
                value={colorScale.minValue}
                onChange={(e) => updateColorScale('minValue', parseFloat(e.target.value) || 0)}
                style={{ width: '50px'}}
                className="block text-sm text-center border border-gray-300 rounded focus:outline-none transition-colors"
            />

            {/* Grouping options */}


        </div>
    )
}
