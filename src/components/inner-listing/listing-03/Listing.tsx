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

  return (
    <div className="bg-primary w-100">
      <div className="row gx-xxl-5">
        {properties.map((item: any) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>
    </div>
  );
};

export default Listing;
