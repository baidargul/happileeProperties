import React from 'react'
interface FormInputProps {
	label: string;
	className?:string;
	type:string;
	isDisabled:boolean;
	value:string;
	placeholder:string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	isRequired?:boolean;
  }



export default function SingleInput({className,label,onChange,type,isDisabled,value,onBlur,placeholder,isRequired}) {
  return (
	<div className={`dash-input-wrapper mb-30 `+ className}>
            <label htmlFor="">{label}</label>
            <input type={type} placeholder={placeholder} disabled={isDisabled} value={value} onBlur={onBlur} required={isRequired} onChange={onChange}/>
    </div>
  )
}
