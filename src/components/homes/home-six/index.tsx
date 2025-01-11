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

const HomeSix = () => {
   return (
      <>
         <HeaderFour />
         <HeroBanner />
         <Category style={false}/>
         {/* <BLockFeatureTwo style={true} /> */}
         {/* <PropertyOne /> */}
         <Property style_1={false} style_2={true} />
         <p style={{
            textAlign: 'center',
            fontSize: '10rem',
            // fontWeight: 'bold',
            color: '#333',
            padding: '50px 0'
         }}>Comming Soon...</p>
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
