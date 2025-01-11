import React from 'react';
import { Controller } from 'react-hook-form';
import { SingleTextArea } from '../inputs/SingleTextArea';

interface FormInputProps {
  label: string;
  className?:string;
  name:string;
  control: any;
  type:string,
  isDisabled?:boolean,
  placeholder:string,
  isRequired?:boolean,
  rows:number,
}

const FormTextArea: React.FC<FormInputProps> = ({ label,className,control,name,type,isDisabled,placeholder,isRequired,rows }) => {
  return (
    <Controller
		control={control}
		name={name}
		render={({field: {value, onChange, onBlur},fieldState:{error}}) => (
		<div className='w-full flex flex-col mb-30'>
		<SingleTextArea
			label={label}
			className={className}
			onChange={onChange}
			onBlur={onBlur}
			value={value}
			isDisabled={isDisabled}
			placeholder={placeholder}
			isRequired={isRequired}
			rows={rows}
		/>
		{error&&<p className='text-danger text-md' style={{
				margin: '0',
				padding: '0',	
		}}>{error.message}</p>}
		</div>
		)}
	/>
  );
}

export default FormTextArea;