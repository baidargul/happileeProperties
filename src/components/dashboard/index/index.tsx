import DashboardBody from "./DashboardBody"
import DashboardProtectRoute from "../DashboardProtectRoute";


const DashboardIndex = () => {
  return (
    <DashboardProtectRoute>
        <DashboardBody/>
    </DashboardProtectRoute>
  )
}

export default DashboardIndex
