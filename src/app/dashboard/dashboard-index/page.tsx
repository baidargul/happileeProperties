import DashboardIndex from "@/components/dashboard/index";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Dashboard Index Happilee  ",
};
const index = () => {
   return (
      <Wrapper>
         <DashboardIndex />
      </Wrapper>
   )
}

export default index