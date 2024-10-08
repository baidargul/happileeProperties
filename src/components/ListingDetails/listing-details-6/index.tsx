import ListingDetailsSixArea from "./ListingDetailsSixArea"
import FancyBanner from "@/components/common/FancyBanner"
import Property from "@/components/homes/home-one/Property"
import FooterFour from "@/layouts/footers/FooterFour"
import HeaderFour from "@/layouts/headers/HeaderFour"

const ListingDetailsSix = () => {
   return (
      <>
         <HeaderFour />
         <ListingDetailsSixArea />
         <Property />
         <FooterFour />
      </>
   )
}

export default ListingDetailsSix;
