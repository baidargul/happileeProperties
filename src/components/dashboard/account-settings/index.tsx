import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne";
import AccountSettingBody from "./AccountSettingBody";
import DashboardProtectRoute from "../DashboardProtectRoute";


const DashboardAccountSetting = () => {
   return (
      <DashboardProtectRoute>
            <DashboardHeaderOne />
            <AccountSettingBody />
      </DashboardProtectRoute>
   )
}

export default DashboardAccountSetting;
