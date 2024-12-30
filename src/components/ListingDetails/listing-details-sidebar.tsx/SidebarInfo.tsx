"use client"
import Image from "next/image"
import Link from "next/link"

import infoAvatar from "@/assets/images/agent/user-tie.svg"
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


const SidebarInfo = ({property}: {property: any}) => {
   const userProfile = useSelector((state: any) => state.user.userProfile);
   
   const [hide,setHide] = useState(false)

   const handleContactAgent = async () => {
      const res = await serverActions.leads.createLead(property.id,userProfile?.id);
      if(res.status==200){
         setHide(true)
      }
   }  
   return (
         <>
         <Image src={infoAvatar} alt=""
            className="lazy-img  ms-auto me-auto mt-3 avatar" />
         <div className="text-center mt-25">
            <h6 className="name">{property?.user?.name??"Jhon Deo"}</h6>
            <p className="fs-16">Property Agent & Broker</p>
            {/* <p className="fs-14 text-muted">{property?.user?.agent?.description??"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."}</p> */}
            {/* <ul className="style-none d-flex align-items-center justify-content-center social-icon">
               <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
            </ul> */}
         </div>
         {hide?<div className="divider-line mt-40 mb-45 pt-20">
            <ul className="style-none">
               {property?.user?.address&&<li>Location: <span>{property?.user?.address??"Lorem ipsum dolor sit amet"}</span></li>}
               <li>Email: <span><Link href={`mailto:${property?.user?.email}`}>{property?.user?.email??"info@inquiry"}</Link></span>
               </li>
               <li>Phone: <span><Link href={`tel:${property?.user?.phone}`}>{property?.user?.phone??"123-456-7890"}</Link></span></li>
            </ul>
         </div>:<button onClick={
            // ()=>setHide(true)
            handleContactAgent
            } className="btn-nine text-uppercase rounded-3 w-100 mb-10">
            
            CONTACT AGENT</button>}
      </>
   )
}

export default SidebarInfo
