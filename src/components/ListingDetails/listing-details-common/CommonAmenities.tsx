const ammenities_data: string[] = ["A/C & Heating", "Garages", "Garden", "Disabled Access", "Swimming Pool", "Parking", "Wifi", "Pet Friendly", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"]

const CommonAmenities = ({data}: any) => {
   return (
      <>
         <h4 className="mb-20">Amenities</h4>
         <p className="fs-20 lh-lg pb-25">Enjoy World-Class Amenities Designed for Your Comfort and Convenience</p>
         <ul className="style-none d-flex flex-wrap justify-content-between list-style-two">
            {data&&data.map((list: any, i: number) => (
               <li style={{textTransform: "capitalize"}} key={i}>{list.amenities.name}</li>
            ))}
         </ul>
      </>
   )
}

export default CommonAmenities
