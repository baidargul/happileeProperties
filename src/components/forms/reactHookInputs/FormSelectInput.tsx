import React from "react";
import { Controller } from "react-hook-form";
import { SingleInput } from "../inputs/SingleInput";
import NiceSelect from "@/ui/NiceSelect";
import SingleSelectInput from "../inputs/SingleSelectInput";

interface FormSelectInputProps {
  label: string;
  className?: string;
  name: string;
  control: any;
  isDisabled?: boolean;
  placeholder: string;
  isRequired?: boolean;
  options: any;
}

const FormSelectInput: React.FC<FormSelectInputProps> = ({
  label,
  className,
  control,
  name,
  isDisabled,
  placeholder,
  isRequired,
  options,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={( {
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <div className="w-full flex flex-col mb-30">
          <SingleSelectInput
            label={label}
            selectHandler={onChange}
            onBlur={onBlur}
            isDisabled={isDisabled}
            placeHolder={placeholder}
            isRequired={isRequired}
            options={options}
          />
          {error && (
            <p
              className="text-danger text-md"
              style={{
                margin: "0",
                padding: "0",
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

export default FormSelectInput;
