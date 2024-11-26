import ListingDetailsSix from "@/components/ListingDetails/listing-details-6";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Listing Details Six Happilee  ",
};
interface Props{
   id:string
}
const index = (props:Props) => {
   return (
      <Wrapper>
         <ListingDetailsSix id={props.id}/>
      </Wrapper>
   )
}

export default index