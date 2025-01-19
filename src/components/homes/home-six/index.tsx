import BLockFeatureTwo from "../home-five/BLockFeatureTwo"
import Property from "../home-four/PropertyOne"
import HeroBanner from "./HeroBanner"
import PropertyOne from "./PropertyOne"
import HomeSixBLockFeatureTwo from "./BLockFeatureTwo"
import BLockFeatureThree from "./BLockFeatureThree"
import Feedback from "./Feedback"
import Brand from "./Brand"
import Blog from "../home-four/Blog"
import FancyBanner from "./FancyBanner"
import FooterFive from "@/layouts/footers/FooterFive"
import HeaderFour from "@/layouts/headers/HeaderFour"
import Category from "../home-three/Category"
import PropertyRecomend from "../home-four/PropertyRecomend"
import MembershipBody from "@/components/dashboard/membership/MembershipBody"
import Pricing from "@/components/dashboard/membership/Pricing"
import Subscription from "@/components/common/Subscription"

const HomeSix = () => {
   return (
      <>
         <HeaderFour />
         <HeroBanner />
         <Category style={false}/>
         {/* <BLockFeatureTwo style={true} /> */}
         {/* <PropertyOne /> */}
         <Property style_1={false} style_2={true} />
         <PropertyRecomend style_1={false} style_2={true} />
         <Subscription/>
         {/* <p style={{
            textAlign: 'center',
            fontSize: '10rem',
            color: '#333',
            padding: '50px 0'
         }}>Comming Soon...</p> */}
         {/* <HomeSixBLockFeatureTwo /> */}
         {/* <BLockFeatureThree /> */}
         {/* <Feedback /> */}
         {/* <Brand /> */}
         {/* <Blog /> */}
         {/* <FancyBanner /> */}
         <FooterFive />
      </>
   )
}

export default HomeSix
