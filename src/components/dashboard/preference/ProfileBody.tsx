"use client";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/forms/reactHookInputs/FormInput";
import { useEffect, useState } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/features/userSlice";
import { toast } from "sonner";

interface RootState {
  user: any;
}

const ProfileBody = () => {

  const userProfile =
    useSelector((state: RootState) => state.user.userProfile) || {};

  console.log(userProfile);

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
      propertyType: z
        .array(z.string())
        .min(1, { message: "At least one property type is required" }),
      amenities: z
        .array(z.string())
        .min(1, { message: "At least one amenity is required" }),
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
      location: "",
      minBudget: "",
      maxBudget: "",
      propertyType: [],
      amenities: [],
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = formState;

  // Example submit function
  const onSubmit = async (data: any) => {
    const res = await   serverActions.buyer.savePreferences(data.location,data.minBudget,data.maxBudget,data.propertyType,data.amenities);
    if(res.status==200){
      toast.success("Preferences saved successfully");
    }
  };

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
            <div className="col-md-6">
              <FormInput
                label={"Property Type*"}
                className="custom-class"
                control={control}
                name="propertyType"
                type="text"
                isRequired={true}
                placeholder="Enter property type (e.g., Apartment, Villa)"
              />
            </div>
            <div className="col-md-6">
              <FormInput
                label={"Amenities*"}
                className="custom-class"
                control={control}
                name="amenities"
                type="text"
                isRequired={true}
                placeholder="Enter amenities (e.g., Pool, Gym, Parking)"
              />
            </div>
            <div className="d-flex justify-content-between col-md-12">
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
