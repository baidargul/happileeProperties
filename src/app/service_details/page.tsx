import ServiceDetails from "@/components/inner-pages/services/service-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Service Details Happilee  ",
};
const index = () => {
   return (
      <Wrapper>
         <ServiceDetails />
      </Wrapper>
   )
}

export default index