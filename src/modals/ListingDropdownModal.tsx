import PriceRange from "@/components/common/PriceRange"
import NiceSelect from "@/ui/NiceSelect"
import Link from "next/link"

const ammenities_data: string[] = ["A/C & Heating", "Garages", "Garden", "Disabled Access", "Swimming Pool", "Parking", "Wifi", "Pet Friendly", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"]


const ListingDropdownModal = ({
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
   return (
      <div className="modal fade" id="advanceFilterModal" tabIndex={-1} aria-hidden="true" style={{
         zoom:1
      }}
      >
         <div className="modal-dialog modal-dialog-centered">
            <div className="container">
               <div className="row">
                  <div className="col-xl-8 m-auto">
                     <div className="modal-content">
                        <button type="button" className="btn-close ms-auto mt-20 me-4" data-bs-dismiss="modal" aria-label="Close"><i className="fa-regular fa-xmark"></i></button>
                        <div className="advance-search-panel">
                           <div className="main-bg border-0">
                              <form onSubmit={(e) => e.preventDefault()}>
                                 <div className="row gx-lg-5">
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Allotment Type</div>
                                          <NiceSelect className="nice-select fw-normal"
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
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Property Type</div>
                                          <NiceSelect className="nice-select fw-normal"
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
                                    <div className="col-md-6 mb-35">
                                       <h6 className="block-title fw-bold mt-45 mb-20">Budget</h6>
                                       <div className="price-ranger">
                                          <div className="price-input d-flex align-items-center justify-content-between pt-5">
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
                                    </div>
                                    <div className="col-md-6 mb-35">
                                       <h6 className="block-title fw-bold mt-45 mb-20">Area</h6>
                                       <div className="price-ranger">
                                          <div className="price-input d-flex align-items-center justify-content-between pt-5">
                                             <div className="field d-flex align-items-center">
                                                <input type="number" className="input-min" value={priceValue[0]} onChange={() => handlePriceChange} />
                                             </div>
                                             <div className="divider-line"></div>
                                             <div className="field d-flex align-items-center">
                                                <input type="number" className="input-max" value={priceValue[0]} onChange={() => handlePriceChange} />
                                             </div>
                                             <div className="currency ps-1">SQFT</div>
                                          </div>
                                       </div>
                                       <PriceRange
                                          MAX={maxPrice}
                                          MIN={0}
                                          STEP={1}
                                          values={priceValue}
                                          handleChanges={handlePriceChange}
                                       />
                                    </div>
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Number of Bedrooms</div>
                                          <NiceSelect className="nice-select location fw-normal"
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
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Furnishing Type</div>
                                          <NiceSelect className="nice-select location fw-normal"
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
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Facing Direction</div>
                                          <NiceSelect className="nice-select location fw-normal"
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
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Parking Spot</div>
                                          <NiceSelect className="nice-select location fw-normal"
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
                                    <div className="col-md-6">                                       
                                       <div className="col-12">
                                          <button className="fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25">
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
                                             {/* <Link href="#" className="tran3s">
                                                <i className="fa-regular fa-star"></i>
                                                <span>Save Search</span>
                                             </Link> */}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ListingDropdownModal
