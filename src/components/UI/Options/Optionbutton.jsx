import React from 'react'
import { activeLightGrey, lightGrey } from '../../utils/constants'

export default function Optionbutton({ 
  imageSrc, 
  altText = "Button", 
  isActive,
  onClick, 
  tooltip
}) {
return (
    <button 
        className={`w-9 h-9 m-1 border-none cursor-pointer rounded`}
        style={{ 
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: '60%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: isActive ? activeLightGrey : lightGrey,
        }} 
        onClick={onClick}
        title={tooltip}
        aria-label={altText}
    >
        {/* Optional: Add screen reader text */}
        <span className="sr-only">{altText}</span>
    </button>
)
}
