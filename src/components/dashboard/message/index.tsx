import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import MessageBody from "./MessageBody"
import DashboardProtectRoute from "../DashboardProtectRoute";


const DashboardMessage = () => {
   return (
      <DashboardProtectRoute>
         <DashboardHeaderOne />
         <MessageBody />
      </DashboardProtectRoute>
   )
}

export default DashboardMessage
