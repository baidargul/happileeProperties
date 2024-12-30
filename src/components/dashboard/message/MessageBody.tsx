"use client";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import MailOffcanvas from "./MailOffcanvas";
import Link from "next/link";
import Image from "next/image";
import EmailReadPanel from "./EmailReadPanel";
import OpenEmail from "./OpenEmail";
import LeadCard from "./LeadCard";

import icon_1 from "@/assets/images/dashboard/icon/icon_26.svg";
import icon_2 from "@/assets/images/dashboard/icon/icon_27.svg";
import icon_3 from "@/assets/images/dashboard/icon/icon_43.svg";
import Fancybox from "@/components/common/Fancybox";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useEffect, useState } from "react";

const MessageBody =  () => {
  const style = false;

  const [leadData,setLeadData] = useState([]);

const getLeads = async () => {
  const res = await serverActions.leads.listAll();
  if(res.status==200){
    setLeadData(res.data);
  }
};

useEffect(() => {
  getLeads();
}, []);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Message" />

        <div className="container">
         {leadData.length>0?leadData.map((item:any)=>(
          <LeadCard
            key={item.id}
            data={item}
            name="Kingslie Ferreira"
            phone="+91 8308715385"
            timestamp="4 Oct '24, 1:13 pm"
            propertyTitle="Beautiful Family House"
            address="123 Main St, Los Angeles, CA"
            price="500,000"
            style={false}
          />
         )):<p>No Leads Found</p>}
        </div>

        {/* <div className="message-pagination d-flex align-items-center justify-content-between md-mt-40">
          <Link href="#" className="prev-msg">
            <Image src={icon_1} data-src="ima" alt="" className="lazy-img" />
          </Link>
          <div className="d-flex align-items-center">
            <Link href="#">
              <i className="bi bi-chevron-left"></i>
            </Link>
            <span>1-5 of 120</span>
            <Link href="#">
              <i className="bi bi-chevron-right"></i>
            </Link>
          </div>
          <Link href="#" className="next-msg">
            <Image
              src={icon_2}
              data-src="images/icon/icon_27.svg"
              alt=""
              className="lazy-img"
            />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default MessageBody;
