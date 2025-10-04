import React from 'react'

export default function ColorScale({colorScale, setColorScale}) {

    const updateColorScale = (field, value) => {
        setColorScale(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div style={{ height: '90%', marginRight:'20px', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center' }}>

            {/* Max value */}
            <input
                type="number"
                value={colorScale.maxValue}
                onChange={(e) => updateColorScale('maxValue', parseFloat(e.target.value) || 0)}
                style={{ width: '50px' }}
            />

            {/* Max color selector */}
            <input
                type="color"
                value={colorScale.maxColor}
                onChange={(e) => updateColorScale('maxColor', e.target.value)}
                style={{ width: '20px', height: '30px', border: 'none', cursor: 'pointer' }}
            />
            
            {/* Gradient bar */}
            <div
                style={{
                    width: '20px',
                    flex: 1,
                    background: `linear-gradient(to bottom, ${colorScale.maxColor}, ${colorScale.minColor})`,
                    margin: '2px 0'
                }}
            />
            
            {/* Min color selector */}
            <input
                type="color"
                value={colorScale.minColor}
                onChange={(e) => updateColorScale('minColor', e.target.value)}
                style={{ width: '20px', height: '30px', border: 'none', cursor: 'pointer' }}
            />
            
            {/* Min value */}
            <input
                type="number"
                value={colorScale.minValue}
                onChange={(e) => updateColorScale('minValue', parseFloat(e.target.value) || 0)}
                style={{ width: '50px'}}
            />

            {/* Grouping options */}
            <input
                type="checkbox"
                checked={colorScale.grouped}
                onChange={(e) => updateColorScale('grouped', e.target.checked)}
            />

            {colorScale.grouped ?
             <input
                type="number"
                value={colorScale.groups}
                onChange={(e) => updateColorScale('groups', parseInt(e.target.value) || 2)}
                style={{ width: '50px'}}
                min={1}
            />:
            <br />
            }

        </div>
    )
}
