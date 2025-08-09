import React from 'react'

export default function ColorScale() {
    const [colorScale, setColorScale] = React.useState(
        {
            minValue: 0,
            maxValue: 100,
            minColor: '#0000ff',
            maxColor: '#ff0000'
        }
    )

    const updateColorScale = (field, value) => {
        setColorScale(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div style={{ height: '90%', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center' }}>

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
        </div>
    )
}
