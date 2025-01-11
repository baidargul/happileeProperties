import NiceSelect from "@/ui/NiceSelect";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useEffect, useState } from "react";
import { set } from "js-cookie";
import SelectionCard from "./SelectionCard";
import FormInput from "@/components/forms/reactHookInputs/FormInput";
import FormTextArea from "@/components/forms/reactHookInputs/FormTextArea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelectInput from "@/components/forms/reactHookInputs/FormSelectInput";
import ImagePicker from "@/components/ImagePicker/ImagePicker";
import {
  allotmentFor,
  allotmentType,
  amenities,
  bhk,
  propertyType,
} from "@prisma/client";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SingleSelectInput from "@/components/forms/inputs/SingleSelectInput";
import {
  commercialPropertySpecific,
  convenienceAndServices,
  environmentalAndSustainability,
  generalBuildingAmenities,
  healthAndWellness,
  lifestyleAndRecreation,
  parkingAndTransportation,
  safetyAndSecurity,
  specialPropertyFeatures,
  sportsAndOutdoors,
} from "@/data/home-data/AmenitiesData";
import SidebarInfo from "@/components/ListingDetails/listing-details-sidebar.tsx/SidebarInfo";


type Amenity = {
  id: string;
  name: string;
};


const Overview = () => {
  const selectHandler = (e: any) => {};

  // const rest = async () =>{
  //   const res = await serverActions.property.initializeDefaults();
  //   console.log(res)
  // }

  // useEffect(() => {
  //   rest()
  // },[])
  const [data, setData] = useState<any>([]);
  const [allotment, setAllotment] = useState<allotmentType | null>(null);
  const [lookingFor, setLookingFor] = useState<allotmentFor | null>(null);
  const [propertyType, setPropertyType] = useState<propertyType | null>(null);
  const [bhk, setBhk] = useState<bhk | null>(null);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [amenitiesData, setAmenitiesData] = useState<Amenity[]>([]);
  const [selectedImageArray, setSelectedImageArray] = useState([]);
  const [removedImageArray, setRemovedImageArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state: any) => state.user.userProfile.id);

  const getPropertyStructure = async () => {
    const res = await serverActions.property.GET_ALLOTMENT_STRUCTURE();
    if (res.status == 200) {
      setData(res.data);
    }
  };

  const getAmmenities = async () => {
    const res = await serverActions.property.Amenities.group.listAll();
    if (res.status == 200) {
      setAmenitiesData(res.data);
    }
  };

  // const temp

  useEffect(() => {
    getPropertyStructure();
    getAmmenities();
  }, []);

  const formSchema = z.object({
    // allotmentType: z.string().min(1, { message: "Allotment type is required" }),
    // allotmentFor: z.string().min(1, { message: "Allotment for is required" }),
    // propertyType: z.string().min(1, { message: "Property type is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    city: z.string().min(1, { message: "City is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    // bhk: z.string().min(1, { message: "BHK is required" }),
    area: z.string().min(1, { message: "Area is required" }),
    propertyAge: z.string().min(1, { message: "Property Age is required" }),
    furnishing: z.string().min(1, { message: "Furnishing is required" }),
    // amenities: z.array(z.string()).optional(),
    price: z.string().min(1, { message: "Price is required" }),
    securityDeposit: z.string().min(1, { message: "Security Deposit is required" }),
    rent: z.string().optional(),
    maintenance: z.string().min(1, { message: "Maintenance is required" }),
    availableDate: z.string().min(1, { message: "Available Date is required" }),
    ownerShipType: z.string().min(1, { message: "OwnerShip Type is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    builtupArea: z.string().min(1, { message: "Builtup Area is required" }),
    carpetArea: z.string().min(1, { message: "Carpet Area is required" }),
    floorNumber: z.string().min(1, { message: "Floor Number is required" }),
    totalFloorsInBuilding: z.string().min(1, { message: "Total Floors In Building is required" }),
    facingDirection: z.string().min(1, { message: "Facing Direction is required" }),
    parkingSpace: z.string().min(1, { message: "Parking Space is required" }),

    // propertyImages: z.array(z.string()).optional(),
  });

  // Set up the form with default values
  const { control, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      title: "",
      city: "",
      location: "",
      bhk: "",
      area: "",
      propertyAge: "",
      furnishing: "",
      amenities: [],
      price: "",
      securityDeposit: "",
      rent: "",
      maintenance: "",
      availableDate: "",
      ownerShipType: "",
      description: "",
      address: "",
      builtupArea:"",
      carpetArea:"",
      floorNumber:"",
      totalFloorsInBuilding:"",
      facingDirection:"",
      parkingSpace:"",

    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = formState;

  const onSubmit = async (data: any) => {
    setLoading(true);
    // Process form data here
    data.allotmentType = allotment?.id;
    data.allotmentFor = lookingFor?.id;
    data.propertyType = propertyType?.id;
    data.bhk = bhk?.id;
    data.amenities = amenities;
    data.userId = userId;
    console.log(data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]: [string, any]) => {
      if (Array.isArray(value)) {
        // If the value is an array, append each item individually (e.g., for `amenities`)
        // value.forEach((item) => {
        //   formData.append(`${key}[]`, item);
        // });
        formData.append(key, JSON.stringify(value));
      } else {
        // Otherwise, just append the value
        formData.append(key, value);
      }
    });

    selectedImageArray?.forEach((imageFile, index) => {
      formData.append(`images`, imageFile);
    });

    // console.log("Form Data:", data);

    const response = await serverActions.property.create(formData);
    // console.log(response);
    if (response.status == 200) {
      setLoading(false);
      // console.log(response.data);
      toast.success("Property added successfully");
      window.location.reload();
    }
  };

  // console.log(propertyType);
  console.log(amenities)
  return (
    data?.furnishing?.length > 0 && (
      <div className="bg-white card-box border-20">
        <h4 className="dash-title-three">Add Property</h4>

        <div className="container mb-3">
          {/* Allotment Type Section */}
          <div className="d-flex align-items-center justify-content-start flex-column mt-3">
            <p
              style={{
                fontSize: "15px",
                fontWeight: 500,
                textAlign: "left",
                width: "100%",
                color: "#000",
              }}
            >
              Property type*
            </p>
            <div className="w-100 row gap-3">
              {data?.allotmentType?.map((item: allotmentType) => (
                <SelectionCard
                  key={item.id}
                  setItem={() => {
                    setAllotment(item)
                    setBhk(null)
                    setLookingFor(null)
                    setPropertyType(null)
                  }}
                  item={allotment ? allotment.id : ""}
                  name={item.name}
                  id={item.id}
                  className="text-capitalize"
                />
              ))}
            </div>
          </div>

          {/* Looking For Section */}
          <div className="d-flex align-items-center justify-content-start flex-column mt-3">
            <p
              style={{
                fontSize: "15px",
                fontWeight: 500,
                textAlign: "left",
                width: "100%",
                color: "#000",
              }}
            >
              Looking to*
            </p>
            <div className="w-100 row gap-3">
              {data?.lookingFor?.allotmentFor?.map((item: allotmentFor) => (
                <SelectionCard
                  key={item.id}
                  setItem={() => setLookingFor(item)}
                  item={lookingFor?.id ?? ""}
                  name={item.name}
                  id={item.id}
                  className="text-capitalize"
                />
              ))}
            </div>
          </div>

          {/*Property Type Section */}
          {data?.lookingFor?.propertyType
                ?.filter(
                  (item: propertyType) => item.allotmentTypeId === allotment?.id
                ).length > 0 && <div className="d-flex align-items-center justify-content-start flex-column  mt-3" style={{
                  flexWrap: "wrap",
                  textWrap: "nowrap",
                }}>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 500,
                textAlign: "left",
                width: "100%",
                color: "#000",
              }}
            >
              Property type*
            </p>
            <div className="w-100 row gap-3">
              {data?.lookingFor?.propertyType
                ?.filter(
                  (item: propertyType) => item.allotmentTypeId === allotment?.id
                )
                .map((item: any) => (
                  <SelectionCard
                    key={item.id}
                    setItem={() => setPropertyType(item)}
                    item={propertyType?.id ?? ""}
                    name={item.name}
                    id={item.id}
                    className="text-capitalize"
                  />
                ))}
            </div>
          </div>}

          {/*BHK Section */}
          {allotment?.name?.toLowerCase() === "residential" && (
            <div className="d-flex align-items-center justify-content-start flex-column mt-3">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  textAlign: "left",
                  width: "100%",
                  color: "#000",
                }}
              >
                BHK*
              </p>
              <div className="w-100 row gap-3">
                {data?.bhk?.map((item: bhk) => (
                  <SelectionCard
                    key={item.id}
                    setItem={() => setBhk(item)}
                    item={bhk?.id ?? ""}
                    name={item.name}
                    id={item.id}
                    className="text-uppercase"
                  />
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="row mt-3">
            <FormInput
              type="text"
              label={"Title"}
              control={control}
              name="title"
              placeholder="Enter title for your property"
            />
            <div className="col-md-6">
              <FormInput
                type="text"
                label={"City"}
                control={control}
                name="city"
                placeholder="City name"
              />
            </div>
            <div className="col-md-6">
              <FormInput
                type="text"
                label={"Location"}
                control={control}
                name="location"
                placeholder="Location details"
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Area"}
                control={control}
                name="area"
                placeholder="e.g., 2137"
                addOn={{
                  position:'right',
                  label:"Sqft"
                }}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Built-up Area"}
                control={control}
                name="builtupArea"
                placeholder="e.g., 2137"
                addOn={{
                  position:'right',
                  label:"Sqft"
                }}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Carpet Area"}
                control={control}
                name="carpetArea"
                placeholder="e.g., 2137"
                addOn={{
                  position:'right',
                  label:"Sqft"
                }}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Floor Number"}
                control={control}
                name="floorNumber"
                placeholder="1,2,3.."
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Total Floors in Building"}
                control={control}
                name="totalFloorsInBuilding"
                placeholder="10,20,30.."
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Property Age"}
                control={control}
                name="propertyAge"
                placeholder="e.g., 2 years"
              />
            </div>
            <div className="col-md-4">
              <FormSelectInput
                options={[
                  { id: 'East', name: 'East' },
                  { id: 'West', name: 'West' },
                  { id: 'North', name: 'North' },
                  { id: 'South', name: 'South' },
                  { id: 'North-East', name: 'North-East' },
                  { id: 'North-West', name: 'North-West' },
                  { id: 'South-East', name: 'South-East' },
                  { id: 'South-West', name: 'South-West' },
                ]}
                label={"Facing"}
                control={control}
                name="facingDirection"
                placeholder="Facing Direction"
              />
            </div>
            <div className="col-md-4">
              <FormSelectInput
                options={data?.furnishing}
                label={"Furnishing"}
                control={control}
                name="furnishing"
                placeholder="Fully Furnished"
              />
            </div>
            <div className="col-md-4">
              <FormSelectInput
                options={[
                  { id: 'None', name: 'None' },
                  { id: '1 Spot', name: '1 Spot' },
                  { id: '2 Spots', name: '2 Spots' },
                  { id: '3 Spots', name: '3 Spots' },
                  { id: '4+ Spots', name: '4+ Spots' },
                ]}
                label={"Parking Space"}
                control={control}
                name="parkingSpace"
                placeholder="Parking Space"
              />
            </div>
            {amenitiesData?.map((item:any)=>(
              <div key={item.id} className="col-md-4">
              <SingleSelectInput
                options={item.amenities}
                label={item.name}
                placeholder="Select"
                selectHandler={(selectedItems: any) => {
                  // Check for duplicates before updating
                  setAmenities((prev: any) => {
                    const updatedAmenities = [...prev, ...selectedItems];
                    
                    // Remove duplicates based on `id`
                    return updatedAmenities.filter(
                      (value, index, self) =>
                        index === self.findIndex((t) => t.id === value.id)
                    );
                  });
                }}
                multiSelect={true}
              />
            </div>        
            ))}
            {/* <div className="col-md-4">
              <SingleSelectInput
                options={generalBuildingAmenities}
                label={"General Building Amenities"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={lifestyleAndRecreation}
                label={"Lifestyle and Recreation"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={sportsAndOutdoors}
                label={"Sports and Outdoors"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={environmentalAndSustainability}
                label={"Environmental and Sustainability"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={healthAndWellness}
                label={"Health and Wellness"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={convenienceAndServices}
                label={"Convenience and Services"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={parkingAndTransportation}
                label={"Parking and Transportation"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={specialPropertyFeatures}
                label={"Special Property Features"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={safetyAndSecurity}
                label={"Safety and Security"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div>

            <div className="col-md-4">
              <SingleSelectInput
                options={commercialPropertySpecific}
                label={"Commercial Property Specific"}
                placeholder="Select"
                selectHandler={(e:any) => setAmenities((prev:any) => [...prev, e])}
                multiSelect={true}
              />
            </div> */}

            {/* {allotment?.name?.toLowerCase() === "residential" && (
              <div className="d-flex align-items-center justify-content-start flex-column mt-3 mb-3">
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    textAlign: "left",
                    width: "100%",
                    color: "#000",
                  }}
                >
                  Amenities*
                </p>
                <div className="w-100 row gap-2">
                  {data?.amenities?.slice(0, 9).map((item: any) => (
                    <div
                      key={item.id}
                      className={`border border-2 col-1 d-flex align-items-center justify-content-center ${
                        amenities?.some(
                          (amenity: amenities) => amenity.id === item.id
                        )
                          ? "bg-primary text-white"
                          : ""
                      } rounded-2 text-center p-2`}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        height: "2.5rem",
                      }}
                      onClick={() =>
                        setAmenities(
                          (prev: any) =>
                            prev.some(
                              (amenity: amenities) => amenity.id === item.id
                            )
                              ? prev.filter(
                                  (amenity: amenities) => amenity.id !== item.id
                                ) // Remove if already selected
                              : [...prev, item] // Add if not selected
                        )
                      }
                    >
                      <p className={`mb-0 fs-6 fw-normal text-capitalize`}>
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Price"}
                control={control}
                name="price"
                placeholder="Enter price"
                addOn={{
                  position:'left',
                  label:"₹"
                }}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Security Deposit"}
                control={control}
                name="securityDeposit"
                placeholder="Enter deposit"
                addOn={{
                  position:'left',
                  label:"₹"
                }}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="number"
                label={"Maintenance"}
                control={control}
                name="maintenance"
                placeholder="Maintenance charges"
                addOn={{
                  position:'left',
                  label:"₹"
                }}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="date"
                label={"Available Date"}
                control={control}
                name="availableDate"
                placeholder="Availability"
              />
            </div>
            <div className="col-md-4">
              <FormSelectInput
                options={data?.ownership}
                label={"Ownership Type"}
                control={control}
                name="ownerShipType"
                placeholder="Freehold, Leasehold, etc."
              />
            </div>
            <div className="col-md-12">
              <FormTextArea
                rows={5}
                type="text"
                label={"Property Description"}
                control={control}
                name="description"
                placeholder="Enter description about property"
              />
            </div>
            <ImagePicker
              selectedImageArray={selectedImageArray}
              setSelectedImageArray={setSelectedImageArray}
              setRemovedImageArray={setRemovedImageArray}
              label={"Images*"}
            />
            <button type="submit" className="dash-btn-two tran3s me-3 w-25">
              {(isSubmitting || loading) && (
                <span className="dash-spinner spinner-one"></span>
              )}
              {isSubmitting || loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
        {/* <div className="dash-input-wrapper mb-30">
        <label htmlFor="">Description*</label>
        <textarea
          className="size-lg"
          placeholder="Write about property..."
        ></textarea>
      </div>
      <div className="row align-items-end">
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Category*</label>
            <NiceSelect
              className="nice-select"
              options={[
                { value: "1", text: "Apartments" },
                { value: "2", text: "Condos" },
                { value: "3", text: "Houses" },
                { value: "4", text: "Industrial" },
                { value: "5", text: "Villas" },
              ]}
              defaultCurrent={0}
              onChange={selectHandler}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Listed in*</label>
            <NiceSelect
              className="nice-select"
              options={[
                { id: "1", name: "All Listing" },
                { id: "2", name: "Buy" },
                { id: "3", name: "Sell" },
                { id: "4", name: "Rent" },
              ]}
              defaultCurrent={0}
              onChange={selectHandler}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Price*</label>
            <input type="text" placeholder="Your Price" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Yearly Tax Rate*</label>
            <input type="text" placeholder="Tax Rate" />
          </div>
        </div>
      </div> */}
      </div>
    )
  );
};

export default Overview;
