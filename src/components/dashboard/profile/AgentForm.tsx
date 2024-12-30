import FormInput from "@/components/forms/reactHookInputs/FormInput";
import FormTextArea from "@/components/forms/reactHookInputs/FormTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import ImagePicker from "@/components/ImagePicker/ImagePicker";
import { userLogin } from "@/redux/features/userSlice";

interface RootState {
  user: any;
}

export default function AgentForm() {
  const dispatch=useDispatch();
  const userProfile =
    useSelector((state: RootState) => state.user.userProfile) || {};

  const { id, agent } = userProfile;

  console.log(userProfile);

  const experienceFormSchema = z.object({
    experience: z
      .string()
      .min(1, { message: "Years of experience is required" })
      .refine((value) => /^[0-9]+$/.test(value), {
        message: "Experience must be a valid number",
      }),
    description: z.string().min(1, { message: "Description is required" }),
    address: z.string().min(1, { message: "Address is required" }).optional(),
    rera: z.string().min(1, { message: "Description is required" }),
    
  });

  const { control, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      experience: agent?.experience??"",
      description: agent?.description??"",
      rera: agent?.rera??"",
      address: agent?.address??"",
    },
    resolver: zodResolver(experienceFormSchema),
  });

  const { isSubmitting } = formState;

  // Example submit function
  const onSubmit = async (data: any) => {
    const response = await serverActions.agent.create(
      id,data.rera,data.experience,data.description
    );
    if (response.status == 200) {
      dispatch(userLogin(response.data));
    }
  };

  return (
    <div className="bg-white card-box border-20">
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="col-md-6">
          <FormInput
            label={"Years of Experience*"}
            className="custom-class"
            control={control}
            name="experience"
            type="number"
            isRequired={true}
            placeholder="Enter your years of experience"
          />
        </div>
        <div className="col-md-6">
          <FormInput
            label={"Years of Experience*"}
            className="custom-class"
            control={control}
            name="rera"
            type="text"
            isRequired={true}
            placeholder="Enter RERA id"
          />
        </div>
        <div className="col-md-12">
          <FormTextArea
            label={"Address"}
            control={control}
            name="address"
            type="text"
            isRequired={true}
            placeholder="Enter a address"
            rows={6}
          />
        </div>
        <div className="col-md-12">
          <FormTextArea
            label={"Description*"}
            control={control}
            name="description"
            type="text"
            isRequired={true}
            placeholder="Enter a description for your profile"
            rows={8}
          />
        </div>
        <div className="col-md-12">
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
  );
}
