import React from 'react';

interface File{
	path: string
	name: string
}

interface AddOn {
	position:string;
	label:string;
}

// Define the props interface for SingleInput
interface FormInputProps {
	label: string;
	className?: string;
	type: string; // Input type like 'text', 'file', etc.
	isDisabled?: boolean;
	value?: string | File | undefined; // Use built-in File for better compatibility
	placeholder?: string; // Optional for types like 'text'
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	isRequired?: boolean;
	addOn?:AddOn
  }

export const SingleInput: React.FC<FormInputProps> = ({
	className = '', // Default value to avoid undefined
	label,
	onChange,
	type,
	isDisabled,
	value,
	onBlur,
	placeholder,
	addOn,
	isRequired = false, // Default value to false
}) => {

	const random= Math.random()
	// Render logic for custom file input
	if (type === 'file') {
		return (
			<div className={`dash-input-wrapper ` + className}>
				<label>{label}</label>
				<div className="custom-file-picker">
					{/* Hidden default file input */}
					<input
						type="file"
						onChange={onChange}
						disabled={isDisabled}
						onBlur={onBlur}
						required={isRequired}
						style={{ display: 'none' }}
						id={`filePicker${random}`}
					/>
					{/* Custom button */}
					<button
						type="button"
						className="custom-file-picker-btn"
						onClick={() => document.getElementById(`filePicker${random}`)?.click()}
						disabled={isDisabled}
					>
						Select File
					</button>
					{type === "file" && value && (value as File)?.name && (
      <p>{(value as File).name}</p>
    )}
				</div>
			</div>
		);
	}

	// Render regular input for other types
	return (
		<div className={`dash-input-wrapper ` + className}>
			<label>{label}</label>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap:'5px',
				}}>
				{addOn?.position === 'left' && <span style={{
					height:'55px',
					width:'10%',
					border:'1px solid #E5E5E5',
					display:'flex',
					alignItems:'center',
					justifyContent:'center',
					borderRadius:'5px',
					padding:'5px',
					fontSize:'14px',
					cursor:'default',
					userSelect:'none'
				}}>{addOn.label}</span>}
				<input
					type={type}
					placeholder={placeholder}
					disabled={isDisabled}
					value={typeof value === 'string' ? value : ''}
					onBlur={onBlur}
					required={isRequired}
					onChange={onChange}
				/>
				{addOn?.position === 'right' && <span style={{
					height:'55px',
					width:'10%',
					border:'1px solid #E5E5E5',
					display:'flex',
					alignItems:'center',
					justifyContent:'center',
					borderRadius:'5px',
					padding:'5px',
					fontSize:'14px',
					cursor:'default',
					userSelect:'none'
				}}>{addOn.label}</span>}
			</div>
		</div>
	);
};
