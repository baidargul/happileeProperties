"use client";
import Image from "next/image";
import Link from "next/link";

import infoAvatar from "@/assets/images/agent/user-tie.svg";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface AgentData {
  name?: string;
  agent?: {
    description?: string;
  };
  address?: string;
  email?: string;
  phone?: string;
}

const SidebarInfo = ({ property }: { property: any }) => {
  const userProfile = useSelector((state: any) => state.user.userProfile);

  const [hide, setHide] = useState(false);

  const handleContactAgent = async () => {
    const res = await serverActions.leads.createLead(
      property.id,
      userProfile?.id
    );
    if (res.status == 200) {
      setHide(true);
    }
  };
  return (
    <>
      <Image
        src={infoAvatar}
        alt=""
        className="lazy-img  ms-auto me-auto mt-3 avatar"
      />
      <div className="text-center mt-25">
        <h6 className="name">
          {property?.user?.name ?? "Jhon Deo"}
          {property?.user?.bluetickVerified && (
            <svg
              style={{
                marginLeft: "5px",
                transform: "translateY(-3px)",
              }}
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.9588 9.9552C23.2624 6.58863 19.7818 2.22411 15.9871 3.72081C14.7912 -0.179234 9.2088 -0.179235 8.01298 3.72081C4.21822 2.22411 0.737623 6.58863 3.04122 9.9552C-0.494948 11.9889 0.747257 17.4314 4.81562 17.7294C4.20085 21.762 9.23046 24.1842 12 21.1892C14.7696 24.1842 19.7992 21.762 19.1844 17.7294C23.2528 17.4314 24.495 11.9889 20.9588 9.9552ZM9.88784 4.44062C10.442 2.24749 13.558 2.24749 14.1122 4.44062C14.3862 5.525 15.5746 6.0973 16.5933 5.63543C18.6534 4.70131 20.5962 7.1375 19.2271 8.93817C18.5501 9.8285 18.8436 11.1144 19.8399 11.6229C21.8547 12.6512 21.1613 15.6891 18.8999 15.7413C17.7817 15.7672 16.9593 16.7984 17.1829 17.8943C17.6352 20.1107 14.8278 21.4627 13.3769 19.7272C12.6595 18.8691 11.3405 18.8691 10.6231 19.7272C9.17228 21.4627 6.36486 20.1107 6.81712 17.8943C7.04074 16.7984 6.21835 15.7672 5.10019 15.7413C2.83873 15.6891 2.14535 12.6512 4.16018 11.6229C5.1564 11.1144 5.44991 9.8285 4.77295 8.93817C3.40382 7.1375 5.34661 4.70131 7.40679 5.63543C8.42544 6.0973 9.61383 5.525 9.88784 4.44062ZM16.7572 9.65322C17.118 9.23506 17.0714 8.6036 16.6533 8.24283C16.2351 7.88206 15.6036 7.92859 15.2429 8.34676L10.7627 13.5396L8.70025 11.5168C8.30595 11.13 7.67282 11.1362 7.2861 11.5305C6.89938 11.9248 6.90552 12.5579 7.29981 12.9446L10.1233 15.7139C10.3206 15.9074 10.5891 16.0106 10.8652 15.9991C11.1412 15.9876 11.4002 15.8624 11.5807 15.6532L16.7572 9.65322Z"
                fill="#0D6EFD"
              />
            </svg>
          )}
        </h6>
        <p className="fs-16">Property Agent & Broker</p>
        {/* <p className="fs-14 text-muted">{property?.user?.agent?.description??"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."}</p> */}
        {/* <ul className="style-none d-flex align-items-center justify-content-center social-icon">
               <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
            </ul> */}
      </div>
      { hide || userProfile.id==property?.user?.id ? (
        <div className="divider-line mt-40 mb-45 pt-20">
          <ul className="style-none">
            {property?.user?.address && (
              <li>
                Location:{" "}
                <span>
                  {property?.user?.address ?? "Lorem ipsum dolor sit amet"}
                </span>
              </li>
            )}
            <li>
              Email:{" "}
              <span>
                <Link href={`mailto:${property?.user?.email}`}>
                  {property?.user?.email ?? "info@inquiry"}
                </Link>
              </span>
            </li>
            <li>
              Phone:{" "}
              <span>
                <Link href={`tel:${property?.user?.phone}`}>
                  {property?.user?.phone ?? "123-456-7890"}
                </Link>
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <button
          onClick={
            // ()=>setHide(true)
            handleContactAgent
          }
          className="btn-nine text-uppercase rounded-3 w-100 mb-10"
        >
          CONTACT AGENT
        </button>
      )}
    </>
  );
};

export default SidebarInfo;
