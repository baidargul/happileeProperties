"use client";
import React, { useState, useCallback, useRef, FC, ChangeEvent } from "react";
import { useClickAway } from "react-use";

interface Option {
  id: string;
  name: string;
}

type NiceSelectProps = {
  options: Option[];
  defaultCurrent: number[];
  placeholder?: string;
  className?: string;
  onChange: (selected: Option[] | Option) => void;
  name: string;
  onBlur?: () => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  multiSelect?: boolean;
};

const SelectComponent: FC<NiceSelectProps> = ({
  options,
  defaultCurrent,
  placeholder,
  className,
  onChange,
  name,
  onBlur,
  multiSelect = false,
}) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Option[]>(
    defaultCurrent.map((index) => options[index])
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  
  const ref = useRef<HTMLDivElement | null>(null);
  useClickAway(ref, onClose);

  const currentHandler = (item: Option) => {
    if (multiSelect) {
      const isSelected = current.some((option) => option.id === item.id);
      const updatedCurrent = isSelected
        ? current.filter((option) => option.id !== item.id)
        : [...current, item];
      
      setCurrent(updatedCurrent);
  
      // Pass the entire objects to onChange
      onChange(updatedCurrent);
    } else {
      setCurrent([item]);
      onChange(item.id); // Pass the entire object for single select
      onClose();
    }
  };

  return (
    <div
      className={`nice-select form-select-lg ${className || ""} ${open ? "open" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={(e) => e}
      ref={ref}
    >
      <span 
        className="current" 
        title={multiSelect ? current.map((item) => item.name).join(", ") : current[0]?.name || placeholder}
      >
        {multiSelect
          ? current.map((item) => item.name).join(", ")
          : current[0]?.name || placeholder}
      </span>
      <ul
        className="list"
        role="menubar"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {options?.map((item, i) => (
          <li
            key={i}
            data-value={item.id}
            className={`option ${current.some((option) => option.id === item.id) ? "selected focus" : ""}`}
            style={{ fontSize: "14px" }}
            role="menuitem"
            onClick={() => currentHandler(item)}
            onKeyDown={(e) => e}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default function SingleSelectInput({
  selectHandler,
  options,
  label,
  onBlur,
  isDisabled,
  isRequired,
  placeHolder,
  multiSelect = false,
}: any) {
  const convertToLabel = (str) => {
    return str?.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, str[0].toUpperCase());
  };

  return (
    <div className="dash-input-wrapper mb-30">
      <label htmlFor="">{convertToLabel(label)}</label>
      <SelectComponent
        className="nice-select"
        options={options}
        defaultCurrent={multiSelect ? [] : [0]} // Adjust default selection for multi/single
        onChange={selectHandler} // Pass the entire objects here
        name=""
        placeholder={placeHolder}
        onBlur={onBlur}
        isDisabled={isDisabled}
        isRequired={isRequired}
        multiSelect={multiSelect}
      />
    </div>
  );
}

