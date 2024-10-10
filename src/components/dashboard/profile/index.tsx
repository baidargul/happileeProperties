import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import ProfileBody from "./ProfileBody"
import DashboardProtectRoute from "../DashboardProtectRoute"

const DashboardProfile = () => {
   return (
      <DashboardProtectRoute>
            <DashboardHeaderOne />
            <ProfileBody />
      </DashboardProtectRoute>
   )
}

export default DashboardProfile
