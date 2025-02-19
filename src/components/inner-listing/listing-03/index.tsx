"use client"
import FooterFour from "@/layouts/footers/FooterFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingThreeArea from "./ListingThreeArea"
import HeaderFour from "@/layouts/headers/HeaderFour"
import FooterFive from "@/layouts/footers/FooterFive"
import HeaderThree from "@/layouts/headers/HeaderThree"

const ListingSix = () => {
   return (
      <>
         <HeaderFour />
         <ListingThreeArea style={false} />
         <FancyBanner />
         <FooterFive />
      </>
   )
}

export default ListingSix;
