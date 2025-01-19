"use client"
import React, { useState } from "react";
import Pricing from "../dashboard/membership/Pricing";
import Link from "next/link";
import Image from "next/image";
import titleShape from "@/assets/images/shape/title_shape_03.svg";

export default function Subscription() {
	const [userType,setUserType]=useState("BUYER");	

	const userTypes=["BUYER","AGENT","BUILDER"];

  return (
    <div
      className="property-listing-five mt-170 xl-mt-120"
      style={{ backgroundColor: "#F4FAFF", padding: "1rem 0" }}
    >
      <div className="container container-large">
        <div className="position-relative">
          <div className="title-one mb-25 lg-mb-10 wow fadeInUp">
            <h3>
              <span>
                Subsciptions
                <Image src={titleShape} alt="" className="lazy-img" />
              </span>
            </h3>
          </div>

		  <div className="d-md-flex align-items-center justify-content-center flex-column gap-10">
			<div className="d-flex align-items-center justify-content-center gap-10">
				{userTypes.map((item,index)=>(
					<button key={index} className={`btn-six ${userType===item && "active"}`} style={{
						margin:"0.5rem 1rem",
						cursor:"pointer",
						backgroundColor:userType===item?"#0D6EFD":"#fff",
						color:userType===item?"#fff":"#0D6EFD",
						border:"1px solid #0D6EFD"
					}} onClick={()=>setUserType(item)}>{item}</button>
				))}
			</div>
		  <Pricing  showCase={true} userType={userType}/>
		  </div>
        </div>
      </div>
    </div>
  );
}
