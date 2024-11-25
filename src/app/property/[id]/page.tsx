import ListingDetailsFour from "@/components/ListingDetails/listing-details-4";
import ListingDetailsSix from "@/components/ListingDetails/listing-details-6";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

type Props={
  params:{
    id:string,
  },
}

export default async function page(props:Props) {
  return (
    <Wrapper>
      <ListingDetailsSix id={props.params.id}/>
    </Wrapper>
  );
}
