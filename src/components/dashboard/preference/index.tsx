import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import ProfileBody from "./ProfileBody"
import DashboardProtectRoute from "../DashboardProtectRoute"

const DashboardPreference = () => {
   return (
      <DashboardProtectRoute>
            <DashboardHeaderOne />
            <ProfileBody />
      </DashboardProtectRoute>
   )
}

export default DashboardPreference
