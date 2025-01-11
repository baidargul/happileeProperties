import React from 'react';
import { Controller } from 'react-hook-form';
import { SingleInput } from '../inputs/SingleInput';

interface AddOn {
  position: string;
  label: string;
}
interface FormInputProps {
  label: string;
  className?: string;
  name: string;
  control: any;
  type: string;
  isDisabled?: boolean;
  placeholder: string;
  isRequired?: boolean;
  addOn?: AddOn;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  className,
  control,
  name,
  type,
  isDisabled,
  placeholder,
  isRequired,
  addOn,
}) => {
  const handleChange = (onChange: (value: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === 'number') {
      // Prevent negative numbers
      if (value === '' || !isNaN(Number(value)) && Number(value) >= 0) {
        onChange(value);
      }
    } else {
      onChange(value);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <div className="w-full flex flex-col mb-30">
          <SingleInput
            label={label}
            className={className}
            onChange={handleChange(onChange)}
            onBlur={onBlur}
            value={value}
            type={type}
            isDisabled={isDisabled}
            placeholder={placeholder}
            isRequired={isRequired}
            addOn={addOn}
          />
          {error && (
            <p
              className="text-danger text-md"
              style={{
                margin: '0',
                padding: '0',
              }}
            >
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FormInput;
