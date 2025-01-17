"use client";
import React, { useState, useCallback, useRef, FC, ChangeEvent, CSSProperties } from "react";
import { useClickAway } from "react-use";

interface Option {
  id: string | boolean;
  name: string;
}

type NiceSelectProps = {
  options: Option[];
  // defaultCurrent: number;
  placeholder?: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  onBlur?: () => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  stlye?: CSSProperties;
};

const NiceSelectFilterModal: FC<NiceSelectProps> = ({
  options,
  // defaultCurrent,
  placeholder,
  className,
  onChange,
  name,
  onBlur,
  stlye,
  
}) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Option>();
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickAway(ref, onClose);

  const currentHandler = (item: Option) => {
    setCurrent(item);
    onChange({ target: { value: item.id } } as ChangeEvent<HTMLSelectElement>);
    onClose();
  };

  return (
    <div
      className={`nice-select form-select-lg ${className || ""} ${
        open ? "open" : ""
      }`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={(e) => e}
      ref={ref}
      style={stlye}
    >
      <span className="current">{current?.name || placeholder}</span>
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
            className={`option ${
              item.id === current?.id ? "selected focus" : ""
            }`}
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

export default NiceSelectFilterModal;
