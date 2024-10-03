import React, { useEffect, useState } from 'react'
import Viewer from 'react-viewer';

export default function ImagePreviewBox({imageData,setSelectedArray,setRemovedArray}) {
	const [ visible, setVisible ] = useState(false);


	const handleDelete=(imageData)=>{
		setSelectedArray(prev=>{
			return prev.filter(element => element !== imageData)
		})
		if(imageData?.url){
			setRemovedArray(prev=>[...prev,imageData?._id])
		}
	}

  return (
	<>
	  <div className={`w-24 h-24 flex bg-cover`} style={{
          backgroundImage: `url(${imageData?.url?`${import.meta.env.VITE_BASE_URL+imageData?.url}`:URL.createObjectURL(imageData)})`,
        }}>
							<div className='w-full h-full bg-[#1a1a1a9c] opacity-0 hover:opacity-100 flex justify-center items-center gap-4 transition-all ease-in-out duration-200'>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={()=>setVisible(true)} className='w-4 h-4 cursor-pointer transition-all ease-in-out duration-200'>
									<path className=' fill-white' d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM432 256.062C432 335.516 367.531 400 288.062 400H288C208.5 400 144 335.484 144 256S208.5 112 288 112S432 176.516 432 256V256.062ZM288 160H287.781C285.48 160.029 282.426 160.441 279.539 160.764C284.77 170.037 288 180.594 288 192C288 227.346 259.346 256 224 256C212.551 256 201.959 252.748 192.66 247.482C192.363 250.479 192 253.625 192 256C192 308.996 235.004 352 288 352S384 308.996 384 256S340.996 160 288 160Z"/>
								</svg>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={()=>handleDelete(imageData)} className='w-4 h-4 cursor-pointer transition-all ease-in-out duration-200'>
									<path className=' fill-white' d="M53.188 467C54.75 491.844 76.219 512 101.094 512H346.906C371.781 512 393.25 491.844 394.812 467L416 128H32L53.188 467ZM432 32H320L308.422 8.844C305.713 3.424 300.172 0 294.111 0H153.889C147.828 0 142.289 3.424 139.578 8.844L128 32H16C7.164 32 0 39.162 0 48V80C0 88.836 7.164 96 16 96H432C440.838 96 448 88.836 448 80V48C448 39.162 440.838 32 432 32Z"/>
								</svg>
							</div>
		</div>
		<Viewer
			visible={visible}
			onClose={() => { setVisible(false); } }
			images={[{src:imageData?.url?`${import.meta.env.VITE_BASE_URL+imageData?.url}`:URL.createObjectURL(imageData), alt: ''}]}
			noFooter={true}
			noToolbar={true}
			downloadable={true}
			drag={false}
		/>
	</>
  )
}
