import PropertyCard from "@/components/homes/home-four/PropertyCard";
import React from "react";
import prisma from "../../../../serveractions/commands/prisma";
import { formatter } from "../../../../serveractions/Actions/partials/format";

export const Listing = async ({ currentItems, style }: any) => {
  const sasa = () => {};
  let property_data: any = await prisma.property.findMany({
    select: {
      id: true,
    },
  });

  let properties: any = [];
  for (const item of property_data) {
    const property = await formatter.formattedProperty(item.id);
    if (property) {
      properties.push(property);
    }
  }

  console.log(properties.length);

  // const properties=[
  //   {
  //     id: 1,
  //     name: "Property 1",
  //     address: "123 Main St, City",
  //     image: "/images/property/property_1.jpg",
  //     price: "$1,000,000",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     area: "1,000 sqft",
  //     propertyImages:[
  //       {
  //         image:{
  //           url:''
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     name: "Property 1",
  //     address: "123 Main St, City",
  //     image: "/images/property/property_1.jpg",
  //     price: "$1,000,000",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     area: "1,000 sqft",
  //     propertyImages:[
  //       {
  //         image:{
  //           url:''
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     name: "Property 1",
  //     address: "123 Main St, City",
  //     image: "/images/property/property_1.jpg",
  //     price: "$1,000,000",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     area: "1,000 sqft",
  //     propertyImages:[
  //       {
  //         image:{
  //           url:''
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     name: "Property 1",
  //     address: "123 Main St, City",
  //     image: "/images/property/property_1.jpg",
  //     price: "$1,000,000",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     area: "1,000 sqft",
  //     propertyImages:[
  //       {
  //         image:{
  //           url:''
  //         }
  //       }
  //     ]
  //   },
  // ]

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-md-between justify-content-center flex-wrap gap-5">
        {properties.map((item: any) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>
    </div>
  );
};

export default Listing;
