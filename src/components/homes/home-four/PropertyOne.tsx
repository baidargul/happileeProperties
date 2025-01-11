// "use client"
import property_data from "@/data/home-data/PropertyData";
import Image from "next/image";
import Link from "next/link";

import titleShape from "@/assets/images/shape/title_shape_03.svg";
import "@fancyapps/ui/dist/carousel/carousel.css";
import prisma from "../../../../serveractions/commands/prisma";
import { Carousel } from "@fancyapps/ui";
import { useEffect } from "react";
import { formatter } from "../../../../serveractions/Actions/partials/format";
import CarouselWrapper from "@/components/common/FancyCarousal";
import PropertyCard from "./PropertyCard";
// import { serverActions } from "../../../../serveractions/commands/serverCommands"

const PropertyOne = async ({ style_1, style_2 }: any) => {
//   useEffect(() => {
//      const container = document.getElementById("myCarousel");
//      new Carousel(container, {
//         infinite: false, // Loop through slides
//      });
//    }, []);

  //  const getListing = async () => {
  //     const res = await serverActions.property.listAll();
  //     console.log(res)
  //  }

  //  getListing();

  let property_data: any = await prisma.property.findMany({
    select: {
      id: true,
    },
    where:{
      NOT:{
        status:"PENDING"
      }
    }
  });

  let properties: any = [];
  for (const item of property_data) {
    const property = await formatter.formattedProperty(item.id);
    if (property) {
      properties.push(property);
    }
  }


  return ( properties.length > 0 &&
    <div className="property-listing-five mt-170 xl-mt-120" style={{backgroundColor:"#F4FAFF",padding:'1rem 0'}}>
      <div className="container container-large">
        <div className="position-relative">
          <div className="title-one mb-25 lg-mb-10 wow fadeInUp">
            {style_2 ? (
              <h3>
                <span>
                  New
                  <Image src={titleShape} alt="" className="lazy-img" />
                </span>{" "}
                Listings
              </h3>
            ) : (
              <h3>{style_1 ? "Popular Listings" : "New Listings"}</h3>
            )}
            <p className="fs-22">
              Explore latest and featured properties for sale, rent & mortgage.
            </p>
          </div>
          <CarouselWrapper options={{ infinite: true }}>
            {properties?.map((item:any) => (
               <PropertyCard key={item.id} property={item} />
            ))}
          </CarouselWrapper>
          <div className="section-btn text-center md-mt-60">
            <Link href="/properties" className="btn-eight">
              <span>Explore All</span> <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOne;
