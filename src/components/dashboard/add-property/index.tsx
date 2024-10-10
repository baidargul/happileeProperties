import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import AddPropertyBody from "./AddPropertyBody"
import DashboardProtectRoute from "../DashboardProtectRoute"


const DashboardAddProperty = () => {
   return (
      <DashboardProtectRoute>
            <DashboardHeaderOne />
            <AddPropertyBody />
      </DashboardProtectRoute>
   )
}

export default DashboardAddProperty
