import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne";
import SavedSearchBody from "./SavedSearchBody";
import DashboardProtectRoute from "../DashboardProtectRoute";

const DashboardSavedSearch = () => {
   return (
      <DashboardProtectRoute>
         <DashboardHeaderOne />
         <SavedSearchBody />
      </DashboardProtectRoute>
   )
}

export default DashboardSavedSearch;
