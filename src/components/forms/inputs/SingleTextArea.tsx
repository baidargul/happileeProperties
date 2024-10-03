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
	rows:number,
  }



export default function SingleTextArea({className,label,onChange,rows,isDisabled,value,onBlur,placeholder,isRequired}) {
  return (
	<div className={`dash-input-wrapper mb-30 `+ className}>
            <label htmlFor="">{label}</label>
            <textarea rows={rows} placeholder={placeholder} disabled={isDisabled} value={value} onBlur={onBlur} required={isRequired} onChange={onChange}/>
    </div>
  )
}
