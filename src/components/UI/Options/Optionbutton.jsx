import React from 'react'

export default function Optionbutton({ 
  imageSrc, 
  altText = "Button", 
  isActive = false, 
  onClick, 
  tooltip,
  className = ""
}) {
return (
    <button 
        className={`w-10 h-10 m-1 border-none cursor-pointer transition-colors rounded ${
            isActive 
                ? 'bg-grey-100 border border-grey-300' 
                : 'bg-white hover:bg-gray-50'
        } ${className}`}
        style={{ 
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: '60%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
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
