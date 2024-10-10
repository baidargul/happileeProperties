import FavouriteBody from './FavouriteBody';
import DashboardProtectRoute from '../DashboardProtectRoute';


const DashboardFavourite = () => {
   return (
      <DashboardProtectRoute>
         <FavouriteBody />
      </DashboardProtectRoute>
   )
}

export default DashboardFavourite;
