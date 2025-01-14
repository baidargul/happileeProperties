import React from "react";

interface Props {
  selectedItems: any[]; // Array of selected objects
  setSelectedItems: any; // State setter for selected objects
  item: any; // The object to be stored when selected
  className?: string;
  style?: React.CSSProperties;
  multiSelect?: boolean; // Flag for multi-select (default false)
}

export default function SelectionCard({
  selectedItems,
  setSelectedItems,
  item,
  className,
  style,
  multiSelect = false,
}: Props) {
  const isSelected = selectedItems.some((selected) => selected.id === item.id);

  const handleClick = () => {
    if (multiSelect) {
      // Multi-select logic
      setSelectedItems((prev: any) =>
        isSelected
          ? prev.filter((selected:any) => selected.id !== item.id) // Remove if already selected
          : [...prev, item] // Add if not selected
      );
    } else {
      // Single-select logic
      setSelectedItems(isSelected ? [] : [item]);
    }
  };

  return (
    <div
      className={`border border-2 col d-flex align-items-center justify-content-center ${
        isSelected ? "bg-primary text-white" : ""
      } rounded-2 text-center p-2`}
      style={{ cursor: "pointer", ...style }}
      onClick={handleClick} // Use internal click handler
    >
      <p className={`mb-0 fs-6 fw-normal ${className}`}>{item.name}</p>
    </div>
  );
}
