import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import PropertyListBody from "./PropertyListBody"
import DashboardProtectRoute from "../DashboardProtectRoute"

const PropertyList = () => {
   return (
      <DashboardProtectRoute>
            <DashboardHeaderOne />
            <PropertyListBody />
      </DashboardProtectRoute>
   )
}

export default PropertyList
