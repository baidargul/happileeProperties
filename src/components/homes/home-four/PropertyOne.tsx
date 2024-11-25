// "use client"
import property_data from "@/data/home-data/PropertyData"
import Image from "next/image"
import Link from "next/link"

import titleShape from "@/assets/images/shape/title_shape_03.svg"
import "@fancyapps/ui/dist/carousel/carousel.css";
import prisma from "../../../../serveractions/commands/prisma";
import { Carousel } from "@fancyapps/ui";
import { useEffect } from "react"
// import { serverActions } from "../../../../serveractions/commands/serverCommands"


const PropertyOne = async ({ style_1, style_2 }: any) => {

   // useEffect(() => {
   //    const container = document.getElementById("myCarousel");
   //    new Carousel(container, {
   //       infinite: false, // Loop through slides
   //    });
   //  }, []);

   //  const getListing = async () => {
   //     const res = await serverActions.property.listAll();
   //     console.log(res)
   //  }

   //  getListing();

   let property_data: any = await prisma.property.findMany({
      include: {
        propertyType: {
          include: {
            allotmentType: true,
          },
        },
        bhkType: true,
        furnishing: true,
        ownershipType: true,
        propertyImages: {
          include: {
            image: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          title: "asc",
        },
        {
          propertyType: {
            name: "asc",
          },
        },
        {
          bhkType: {
            name: "asc",
          },
        },
        {
          furnishing: {
            name: "asc",
          },
        },
      ],
    });
    
    console.log(property_data)

   return (
      <div className="property-listing-five mt-170 xl-mt-120">
         <div className="container container-large">
            <div className="position-relative">
               <div className="title-one mb-25 lg-mb-10 wow fadeInUp">
                  {style_2 ? <h3><span>New<Image src={titleShape} alt="" className="lazy-img" /></span> Listings</h3> :
                     <h3>{style_1 ? "Popular Listings" : "New Listings"}</h3>}
                  <p className="fs-22">Explore latest and featured properties for sale, rent & mortgage.</p>
               </div>

               <div id="myCarousel" className="f-carousel" >
                  {property_data?.map((item) => (
                     <div key={item.id} className="col-sm d-flex mt-40 wow fadeInUp mx-auto f-carousel__slide" 
                     style={{margin:"10px 5px"}}
                     >
                        <div className="listing-card-one w-100 style-two shadow-none h-100 w-100 bg-light" style={{borderRadius:'10px'}}>
                           <div className="img-gallery">
                              <div className="position-relative overflow-hidden">
                                 <div className="tag fw-500">{item.tag}</div>
                                 <div id={`carousel${item.carousel}`} className="carousel slide">
                                    <div className="carousel-indicators">
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div className="carousel-inner">
                                       {item?.carousel_thumb?.map((item, i) => (
                                          <div key={i} className={`carousel-item ${item.active}`} data-bs-interval="1000000">
                                             <Link href="/listing_details_01" className="d-block"><Image src={item.img} className="w-100" alt="..." /></Link>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="property-info" style={{padding:'10px'}}>
                              <Link href="/listing_details_03" className="title tran3s">{item.title}</Link>
                              <div className="address">{item.address}</div>
                              {/* <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5">
                                 {item.property_info.map((info, index) => (
                                    <li key={index} className="d-flex align-items-center">
                                       <Image src={info.icon} alt="" className="lazy-img icon me-2" />
                                       <span className="fs-16">{info.total_feature} {info.feature}</span>
                                    </li>
                                 ))}
                              </ul> */}
                              <div className="pl-footer top-border bottom-border d-flex align-items-center justify-content-between">
                                 <strong className="price fw-500 color-dark">{Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}</strong>
                                 <Link href="/listing_details_03" className="btn-four"><i className="bi bi-arrow-up-right"></i></Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="section-btn text-center md-mt-60">
                  <Link href="/listing_08" className="btn-eight"><span>Explore All</span> <i className="bi bi-arrow-up-right"></i></Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PropertyOne
