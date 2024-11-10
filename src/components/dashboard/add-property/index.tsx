import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import AddPropertyBody from "./AddPropertyBody"
import DashboardProtectRoute from "../DashboardProtectRoute"
import { serverActions } from "../../../../serveractions/commands/serverCommands";


const DashboardAddProperty = () => {

   return (
      <DashboardProtectRoute>
            <DashboardHeaderOne />
            <AddPropertyBody />
      </DashboardProtectRoute>
   )
}

export default DashboardAddProperty
