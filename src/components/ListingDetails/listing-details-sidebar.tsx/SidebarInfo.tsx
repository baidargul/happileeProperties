import Image from "next/image"
import Link from "next/link"

import infoAvatar from "@/assets/images/agent/user-tie.svg"
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useEffect, useState } from "react";


interface AgentData {
   name?: string;
   agent?: {
      description?: string;
   };
   address?: string;
   email?: string;
   phone?: string;
}


const SidebarInfo = () => {
   const [agentData, setAgentData] = useState<AgentData | null>(null);

const getData= async ()=>{
   const res = await serverActions.agent.listAll();
      if(res.status==200){
         setAgentData(res.data[0]);
         // console.log(res.data)
      }
}

useEffect(()=>{
   getData()
},[])

   return (
      agentData&&<>
         <Image src={infoAvatar} alt=""
            className="lazy-img  ms-auto me-auto mt-3 avatar" />
         <div className="text-center mt-25">
            <h6 className="name">{agentData?.name}</h6>
            <p className="fs-16">Property Agent & Broker</p>
            <p className="fs-14 text-muted">{agentData?.agent?.description}</p>
            {/* <ul className="style-none d-flex align-items-center justify-content-center social-icon">
               <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
            </ul> */}
         </div>
         <div className="divider-line mt-40 mb-45 pt-20">
            <ul className="style-none">
               {agentData?.address&&<li>Location: <span>{agentData?.address}</span></li>}
               <li>Email: <span><Link href={`mailto:${agentData?.email}`}>{agentData?.email}</Link></span>
               </li>
               <li>Phone: <span><Link href={`tel:${agentData?.phone}`}>{agentData?.phone}</Link></span></li>
            </ul>
         </div>
         <button className="btn-nine text-uppercase rounded-3 w-100 mb-10">
            
            CONTACT AGENT</button>
      </>
   )
}

export default SidebarInfo
