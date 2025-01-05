import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import DashboardProtectRoute from "../DashboardProtectRoute"
import VerifyBody from "./VerifyBody"

const DashboardVerify = () => {
   return (
      <DashboardProtectRoute>
            <DashboardHeaderOne />
            <VerifyBody />
      </DashboardProtectRoute>
   )
}

export default DashboardVerify
