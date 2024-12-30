"use client"
import UseShortedProperty from "@/hooks/useShortedProperty";
import Link from "next/link";
import Image from "next/image";
import ReactPaginate from "react-paginate";

import icon from "@/assets/images/icon/icon_46.svg"
import featureIcon_1 from "@/assets/images/icon/icon_04.svg"
import featureIcon_2 from "@/assets/images/icon/icon_05.svg"
import featureIcon_3 from "@/assets/images/icon/icon_06.svg"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import PropertyTableBody from "../properties-list/PropertyTableBody";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/features/userSlice";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useEffect } from "react";

const FavouriteArea = () => {

   const dispatch = useDispatch();

   const userProfile =
     useSelector((state: any) => state.user.userProfile) || {};
 
   const { status,type, id, name, address, description, gst } = userProfile;
 
   const getUserDetails = async () => {
     const response = await serverActions.user.list(id);
     if (response.status === 200) {
       dispatch(userLogin(response.data));
      //  console.log(response)
     }
   };

   useEffect(() => {
     getUserDetails();
   }, []);

   return (
      <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Favorites" />
        <h2 className="main-title d-block d-lg-none">Favorites</h2>
        {/* <div className="d-sm-flex align-items-center justify-content-between mb-25">
          <div className="fs-16">
            Showing <span className="color-dark fw-500">1–5</span> of{" "}
            <span className="color-dark fw-500">40</span> results
          </div>
          <div className="d-flex ms-auto xs-mt-30">
            <div className="short-filter d-flex align-items-center ms-sm-auto">
              <div className="fs-16 me-2">Short by:</div>
              <NiceSelect className="nice-select"
                        options={[
                           { value: "1", text: "Newest" },
                           { value: "2", text: "Best Seller" },
                           { value: "3", text: "Best Match" },
                           { value: "4", text: "Price Low" },
                           { value: "5", text: "Price High" },
                        ]}
                        defaultCurrent={0}
                        onChange={selectHandler}
                        name=""
                        placeholder="" />
            </div>
          </div>
        </div> */}

        <div className="bg-white card-box p0 border-20">
          <div className="table-responsive pt-25 pb-25 pe-4 ps-4">
            <table className="table property-list-table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Date</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <PropertyTableBody data={userProfile?.favouriteProperties} fav={true}/>
            </table>
          </div>
        </div>

        {/* <ul className="pagination-one d-flex align-items-center justify-content-center style-none pt-40">
          <li className="me-3">
            <Link href="#">1</Link>
          </li>
          <li className="selected">
            <Link href="#">2</Link>
          </li>
          <li>
            <Link href="#">3</Link>
          </li>
          <li>
            <Link href="#">4</Link>
          </li>
          <li>....</li>
          <li className="ms-2">
            <Link href="#" className="d-flex align-items-center">
              Last <Image src={icon_1} alt="" className="ms-2" />
            </Link>
          </li>
        </ul> */}
      </div>
    </div>
   )
}

export default FavouriteArea;
