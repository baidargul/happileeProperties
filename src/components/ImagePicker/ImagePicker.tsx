import React, { useEffect, useState } from "react";
import ImagePreviewBox from "./ImagePreviewBox";
import { toast } from "sonner";

type ImagePickerProps = {
  selectedImageArray: Array<any>;
  setSelectedImageArray: (obj: any) => void;
  setRemovedImageArray: (obj: any) => void;
  label: String;
};

export default function ImagePicker(props: ImagePickerProps) {
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (selectedImage) {
      props.setSelectedImageArray((prev: any) => [...prev, selectedImage]);
    }
  }, [selectedImage]);

  return (
    <div className={"dash-input-wrapper mb-30"}>
      <label className="mb-3 block text-orange-600">
        {props.label || "Images"}
      </label>
      <div className="flex items-center justify-start flex-wrap gap-6">
        {props.selectedImageArray.length > 0 &&
          props.selectedImageArray?.map((item, index) => (
            <ImagePreviewBox
              key={index}
              imageData={item}
              setSelectedArray={props.setSelectedImageArray}
              setRemovedArray={props.setRemovedImageArray}
            />
          ))}
        <div className="position-relative mt-1">
          <label
            htmlFor="image-file"
            className="d-flex bg-gray-100 flex-column justify-content-center align-items-center"
            style={{ width: "6.2rem", height: "6.2rem", cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="mb-2"
              style={{ width: "1.25rem", height: "1.25rem" }}
            >
              <path
                fill="black"
                d="M432 256C432 269.25 421.25 280 408 280H248V440C248 453.25 237.25 464 224 464S200 453.25 200 440V280H40C26.75 280 16 269.25 16 256S26.75 232 40 232H200V72C200 58.75 210.75 48 224 48S248 58.75 248 72V232H408C421.25 232 432 242.75 432 256Z"
              />
            </svg>
            <p className="font-weight-medium mb-0">Upload</p>
          </label>
          <input
            type="file"
            id="image-file"
            className="d-none"
            onChange={(e: any) => {
              if (
                e.target.files[0].type !== "image/png" &&
                e.target.files[0].type !== "image/jpg" &&
                e.target.files[0].type !== "image/jpeg"
              ) {
                toast.error("Please select a valid image format", {
                  description: "Allowed formats are JPG, JPEG, and PNG",
                });
              } else {
                setSelectedImage(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
