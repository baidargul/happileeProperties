import React from 'react'
// Define the props interface for SingleTextArea
interface FormTextAreaProps {
	label: string;
	className?: string;
	isDisabled?: boolean;
	value: string;
	placeholder: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Change event type for textarea
	onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void; // Change event type for textarea
	isRequired?: boolean;
	rows: number;
  }
  
 export const SingleTextArea: React.FC<FormTextAreaProps> = ({
	className = '', // Default value to avoid undefined
	label,
	onChange,
	rows,
	isDisabled,
	value,
	onBlur,
	placeholder,
	isRequired = false, // Default value to false
  }) => {
	return (
	<div className={`dash-input-wrapper `+ className}>
            <label htmlFor="">{label}</label>
            <textarea rows={rows} placeholder={placeholder} disabled={isDisabled} value={value} onBlur={onBlur} required={isRequired} onChange={onChange}/>
    </div>
  )
}
