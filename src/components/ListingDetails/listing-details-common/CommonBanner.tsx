import Link from "next/link"

const CommonBanner = ({ style_3,data}: any) => {
   return (
      <div className="row bg-white" style={{borderRadius:'20px',padding:'20px'}}>
         <div className="col-lg-6">
            <h3 className="property-titlee">{data?.title??"Luxury Apartments on California."}</h3>
            <div className="d-flex flex-wrap mt-10">
               <div className={`list-type text-uppercase mt-15 me-3 ${style_3 ? "bg-primary text-white fw-500" : "text-uppercase border-20"}`}>{data?.allotmentFor?.name??"FOR SELL"}</div>
               <div className="address mt-15"><i className="bi bi-geo-alt"></i> {data?.address ??'3891 Ranchview Dr. Richardson, California'}
               </div>
            </div>
         </div>
         <div className="col-lg-6 ">
            <div className="d-flex flex-column align-items-end md-mt-40">
               <div className="price color-dark fw-500 align-self-start align-self-sm-end">{Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(data?.price)}</div>
               <div className="est-price fs-20 mb-35 md-mb-30 align-self-start align-self-sm-end"><span
                  className="fw-500 color-dark">{Intl.NumberFormat("en-IN", {
                     style: "currency",
                     currency: "INR",
                   }).format(data?.maintenance??"4567")}/mo*</span></div>
               <ul className="style-none d-flex align-items-center action-btns">
                  <li className="me-auto fw-500 color-dark"></li>
                  <li className="me-auto color-dark"><small>{data?.views} views</small></li>
                  <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-solid fa-heart" style={{
                           color: "#ff3425",
                        }}></i></Link></li>
                  <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-solid fa-share-nodes" style={{
                           color: "#FFD700",
                        }}></i></Link></li>
                  {/* <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-light fa-circle-plus"></i></Link></li> */}
               </ul>
            </div>
         </div>
      </div>
   )
}

export default CommonBanner
