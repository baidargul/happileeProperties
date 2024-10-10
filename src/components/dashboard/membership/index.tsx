import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne";
import MembershipBody from "./MembershipBody";
import DashboardProtectRoute from "../DashboardProtectRoute";


const DashboardMembership = () => {
  return (
    <DashboardProtectRoute>
      <DashboardHeaderOne/>
      <MembershipBody />
    </DashboardProtectRoute>
  )
}

export default DashboardMembership;
