import React from 'react'

export default function CountCard({data,title}:any) {
	const count = Number(data?.limit)-Number(data?.current)
  return (
	<button className="d-block" style={{
		border: count == 0 ? "2px solid #c00000" : "2px solid #00C000",
		padding: "10px",
		borderRadius: "5px",
	 }}>
	   <span style={{
		fontWeight:'bold',
		fontSize:'15px',
	   }}>{title}
		<span style={{
		   color:count == 0?'#c00000':'#00C000',
		   fontWeight:'bold',
		   marginLeft:'5px',
		   fontSize:'15px',
		   
		}}>
		   {count}/{data?.limit}
		   </span>
	 </span>
	 </button>
  )
}
