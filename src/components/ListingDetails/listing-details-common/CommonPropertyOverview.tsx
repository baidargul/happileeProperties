import Image, { StaticImageData } from "next/image"

import icon_1 from "@/assets/images/icon/icon_47.svg"
import icon_2 from "@/assets/images/icon/icon_48.svg"
import icon_3 from "@/assets/images/icon/icon_49.svg"
import icon_4 from "@/assets/images/icon/icon_19.svg"
import icon_5 from "@/assets/images/icon/icon_51.svg"

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
}[];


const CommonPropertyOverview = ({property}) => {
   const property_overview_data: DataType[] = [
      {
         id: 1,
         icon: icon_1,
         title: `Sqft . ${property.area}`,
      },
      {
         id: 2,
         icon: icon_2,
         title: `BHK. ${property.bhkType.name}`,
      },
      {
         id: 3,
         icon: icon_3,
         title: `${property.furnishing.name}`,
      },
      {
         id: 4,
         icon: icon_4,
         title: `${property.propertyType.allotmentType.name}`,
      },
      {
         id: 5,
         icon: icon_5,
         title: `${property?.propertyType?.name}`,
      },
   ]

   return (
      <ul className="style-none d-flex flex-wrap align-items-center justify-content-between">
         {property_overview_data.map((item) => (
            <li key={item.id}>
               <Image src={item.icon} alt="" className="lazy-img icon" />
               <span className="fs-20 color-dark" style={{
                  textTransform: "capitalize"
               }}>{item.title}</span>
            </li>
         ))}
      </ul>
   )
}

export default CommonPropertyOverview
