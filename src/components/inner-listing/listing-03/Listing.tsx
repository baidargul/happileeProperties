
"use client";
import PropertyCard from "@/components/homes/home-four/PropertyCard";
import React, { useEffect, useState } from "react";
import prisma from "../../../../serveractions/commands/prisma";
import { formatter } from "../../../../serveractions/Actions/partials/format";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { FILTER_TYPE } from "../../../../serveractions/commands/partials/property";

export const Listing = ({ properties }: any) => {

  console.log(properties.length);

  return (properties.length>0?
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-md-between justify-content-center flex-wrap gap-5">
        {properties.map((item: any) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>
    </div>
  :<p style={{ textAlign: "center" }}>No Properties Found</p>);
};

export default Listing;
