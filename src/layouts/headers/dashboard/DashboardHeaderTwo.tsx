"use client";
import Image from "next/image";
import Link from "next/link";
import Notification from "./Notification";
import Profile from "./Profile";
import { useState } from "react";
import DashboardHeaderOne from "./DashboardHeaderOne";

import dashboardIcon_1 from "@/assets/images/dashboard/icon/icon_43.svg";
import dashboardIcon_2 from "@/assets/images/dashboard/icon/icon_11.svg";
import dashboardAvatar from "@/assets/images/dashboard/user.jpg";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CountCard from "./CountCard";
import { serverActions } from "../../../../serveractions/commands/serverCommands";

interface RootState {
  user: {
    isLoggedIn: boolean;
  };
}

const DashboardHeaderTwo = ({ title }: any) => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userProfile = useSelector((state: any) => state.user.userProfile);
  const [isActive, setIsActive] = useState<boolean>(false);
  if (!isLoggedIn) {
    router.push("/");
  }

  return (
    <>
      <header className="dashboard-header">
        <div className="d-flex align-items-center justify-content-between gap-4">
          <h4 className="m0 d-none d-lg-block">{title}</h4>
          <button
            onClick={() => setIsActive(true)}
            className="dash-mobile-nav-toggler d-block d-md-none me-auto"
          >
            <span></span>
          </button>
          {/* <form className="search-form ms-auto"> */}
          {/* <input type="text" placeholder="Search here.." />
                  <button><Image src={dashboardIcon_1} alt="" className="lazy-img m-auto" /></button> */}
          {/* </form> */}
          {/* <div className="profile-notification position-relative dropdown-center ms-3 ms-md-5 me-4">
                  <button className="noti-btn dropdown-toggle" type="button" id="notification-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                     <Image src={dashboardIcon_2} alt="" className="lazy-img" />
                     <div className="badge-pill"></div>
                  </button>
                  <Notification />
               </div> */}
          {/* <div className="d-none d-md-block me-3">
                  <Link href="/add-property" className="btn-two"><span>Add Listing</span> <i className="fa-thin fa-arrow-up-right"></i></Link>
               </div> */}
              {/* <div style={{
               width:'70%'
              }}></div>  */}
          <div className="user-data position-relative">
            <button
              className="user-avatar online position-relative rounded-circle dropdown-toggle"
              type="button"
              id="profile-dropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <Image src={dashboardAvatar} alt="" className="lazy-img" />
            </button>
            <Profile />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-end gap-4" style={{
         marginTop:'20px',
        }}>
          {userProfile.status === "ACTIVE" && (
            <>
            {userProfile?.subscription?.isExpired ? <div className="d-flex align-items-center justify-content-center flex-column w-100 p-1 border border-danger rounded" style={{
            backgroundColor:'#ff000041'
          }}>
            <p className="p-0 m-0">Your Subscription has expired !</p>
            <Link href="/dashboard/membership">
                    <button className="btn-two d-block">
                      <span>Renew Subscription</span>
                    </button>
                  </Link>  
          </div> :(
            <>
              {/* BUYER */}
              {userProfile.type === "BUYER" &&
                Object.entries(userProfile?.subscription?.properties || {})
                  .filter(
                    ([key]: [string, any]) =>
                      !["Validity", "Priority Support"].includes(key)
                  )
                  .map(([key, value]: [string, any], index) => (
                    <CountCard key={index} data={value} title={key} />
                  ))}

              {/* AGENT */}
              {userProfile.type === "AGENT" &&
                Object.entries(userProfile?.subscription?.properties || {})
                  .filter(
                    ([key]: [string, any]) =>
                      ![
                        "Bluetick verification",
                        "Position on Search",
                        "Response Rate Boost",
                        "Validity",
                        "Max access to buyers",
                      ].includes(key)
                  )
                  .map(([key, value]: [string, any], index) => (
                    <CountCard key={index} data={value} title={key} />
                  ))}
            </>
          )}
              {!userProfile.bluetickVerified &&
                userProfile.type === "AGENT" && (
                  <Link href="/dashboard/verify">
                    <button className="btn-two d-block">
                      <span>Apply Blue Tick</span>
                    </button>
                  </Link>
                )}

            </>
          )}
        </div>
      </header>
      <DashboardHeaderOne isActive={isActive} setIsActive={setIsActive} />
    </>
  );
};

export default DashboardHeaderTwo;
