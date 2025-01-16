"use client"
import property_data from "@/data/home-data/PropertyData";
import Image from "next/image";
import Link from "next/link";

import titleShape from "@/assets/images/shape/title_shape_03.svg";
import "@fancyapps/ui/dist/carousel/carousel.css";
import prisma from "../../../../serveractions/commands/prisma";
import { Carousel } from "@fancyapps/ui";
import { useEffect, useState } from "react";
import { formatter } from "../../../../serveractions/Actions/partials/format";
import CarouselWrapper from "@/components/common/FancyCarousal";
import PropertyCard from "./PropertyCard";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useSelector } from "react-redux";
// import { serverActions } from "../../../../serveractions/commands/serverCommands"

const PropertyRecomend =  ({ style_1, style_2 }: any) => {
  const userProfile = useSelector((state:any)=>state.user.userProfile);
  const [property,setProperty]=useState([]);

   const getRecomendListing = async () => {
      const res = await serverActions.user.recommendations(userProfile?.id);
      if(res.data.status==200){
        setProperty(res.data.data)
      }
   }

   useEffect(() => {
    getRecomendListing();
   }, []);

  return (property.length>0 &&
    <div className="property-listing-five mt-170 xl-mt-120" style={{backgroundColor:"#F4FAFF",padding:'1rem 0'}}>
      <div className="container container-large">
        <div className="position-relative">
          <div className="title-one mb-25 lg-mb-10 wow fadeInUp">
            {style_2 ? (
              <h3>
                <span>
                  Recomended
                  <Image src={titleShape} alt="" className="lazy-img" />
                </span>{" "}
                Properties
              </h3>
            ) : (
              <h3>{style_1 ? "Popular Listings" : "New Listings"}</h3>
            )}
            <p className="fs-22">
              Explore recomended properties for sale, rent & mortgage.
            </p>
          </div>
          <CarouselWrapper options={{ infinite: true }}>
            {property?.map((item:any) => (
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

export default PropertyRecomend;
