import PropertyOne from "@/components/homes/home-four/PropertyOne";
import ListingDetailsSixArea from "./ListingDetailsSixArea";
import FancyBanner from "@/components/common/FancyBanner";
import Property from "@/components/homes/home-one/Property";
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderFour from "@/layouts/headers/HeaderFour";
import ListingDetailsOneArea from "../listing-details-1/ListingDetailsOneArea";

type Props = {
  id?: string;
};

const ListingDetailsSix = (props: Props) => {
  return (
    <>
      <HeaderFour />
      <ListingDetailsOneArea id={props.id} />
      <PropertyOne />
      <FooterFour />
    </>
  );
};

export default ListingDetailsSix;
