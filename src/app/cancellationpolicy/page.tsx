import CancellationPolicy from "@/components/inner-pages/policy/CancellationPolicy";
import PrivacyPolicy from "@/components/inner-pages/policy/PrivacyPolicy";
import TermsAndConditions from "@/components/inner-pages/policy/TermsAndConditions";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Cancellation Policy  ",
};
const index = () => {
   return (
      <Wrapper>
         <CancellationPolicy/>
      </Wrapper>
   )
}

export default index