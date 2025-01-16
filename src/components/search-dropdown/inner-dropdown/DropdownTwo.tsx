import ListingDropdownModal from "@/modals/ListingDropdownModal";
import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link";
import { FILTER_TYPE } from "../../../../serveractions/commands/partials/property";

const DropdownTwo = ({
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
  handleStatusChange,
  handlePriceDropChange,
  search,
  setSearch,
  filter,
  setFilter
}: any) => {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row gx-0 align-items-center">
          <div
            className="col-xl-9"
            style={{
              padding: "0px 15px",
            }}
          >
            <input
              style={{
                width: "100%",
                borderRadius: "10px",
                height: "50px",
                textIndent: "5px",
              }}
              placeholder="Search Property"
              value={filter.title || filter.description}
              onChange={(e)=>setFilter((prev:FILTER_TYPE)=>({
               ...prev,
               title:e.target.value,
               description:e.target.value
              }))}
            />
          </div>
          <div className="col-xl-3">
            <div className="input-box-one lg-mt-20">
              <div className="d-flex align-items-center">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#advanceFilterModal"
                  className="search-modal-btn sm tran3s text-uppercase fw-500 d-inline-flex align-items-center me-3"
                >
                  <i className="fa-light fa-sliders-up"></i>
                </Link>
                <button className="fw-500 text-uppercase tran3s search-btn">
                  Search
                </button>
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
  );
};

export default DropdownTwo;
