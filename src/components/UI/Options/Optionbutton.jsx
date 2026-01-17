import React from 'react'
import { activeLightGrey, lightGrey } from '../../utils/constants'

export default function Optionbutton({ 
  icon, 
  altText = "Button", 
  isActive,
  onClick, 
  tooltip
}) {
return (
    <>
        <button className="btn btn-square"
            onClick={onClick}
            title={tooltip}
            style={{
                backgroundColor: isActive ? activeLightGrey : lightGrey,
                margin:'2px'
            }}
        >
            {icon}
        <span className="sr-only">{altText}</span>
        </button> 
    </>
)
}
