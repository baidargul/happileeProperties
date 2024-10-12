
import AgencyFormOne from "@/components/forms/AgencyFormOne"
import MediaGallery from "../listing-details-1/MediaGallery"
import SimilarProperty from "../listing-details-4/SimilarProperty"
import CommonAmenities from "../listing-details-common/CommonAmenities"
import CommonBanner from "../listing-details-common/CommonBanner"
import CommonLocation from "../listing-details-common/CommonLocation"
import CommonNearbyList from "../listing-details-common/CommonNearbyList"
import CommonProPertyScore from "../listing-details-common/CommonProPertyScore"
import CommonPropertyFeatureList from "../listing-details-common/CommonPropertyFeatureList"
import CommonPropertyFloorPlan from "../listing-details-common/CommonPropertyFloorPlan"
import CommonPropertyVideoTour from "../listing-details-common/CommonPropertyVideoTour"
import Sidebar from "../listing-details-1/Sidebar"
import Review from "@/components/inner-pages/agency/agency-details/Review"
import LoginModal from "@/modals/LoginModal"
// import { useState } from "react"
import NiceSelect from "@/ui/NiceSelect"
import { serverActions } from "../../../../serveractions/commands/serverCommands"
import prisma from "../../../../serveractions/commands/prisma"
import { accountStatus, builder } from "@prisma/client"
import Banner from "@/app/builder/[id]/Banner"

const ListingDetailsSixArea = async () => {
      const list:any = await prisma.builder.findMany({
        include: {
          user:{
            include:{
              image:true
            },
            omit:{
               password:true
            }
          },
        },
        orderBy: {
          user: {
            createdAt: "desc",
          },
        },
      });


      // const temp:accountStatus;

      console.log(list[0])
      const images=list[0]?.user?.image;
   if(list.length==0) return

   return (
      <>
         <div className="listing-details-one theme-details-one mt-200 xl-mt-150">
            <div className="container">
               <Banner style_3={true} data={list[0]}/>
               <MediaGallery style={true} images={images}/>
               <div className="row pt-80 lg-pt-50">
                  <div className="col-xl-8">
                     <div className="property-overview bottom-line-dark">
                        <h4 className="mb-20">Description</h4>
                        <p className="fs-20 lh-lg">{list[0]?.description??`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime illum consectetur sint minus! Molestias repellendus quisquam et eum quibusdam provident? Architecto vitae asperiores adipisci consequuntur praesentium aperiam non, illo qui.
                        Sapiente molestias fuga dolorum fugit voluptate corrupti ratione. Similique ipsa ut pariatur dignissimos! Ipsum mollitia, dolor quae beatae quas deleniti quam nobis illo ut quaerat, necessitatibus modi sint deserunt nam!
                        Sed voluptatum rem reprehenderit, nostrum aspernatur nihil hic dolor optio nemo, incidunt sapiente saepe non quo odit, reiciendis maiores minima? Beatae quo maiores provident, cupiditate repellat quidem architecto ratione possimus!
                        Eius eum facere asperiores dolorem iste tempora expedita laudantium, dicta aperiam exercitationem quis. Inventore eos ad dolorum sapiente asperiores odit consectetur, nulla nesciunt accusantium unde voluptate sint, ipsum nemo neque!
                        Obcaecati magni, illum suscipit laborum consectetur tempore deleniti cupiditate! Cupiditate asperiores at, obcaecati iusto voluptas ullam quas minima tempore natus nulla alias exercitationem mollitia architecto atque consectetur maxime itaque maiores!
                        Nostrum at necessitatibus amet impedit fugiat corporis laborum repellendus, ad optio voluptas dolores facere recusandae. Perspiciatis delectus beatae laudantium, facilis deleniti dignissimos blanditiis dolor atque fugiat odit enim eaque molestiae?
                        Eum laudantium reiciendis natus numquam aut inventore, labore suscipit commodi voluptas dolore voluptatem sed id non magnam sunt architecto omnis eaque, autem ipsa provident obcaecati quibusdam dolor quasi? Earum, tenetur.
                        Quas repudiandae, natus quia cumque soluta ducimus! Voluptates rem reiciendis, quis adipisci id minima iure explicabo unde consectetur error, enim iusto vitae corrupti eius magni necessitatibus incidunt assumenda ab. Repudiandae?
                        Fugiat facilis voluptatum saepe possimus vel quidem laudantium nostrum similique inventore nemo minima itaque asperiores voluptatem, magni sequi quos repudiandae nisi, accusamus repellat. Ipsam ducimus rerum possimus ipsa nihil consectetur.
                        Fugiat eaque, impedit, at laudantium quaerat cumque consequatur in possimus asperiores sed enim et, atque sit dolorum quos voluptatibus natus ab odio ipsa officia necessitatibus eius ea quam! Quia, maiores!`}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default ListingDetailsSixArea
