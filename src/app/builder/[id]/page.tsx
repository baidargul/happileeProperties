import ListingDetailsSix from "@/components/ListingDetails/listing-details-6";
import React from "react";

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
  ];
}

export default async function Builder() {
  // return <ListingDetailsSix />;
  return <></>
}
