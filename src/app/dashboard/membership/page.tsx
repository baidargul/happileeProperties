import DashboardMembership from "@/components/dashboard/membership";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Dashboard Membership Happilee  ",
};
const index = () => {
   
   return (
      <Wrapper>
         <DashboardMembership />
      </Wrapper>
   )
}

export default index