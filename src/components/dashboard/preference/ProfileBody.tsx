"use client";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/forms/reactHookInputs/FormInput";
import { useEffect, useState } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import SelectionCard from "./SelectionCard";
import Spinner from "@/components/common/Spinner";
import { userLogin } from "@/redux/features/userSlice";

interface RootState {
  user: any;
}

const ProfileBody = () => {
  const dispatch = useDispatch();

  const userProfile =
    useSelector((state: RootState) => state.user.userProfile) || {};

  const [propertyData,setPropertyData]=useState<any>([]);
  const [amenityData,setAmenityData]=useState([]);

  const [propertyType,setPropertyType]=useState([]);
  const [amenityType,setAmenityType]=useState([]);

    useEffect(()=>{
          const array1=userProfile?.preferences?.propertyTypePreference.map((item:any)=>({
              id: item?.propertyType?.id,
              name:item?.propertyType?.name ,
              allotmentTypeId: item?.propertyType?.allotmentTypeId,
              allotmentType: {
                  id: item?.propertyType?.allotmentType?.id,
                  name: item?.propertyType?.allotmentType?.name
              }
          }))
          if(array1.length>0){
              setPropertyType(array1);
          }

          const array2=userProfile?.preferences?.amenityPreference.map((item:any)=>({
              id:item?.amenities?.id ,
              name:item?.amenities?.name,
              groupId: item?.amenities?.groupId
        }))
        console.log(array2)
        if(array2.length>0){
            setAmenityType(array2);
        }
    },[userProfile?.preferences?.amenityPreference,userProfile?.preferences?.propertyTypePreference])

  const formSchema = z
    .object({
      location: z.string().min(1, { message: "Location is required" }),
      minBudget: z
        .string()
        .min(1, { message: "Minimum budget is required" })
        .refine((value) => /^[0-9]+$/.test(value), {
          message: "Minimum budget must be a valid number",
        }),
      maxBudget: z
        .string()
        .min(1, { message: "Maximum budget is required" })
        .refine((value) => /^[0-9]+$/.test(value), {
          message: "Maximum budget must be a valid number",
        }),
      // propertyType: z
      //   .array(z.string())
      //   .min(1, { message: "At least one property type is required" }),
      // amenities: z
      //   .array(z.string())
      //   .min(1, { message: "At least one amenity is required" }),
    })
    .refine(
      (data) => parseFloat(data.minBudget) <= parseFloat(data.maxBudget),
      {
        message: "Minimum budget cannot exceed maximum budget",
        path: ["minBudget"], // Optional: Highlight `minBudget` specifically in errors.
      }
    );

  const { control, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      location: userProfile?.preferences?.location??"",
      minBudget: userProfile?.preferences?.minBudget??"",
      maxBudget: userProfile?.preferences?.maxBudget??"",
      // propertyType: [],
      // amenities: [],
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = formState;

  // Example submit function
  const onSubmit = async (data: any) => {
    if ( !propertyType.length || !amenityType.length) {
      toast.error("Please select at least one property type and amenity.");
      return;
    }
    const res = await   serverActions.buyer.savePreferences(userProfile?.id,data.location,data.minBudget,data.maxBudget,propertyType,amenityType);
    if(res.data.status===200){
      toast.success("Preferences saved successfully");
      dispatch(userLogin(res.data.data));
    }
  };

  const getPropertyStructure = async () => {
    const res = await serverActions.property.GET_ALLOTMENT_STRUCTURE();
    if (res.status == 200) {
      setPropertyData(res.data);
    }
  };

  const getAmmenities = async () => {
    const res = await serverActions.property.Amenities.group.listAll();
    if (res.status == 200) {
      setAmenityData(res.data);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyStructure();
    getAmmenities();
  }, []);


  console.log(amenityType);
  
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Profile" />
        <h2 className="main-title d-block d-lg-none">Profile</h2>
        <div className="bg-white card-box border-20">
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-md-12">
              <FormInput
                label={"Location*"}
                className="custom-class"
                control={control}
                name="location"
                type="text"
                isRequired={true}
                placeholder="Enter the location"
              />
            </div>
            <div className="col-md-6">
              <FormInput
                label={"Minimum Budget*"}
                className="custom-class"
                control={control}
                name="minBudget"
                type="number"
                isRequired={true}
                placeholder="Enter minimum budget"
              />
            </div>

            <div className="col-md-6">
              <FormInput
                label={"Maximum Budget*"}
                className="custom-class"
                control={control}
                name="maxBudget"
                type="number"
                isRequired={true}
                placeholder="Enter maximum budget"
              />
            </div>
            <div className="d-flex align-items-center justify-content-start flex-column  mt-3" style={{
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
                          {propertyData?.lookingFor?.propertyType.length>0?propertyData?.lookingFor?.propertyType.map((item: any) => (
                              <SelectionCard
                              key={item.id}
                              selectedItems={propertyType}
                              setSelectedItems={setPropertyType}
                              item={item} // Pass the entire object
                              multiSelect={true}
                                className="text-capitalize"
                              />
                            )):<Spinner/>}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start flex-column  mt-3" style={{
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
                          Ameinities*
                        </p>
                        <div className="w-100 row gap-3">
                          {amenityData.length>0?amenityData?.map((item: any,index:number) => (
                              <div key={index}>
                                {item?.name && <p className="text-capitalize" style={{
                            fontSize: "15px",
                            fontWeight: 500,
                            textAlign: "left",
                            width: "100%",
                            color: "#000",
                          }}>{item?.name}</p>}
                                <div className="w-100 row gap-3">
                                  {item?.amenities?.map((item: any) => (
                                    <SelectionCard
                                      key={item.id}
                                      selectedItems={amenityType}
                                      setSelectedItems={setAmenityType}
                                      item={item} // Pass the entire object
                                      multiSelect={true}
                                      className="text-capitalize"
                                    />
                                  ))}
                                  </div>
                              </div>
                            )):<Spinner/>}
                        </div>
                      </div>

            <div className="d-flex justify-content-between col-md-12 mt-3">
              <button
                disabled={isSubmitting}
                type="submit"
                className="dash-btn-two tran3s me-3 w-25"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-2"></span>
                )}
                {isSubmitting ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
