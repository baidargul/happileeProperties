import React from 'react'

export default function SelectionCard({setItem,item,name,id,className}) {
  return (
	<div 
        className={`border border-2 ${
          item === id ? "bg-primary text-white" : ""
        } rounded-2 text-center p-2`}
        style={{ cursor: "pointer",width:"10rem" }}
        onClick={setItem}
      >
        <p className={`mb-0 fs-6 fw-normal ${className}`}>{name}</p>
    </div>
  )
}
