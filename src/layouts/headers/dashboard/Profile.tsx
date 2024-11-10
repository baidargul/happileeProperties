import Link from "next/link"
import Image from "next/image";
import DeleteModal from "@/modals/DeleteModal";

import profileIcon_1 from "@/assets/images/dashboard/icon/icon_23.svg";
import profileIcon_2 from "@/assets/images/dashboard/icon/icon_24.svg";
import profileIcon_3 from "@/assets/images/dashboard/icon/icon_41_dark.svg";

const Profile = () => {
   const liStyle:React.CSSProperties = {
      textTransform: 'capitalize',
      lineHeight: '35px',
      padding: '0 0 0 20px',
      color: '#000',
      fontSize: '15px',
      fontWeight: 900,
      letterSpacing: '-0.16px', // (Kept the last defined letter-spacing)
      background: 'transparent',
      position: 'relative',
      transition: 'all 0.2s ease-in-out 0s',
    };

   return (
      <>
         <div className="user-name-data">
            <ul className='dropdown-menu border-0 py-3' aria-labelledby="profile-dropdown" style={{
                     width: '220px',
                     borderRadius: '15px',
                     boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                  }}>
               <li className=""   style={liStyle}>
                  <Link className="dropdown-item d-flex align-items-center" href="/dashboard/profile"><Image src={profileIcon_1} width={20} height={18} alt="" className="lazy-img" /><span className="ms-2 ps-1" style={{fontWeight:500}}>Profile</span></Link>
               </li>
               <li className=""   style={liStyle}>
                  <Link className="dropdown-item d-flex align-items-center" href="/dashboard/account-settings"><Image src={profileIcon_2} width={20} height={18} alt="" className="lazy-img" /><span className="ms-2 ps-1" style={{fontWeight:500}}>Account Settings</span></Link>
               </li>
               <li className="" style={liStyle}>
                  <Link className="dropdown-item d-flex align-items-center" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal"><Image src={profileIcon_3}  width={20} height={18}alt="" className="lazy-img"/><span className="ms-2 ps-1" style={{fontWeight:500}}>Logout</span></Link>
               </li>
            </ul>
         </div>
         <DeleteModal />
      </>
   )
}

export default Profile
