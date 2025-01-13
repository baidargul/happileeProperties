import PrivacyPolicy from "@/components/inner-pages/policy/PrivacyPolicy";
import TermsAndConditions from "@/components/inner-pages/policy/TermsAndConditions";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Terms and Conditions Happilee  ",
};
const index = () => {
   return (
      <Wrapper>
         <TermsAndConditions/>
      </Wrapper>
   )
}

export default index