import Image, { StaticImageData } from "next/image";
import Fancybox from "@/components/common/Fancybox";

import bigCarousel_1 from "@/assets/images/listing/img_43.jpg"
import bigCarousel_2 from "@/assets/images/listing/img_44.jpg"
import bigCarousel_3 from "@/assets/images/listing/img_45.jpg"
import bigCarousel_4 from "@/assets/images/listing/img_46.jpg"

import smallCarousel_1 from "@/assets/images/listing/img_43_s.jpg"
import smallCarousel_2 from "@/assets/images/listing/img_44_s.jpg"
import smallCarousel_3 from "@/assets/images/listing/img_45_s.jpg"
import smallCarousel_4 from "@/assets/images/listing/img_46_s.jpg"

const largeThumb: string[] = ["1", "2", "3"];

interface DataType {
  big_carousel: StaticImageData&{
    src: string;
    url: string;
  };
  small_carousel: StaticImageData[];
}


const MediaGallery = ({ style,images }: any) => {
  return (
    <div className="media-gallery mt-30">
      <div id="media_slider" className="carousel slide row">
        <div className="col-lg-10">
          <div className={` bg-white border-20 md-mb-20 ${style ? "" : "shadow4 p-30"}`}>
            <div className="position-relative z-1 overflow-hidden border-20">
              <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                Sell all {images?.length} Photos
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: true,
                    },
                  }}
                >
                  {images?.map((item: any, index: any) => (
                    <a key={index} className="d-block" data-fancybox="img2" href={`${item?.image?.url}`}></a>
                  ))}
                </Fancybox>
              </div>

              <div className="carousel-inner">
                {images?.map((carousel:any, index:number) => (
                  <div key={index} className="carousel-item active">
                    <Image src={carousel?.image?.url} alt="" className="w-100 border-20 object-fit-cover" width={1120} height={700}
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#media_slider"
                data-bs-slide="prev">
                <i className="bi bi-chevron-left"></i>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#media_slider"
                data-bs-slide="next">
                <i className="bi bi-chevron-right"></i>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-2">
          <div className={`carousel-indicators position-relative p-15 w-100 h-100 ${style ? "" : "border-15 bg-white shadow4"}`}>
            {images?.map((carousel: any, i: number) => (
              <button key={i} type="button" data-bs-target="#media_slider" data-bs-slide-to={`${i}`} className="active"
                aria-current="true" aria-label="Slide 1">
                <Image src={carousel?.image?.url} alt="" className="w-100 border-10 object-fit-cover" width={187} height={161}/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaGallery
