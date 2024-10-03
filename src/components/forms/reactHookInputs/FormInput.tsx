import React from 'react';
import { Controller } from 'react-hook-form';
import SingleInput from '../inputs/SingleInput';

interface FormInputProps {
  label: string;
  className:string;
  name:string;
  control: any;
  type:string,
  isDisabled:boolean,
  placeholder:string,
  isRequired?:boolean,
}

const FormInput: React.FC<FormInputProps> = ({ label,className,control,name,type,isDisabled,placeholder,isRequired }) => {
  return (
    <Controller
		control={control}
		name={name}
		render={({field: {value, onChange, onBlur},fieldState:{error}}) => (
		<div className='w-full flex flex-col'>
		<SingleInput
			label={label}
			className={className}
			onChange={onChange}
			onBlur={onBlur}
			value={value}
			type={type}
			isDisabled={isDisabled}
			placeholder={placeholder}
			isRequired={isRequired}
		/>
		{error&&<p className='text-red-600 text-md'>{error.message}</p>}
		</div>
		)}
	/>
  );
}

export default FormInput;