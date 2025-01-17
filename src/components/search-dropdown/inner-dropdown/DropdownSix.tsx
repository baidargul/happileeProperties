import NiceSelect from "@/ui/NiceSelect"
import PriceRange from "../../common/PriceRange";
import Link from "next/link";
import ListingDropdownModal from "@/modals/ListingDropdownModal";

const ammenities_data: string[] = ["A/C & Heating", "Garages", "Garden", "Disabled Access", "Swimming Pool", "Parking", "Wifi", "Pet Friendly", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"]

const DropdownSix = ({
   handleBathroomChange,
   handleBedroomChange,
   handleSearchChange,
   handlePriceChange,
   maxPrice,
   priceValue,
   handleResetFilter,
   selectedAmenities,
   handleAmenityChange,
   handleLocationChange,
   handleStatusChange, }: any) => {

   const selectHandler = (e: any) => { };

   return (
      <>
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
               <div className="col-12">
                  <div className="input-box-one border-0 mb-15">
                     <div className="label2">Type</div>
                     <NiceSelect className="nice-select fw-normal box-style"
                        options={[
                           { value: "apartments", text: "Buy Apartments" },
                           { value: "condos", text: "Rent Condos" },
                           { value: "houses", text: "Sell Houses" },
                           { value: "industrial", text: "Rent Industrial" },
                           { value: "villas", text: "Sell Villas" },
                        ]}
                        defaultCurrent={0}
                        onChange={handleStatusChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-12">
                  <div className="input-box-one border-0 mb-15">
                     <div className="label2">Keyword</div>
                     <input onChange={handleSearchChange} type="text" placeholder="Ex: home, villa" className="type-input box-style" />
                  </div>
               </div>
               <div className="col-12">
                  <div className="input-box-one border-0 mb-15">
                     <div className="label2">Location</div>
                     <NiceSelect className="nice-select location fw-normal box-style"
                        options={[
                           { value: "mumbai", text: "Bandra, Mumbai" },
                           { value: "kolkata", text: "Salt Lake, Kolkata" },
                           { value: "bangalore", text: "Koramangala, Bangalore" },
                           { value: "delhi", text: "Connaught Place, Delhi" },
                           { value: "jaipur", text: "Malviya Nagar, Jaipur" },
                           { value: "chennai", text: "T. Nagar, Chennai" },
                           { value: "hyderabad", text: "Banjara Hills, Hyderabad" },
                        ]
                        }
                        defaultCurrent={0}
                        onChange={handleLocationChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-sm-6">
                  <div className="input-box-one border-0 mb-40 sm-mb-20">
                     <div className="label2">Bed</div>
                     <NiceSelect className="nice-select fw-normal box-style"
                        options={[
                           { value: "0", text: "Any" },
                           { value: "1", text: "1+" },
                           { value: "2", text: "2+" },
                           { value: "3", text: "3+" },
                           { value: "4", text: "4+" },
                        ]}
                        defaultCurrent={0}
                        onChange={handleBedroomChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-sm-6">
                  <div className="input-box-one border-0 mb-40 sm-mb-20">
                     <div className="label2">Bath</div>
                     <NiceSelect className="nice-select fw-normal box-style"
                        options={[
                           { value: "0", text: "Any" },
                           { value: "1", text: "1+" },
                           { value: "2", text: "2+" },
                           { value: "3", text: "3+" },
                           { value: "4", text: "4+" },
                        ]}
                        defaultCurrent={0}
                        onChange={handleBathroomChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-12">
                  <h6 className="block-title fw-bold mb-30">Amenities</h6>
                  <ul className="style-none d-flex flex-wrap justify-content-between filter-input">
                     {ammenities_data.map((list, i) => (
                        <li key={i}>
                           <input
                              type="checkbox"
                              name="Amenities"
                              value={list}
                              checked={selectedAmenities.includes(list)}
                              onChange={handleAmenityChange}
                           />
                           <label>{list}</label>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="col-12">
                  <h6 className="block-title fw-bold mt-40 mb-15">Price range</h6>
                  <div className="price-ranger">
                     <div className="price-input style-two d-flex align-items-center justify-content-end pt-5">
                        <div className="field d-flex align-items-center">
                           <input type="number" className="input-min" value={priceValue[0]} onChange={() => handlePriceChange} />
                        </div>
                        <div className="divider-line"></div>
                        <div className="field d-flex align-items-center">
                           <input type="number" className="input-max" value={priceValue[1]} onChange={() => handlePriceChange} />
                        </div>
                        <div className="currency ps-1">INR</div>
                     </div>
                  </div>
                  <PriceRange
                     MAX={maxPrice}
                     MIN={0}
                     STEP={1}
                     values={priceValue}
                     handleChanges={handlePriceChange}
                  />
                  <div className="col-12">
                     <div className="input-box-one border-0 mb-35 mt-35">
                        <div className="label2">Min Year Built</div>
                        <NiceSelect className="nice-select fw-normal box-style"
                           options={[
                              { value: "0", text: "2020" },
                              { value: "1", text: "2019" },
                              { value: "2", text: "2018" },
                              { value: "3", text: "2017" },
                              { value: "4", text: "2016" },
                           ]}
                           defaultCurrent={0}
                           onChange={selectHandler}
                           name=""
                           placeholder="" />
                     </div>
                  </div>
                  <div className="col-12">
                     <h6 className="block-title fw-bold mb-20">SQFT</h6>
                     <div className="d-flex align-items-center sqf-ranger">
                        <input type="text" placeholder="Min" className="rounded-0" />
                        <div className="divider"></div>
                        <input type="text" placeholder="Max" className="rounded-0" />
                     </div>
                  </div>
                  <div className="col-12">
                     <button className="fw-500 text-uppercase tran3s apply-search w-100 rounded-0 mt-40 mb-25">
                        <i className="fa-light fa-magnifying-glass"></i>
                        <span>Search</span>
                     </button>
                  </div>
                  <div className="col-12">
                     <div className="d-flex justify-content-between form-widget">
                        <a onClick={handleResetFilter} style={{ cursor: "pointer" }} className="tran3s">
                           <i className="fa-regular fa-arrows-rotate"></i>
                           <span>Reset Filter</span>
                        </a>
                        <Link href="#" className="tran3s">
                           <i className="fa-regular fa-star"></i>
                           <span>Save Search</span>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </form>
         <ListingDropdownModal
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
         />
      </>
   )
}

export default DropdownSix
