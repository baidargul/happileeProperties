import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import ReviewBody from "./ReviewBody"
import DashboardProtectRoute from "../DashboardProtectRoute"

const DashboardReview = () => {
  return (
    <DashboardProtectRoute>
         <DashboardHeaderOne />
         <ReviewBody />
    </DashboardProtectRoute>
  )
}

export default DashboardReview
