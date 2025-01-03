import AgencyDetails from "@/components/inner-pages/agency/agency-details";
import ListingDetailsSix from "@/components/ListingDetails/listing-details-6";
import Wrapper from "@/layouts/Wrapper";
import React from "react";
import prisma from "../../../../serveractions/commands/prisma";
import { SERVER_ACTIONS } from "../../../../serveractions/Actions/SERVER_ACTIONS";


export async function generateStaticParams() {
  const ids: any = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return ids.map((id: any) => ({
    id: id.id,
  }));
}

type Props = {
  params: {
    id: string;
  };
};


export default async function Builder(props: Props) {

  await SERVER_ACTIONS.Views.addView(props.params.id);
  return (
    <Wrapper>
      <AgencyDetails/>
    </Wrapper>
  );
}
