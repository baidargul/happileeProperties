import React from 'react'

interface Props {
  setItem: () => void,
  item: string,
  name: string,
  id: string,
  className?: string,
  style?: React.CSSProperties
}
export default function SelectionCard ( {setItem,item,name,id,className,style} : (Props) ) {
  return (
	<div 
        className={`border border-2 col d-flex align-items-center justify-content-center ${
          item === id ? "bg-primary text-white" : ""
        } rounded-2 text-center p-2`}
        style={{ cursor: "pointer"}}
        onClick={setItem}
      >
        <p className={`mb-0 fs-6 fw-normal ${className}`}>{name}</p>
    </div>
  )
}
