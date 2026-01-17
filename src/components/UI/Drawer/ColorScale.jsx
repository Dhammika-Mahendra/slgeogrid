import React from 'react'
import { groupColorScale } from '../../utils/functions'

export default function ColorScale({colorScale, setColorScale}) {

    const updateColorScale = (field, value) => {
        setColorScale(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div style={{ height: '90%', marginRight:'20px', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center', position:'relative' }}>

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
            <div className='flex flex-col items-center mt-[25px]' 
                style={{position:'absolute', top:'50%'}}
            >
                <div>
                    <label htmlFor="grouped-checkbox" 
                        style={{fontSize:'10px', marginLeft:'5px', cursor: 'pointer'}}>
                            Grouped :
                    </label>
                    <input
                        type="checkbox"
                        checked={colorScale.grouped}
                        onChange={(e) => updateColorScale('grouped', e.target.checked)}
                        className="ml-[2px] cursor-pointer"
                    />
                </div>

                {colorScale.grouped ?
                <input
                    type="number"
                    value={colorScale.groups}
                    onChange={(e) => updateColorScale('groups', parseInt(e.target.value) || 2)}
                    style={{ width: '35px'}}
                    className="block text-sm text-center border border-gray-300 rounded focus:outline-none transition-colors mt-[3px]"
                    min={1}
                />:
                <br />
                }
            </div>

        </div>
    )
}
