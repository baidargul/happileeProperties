import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function Spinner() {
  return (
	// <div>
<TailSpin
		visible={true}
		height="80"
		width="80"
		color="#027BFF"
		ariaLabel="tail-spin-loading"
		radius="1"
		wrapperStyle={{
			width:'100vw',
			display:'flex',
			justifyContent:'center',
			alignItems:'center'
		}}
		wrapperClass=""
  />
	// </div>
  )
}
