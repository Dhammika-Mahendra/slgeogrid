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
                style={{position:'absolute', top:'40%', transform:'translateX(-40px)'}}
            >
                <Optionbutton 
                    tooltip={colorScale.grouped ? 'Continuous Scale' : 'Grouped Scale'}
                    icon={<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" clip-rule="evenodd"/>
                        </svg>
                        }
                    isActive={colorScale.grouped}
                    onClick={() => updateColorScale('grouped', !colorScale.grouped)}
                >

                </Optionbutton>

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
