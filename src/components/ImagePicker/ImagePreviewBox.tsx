import React, { useEffect, useState } from "react";
import Fancybox from "../common/Fancybox";

import bigCarousel_1 from "@/assets/images/listing/img_43.jpg";
import bigCarousel_2 from "@/assets/images/listing/img_44.jpg";
import bigCarousel_3 from "@/assets/images/listing/img_45.jpg";
import bigCarousel_4 from "@/assets/images/listing/img_46.jpg";

import smallCarousel_1 from "@/assets/images/listing/img_43_s.jpg";
import smallCarousel_2 from "@/assets/images/listing/img_44_s.jpg";
import smallCarousel_3 from "@/assets/images/listing/img_45_s.jpg";
import smallCarousel_4 from "@/assets/images/listing/img_46_s.jpg";
import Image, { StaticImageData } from "next/image";
import MediaGallery from "../ListingDetails/listing-details-1/MediaGallery";

type ImagePreviewBoxProps = {
  imageData: any;
  setSelectedArray: any;
  setRemovedArray: any;
};

const ImagePreviewBox = (props: ImagePreviewBoxProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleDelete = (imageData: any) => {
    props.setSelectedArray((prev: any) => {
      return prev.filter((element: any) => element !== imageData);
    });
    if (imageData?.url) {
      props.setRemovedArray((prev: any) => [...prev, imageData?._id]);
    }
  };

  return (
    <>
      <Fancybox options={{}}>
        <a
          className="position-relative"
          data-fancybox="gallery"
          href={URL.createObjectURL(props.imageData)}
        >
          <img
            src={URL.createObjectURL(props.imageData)}
            style={{ width: "20rem", height: "20rem"}}
          />
          <svg
            onClick={() => handleDelete(props.imageData)}
            className="position-absolute top-0 end-0 bg-light rounded-circle p-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            style={{ width: "1.5rem", height: "1.5rem", cursor: "pointer",zIndex:10, transition: "all 0.2s ease-in-out" }}
          >
            <path
              className=" fill-black"
              d="M315.31 411.31C309.056 417.563 298.936 417.563 292.682 411.31L160 278.627L27.318 411.31C21.064 417.563 10.944 417.563 4.69 411.31C-1.563 405.056 -1.563 394.936 4.69 388.682L137.373 256L4.69 123.318C-1.563 117.064 -1.563 106.944 4.69 100.69C10.944 94.437 21.064 94.437 27.318 100.69L160 233.373L292.682 100.69C298.936 94.437 309.056 94.437 315.31 100.69C321.563 106.944 321.563 117.064 315.31 123.318L182.627 256L315.31 388.682C321.563 394.936 321.563 405.056 315.31 411.31Z"
            />
          </svg>
        </a>
      </Fancybox>
    </>
  );
};

export default ImagePreviewBox;
