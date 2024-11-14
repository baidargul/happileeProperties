import NiceSelect from "@/ui/NiceSelect";
import React from "react";

export default function SingleSelectInput({
  selectHandler,
  options,
  label,
  onBlur,
  isDisabled,
  isRequired,
  placeHolder
}) {
  return (
    <div className="dash-input-wrapper mb-30">
      <label htmlFor="">{label}</label>
      <NiceSelect
        className="nice-select"
        options={options}
        defaultCurrent={0}
        onChange={selectHandler}
        name=""
        placeholder={placeHolder}
        onBlur={onBlur}
        isDisabled={isDisabled}
        isRequired={isRequired}
      />
    </div>
  );
}
