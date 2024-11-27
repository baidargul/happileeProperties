import FooterFour from "@/layouts/footers/FooterFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingThreeArea from "./ListingThreeArea"
import HeaderFour from "@/layouts/headers/HeaderFour"

const ListingSix = () => {
   return (
      <>
         <HeaderFour />
         <ListingThreeArea style={false} />
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ListingSix;
