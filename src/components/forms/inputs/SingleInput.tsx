import React from 'react';

// Define the props interface for SingleInput
interface FormInputProps {
	label: string;
	className?: string;
	type: string;
	isDisabled?: boolean;
	value?: string; // Made optional for type=file
	placeholder?: string; // Made optional for type=file
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	isRequired?: boolean;
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
	isRequired = false, // Default value to false
}) => {
	// Render logic for custom file input
	if (type === 'file') {
		return (
			<div className={`dash-input-wrapper mb-30 ` + className}>
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
						id="filePicker"
					/>
					{/* Custom button */}
					<button
						type="button"
						className="custom-file-picker-btn"
						onClick={() => document.getElementById('filePicker')?.click()}
						disabled={isDisabled}
					>
						Select File
					</button>
					<p>{value?.name || 'No file selected'}</p>
				</div>
			</div>
		);
	}

	// Render regular input for other types
	return (
		<div className={`dash-input-wrapper mb-30 ` + className}>
			<label>{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				disabled={isDisabled}
				value={value}
				onBlur={onBlur}
				required={isRequired}
				onChange={onChange}
			/>
		</div>
	);
};
