"use client"
import DropdownTwo from "@/components/search-dropdown/inner-dropdown/DropdownTwo";
import UseShortedProperty from "@/hooks/useShortedProperty";
import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link";
import Image from "next/image";
import ReactPaginate from "react-paginate";

import featureIcon_1 from "@/assets/images/icon/icon_04.svg"
import featureIcon_2 from "@/assets/images/icon/icon_05.svg"
import featureIcon_3 from "@/assets/images/icon/icon_06.svg"
import PropertyCard from "@/components/homes/home-four/PropertyCard";
import Listing from "./Listing";
import { FILTER_TYPE } from "../../../../serveractions/commands/partials/property";
import { useCallback, useEffect, useState } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import Spinner from "@/components/common/Spinner";

const ListingThreeArea = ({ style }: any) => {

   const itemsPerPage = 9;
   const page = "listing_4";

   const {
      itemOffset,
      sortedProperties,
      currentItems,
      pageCount,
      handlePageClick,
      handleBathroomChange,
      handleBedroomChange,
      handleSearchChange,
      handlePriceChange,
      maxPrice,
      priceValue,
      resetFilters,
      selectedAmenities,
      handleAmenityChange,
      handleLocationChange,
      handleStatusChange,
      handleTypeChange,
      handlePriceDropChange
   } = UseShortedProperty({ itemsPerPage, page });

   const handleResetFilter =  () => {
      resetFilters();
   };


   const [filter,setFilter]=useState<FILTER_TYPE>({
      allotmentForIds:[],
      maxPrice:1000000000000000000000000000000000000,
      minPrice:0,
      area:0,
      bhkTypeIds:[],
      furnishingTypeIds:[],
      propertyTypeIds:[],
      title:"",
      description:"",
      facingDirection:"",
      parkingSpace:false,
   })
    const [search,setSearch]=useState('');

    const [budget,setBudget]=useState([0,1000000000]);
    const [area,setArea]=useState([0,100000]);
    
  
    const [properties,setProperties]=useState([]);
    

    const [loading,setLoading]=useState(true);
  
    const getProperty = async () =>{
      setLoading(true);
      const res=await serverActions.property.filter(filter)
      if(res.data.status==200){
         setLoading(false);
        setProperties(res.data.data)
      //   console.log(res.data.data)
      }
    }
  
    // getProperty();
    useEffect(()=>{
      getProperty();
    },[filter])

    const updateFilter = useCallback(
      debounce((budget:any, area:any) => {
        setFilter({ maxPrice: budget[1], minPrice: budget[0], area: area[0] });
      }, 300), // Adjust delay as needed
      []
    );

    useEffect(() => {
      // Call debounced function when budget or area changes
      updateFilter(budget, area);
  
      return () => {
        // Cancel any pending debounce calls on component unmount
        updateFilter.cancel?.();
      };
    }, [budget, area, updateFilter]);


    // Utility function for debouncing
      function debounce(func:any, delay:any) {
         let timeout:any;
         const debounced = (...args:any) => {
         clearTimeout(timeout);
         timeout = setTimeout(() => func(...args), delay);
         };
         debounced.cancel = () => clearTimeout(timeout);
         return debounced;
      }

// console.log(budget,area);

   return (

      <div className={`property-listing-six pb-170 xl-pb-120 ${style ? "pt-150 xl-pt-100" : "pt-10 md-pt-50 mt-150 xl-mt-120 bg-pink-two"}`}>
         <div className="container">
            {!style && <div className="search-wrapper-one layout-one bg position-relative mb-75 md-mb-50">
               <div className="bg-wrapper border-layout">
                  <DropdownTwo
                     handlePriceDropChange={handlePriceDropChange}
                     handleSearchChange={handleSearchChange}
                     handleBedroomChange={handleBedroomChange}
                     handleBathroomChange={handleBathroomChange}
                     handlePriceChange={handlePriceChange}
                     maxPrice={maxPrice}
                     priceValue={priceValue}
                     handleResetFilter={handleResetFilter}
                     selectedAmenities={selectedAmenities}
                     handleAmenityChange={handleAmenityChange}
                     handleLocationChange={handleLocationChange}
                     handleStatusChange={handleStatusChange}
                     
                     filter={filter}
                     setFilter={setFilter}
                     search={search}
                     setSearch={setSearch}
                     budget={budget}
                     setBudget={setBudget}
                     area={area}
                     setArea={setArea}

                  />
               </div>
            </div>}

            <div className="listing-header-filter d-flex justify-content-end align-items-center mb-40 lg-mb-30">
               {/* <div>Showing <span className="color-dark fw-500">{itemOffset + 1}–{itemOffset + currentItems.length}</span> of <span
                  className="color-dark fw-500">{sortedProperties.length}</span> results</div> */}
                  {/* <div></div> */}
               <div className="d-flex align-items-center xs-mt-20">
                  <div className="short-filter d-flex align-items-center">
                     <div className="fs-16 me-2">Short by:</div>
                     <NiceSelect
                        className="nice-select"
                        options={[
                           { value: "newest", text: "Newest" },
                           { value: "best_seller", text: "Best Seller" },
                           { value: "best_match", text: "Best Match" },
                           { value: "price_low", text: "Price Low" },
                           { value: "price_high", text: "Price High" },
                        ]}
                        defaultCurrent={0}
                        onChange={handleTypeChange}
                        name=""
                        placeholder="" />
                  </div>
                  {/* <Link href={`/${style ? "listing_12" : "listing_04"}`} className="tran3s layout-change rounded-circle ms-auto ms-sm-3" data-bs-toggle="tooltip" title="Switch To List View"><i className="fa-regular fa-bars"></i></Link> */}
               </div>
            </div>

            {loading?<Spinner/>:<Listing properties={properties}/>}

            {/* <div className="pt-50 md-pt-20 text-center">
               <ReactPaginate
                  breakLabel="..."
                  nextLabel={<i className="fa-regular fa-chevron-right"></i>}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={pageCount}
                  pageCount={pageCount}
                  previousLabel={<i className="fa-regular fa-chevron-left"></i>}
                  renderOnZeroPageCount={null}
                  className="pagination-two d-inline-flex align-items-center justify-content-center style-none"
               />
            </div> */}
         </div>
      </div>
   )
}

export default ListingThreeArea
