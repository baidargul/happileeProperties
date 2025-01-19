import PrivacyPolicy from "@/components/inner-pages/policy/PrivacyPolicy";
import QuestionAndContactInformation from "@/components/inner-pages/policy/QuestionAndContactInformation";
import TermsAndConditions from "@/components/inner-pages/policy/TermsAndConditions";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Question & Contact Information Happilee  ",
};
const index = () => {
   return (
      <Wrapper>
         <QuestionAndContactInformation/>
      </Wrapper>
   )
}

export default index