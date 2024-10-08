"use client";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Image from "next/image";
import UserAvatarSetting from "./UserAvatarSetting";
import AddressAndLocation from "./AddressAndLocation";
import Link from "next/link";
import SocialMediaLink from "./SocialMediaLink";

import avatar_1 from "@/assets/images/dashboard/avatar_02.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/forms/reactHookInputs/FormInput";
import ImagePicker from "@/components/ImagePicker/ImagePicker";
import FormTextArea from "@/components/forms/reactHookInputs/FormTextArea";
import { useState } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";

const ProfileBody = () => {
  // Define the form schema using Zod

  const [selectedImageArray, setSelectedImageArray] = useState([]);

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    gst: z
      .string()
      .optional() // GST is optional
      .refine((value) => !value || /^[0-9]{15}$/.test(value), {
        message: "GST must be a valid 15-digit number",
      }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(15, { message: "Phone number cannot exceed 15 digits" })
      .refine((value) => /^[0-9]+$/.test(value), {
        message: "Phone number must be numeric",
      }),
    address: z.string().min(1, { message: "Address is required" }),
  });

  // Set up the form with default values
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      gst: "",
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(formSchema),
  });

  // Example submit function
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    selectedImageArray.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });
    // Display the key/value pairs
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    
    const response = await serverActions.builder.create(formData)
    console.log(response)
  };

  const handleTestClick = () => {
    const executeBackend = async () => {
      const temp = await serverActions.builder.listAll();
      console.log(temp);
    };
    executeBackend();
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Profile" />
        <h2 className="main-title d-block d-lg-none">Profile</h2>
        <button onClick={handleTestClick} className="btn btn-primary">
          Test Button
        </button>

        <div className="bg-white card-box border-20">
          {/* <div className="user-avatar-setting d-flex align-items-center mb-30">
                  <Image src={avatar_1} alt="" className="lazy-img user-img" />
                  <div className="upload-btn position-relative tran3s ms-4 me-3">
                     Upload new photo
                     <input type="file" id="uploadImg" name="uploadImg" placeholder="" />
                  </div>
                  <button className="delete-btn tran3s">Delete</button>
               </div> */}
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <FormInput
              label={"Name*"}
              className="custom-class"
              control={control}
              name="name"
              type="text"
              isRequired={true}
              placeholder="Enter company name"
            />
            <FormTextArea
              label={"Description*"}
              control={control}
              name="description"
              type="text"
              isRequired={true}
              placeholder="Enter a description"
              rows={8}
            />
            <div className="col-sm-6">
              <FormInput
                label={"GST"}
                control={control}
                name="gst"
                type="text"
                placeholder="Enter GST number"
              />
            </div>
            <div className="col-sm-6">
              <FormInput
                label={"Phone Number*"}
                control={control}
                name="phoneNumber"
                type="tel"
                isRequired={true}
                placeholder="Enter phone number"
              />
            </div>
            <FormTextArea
              label={"Address*"}
              control={control}
              name="address"
              type="text"
              isRequired={true}
              placeholder="Enter your address"
              rows={4}
            />
            <ImagePicker
              selectedImageArray={selectedImageArray}
              setSelectedImageArray={setSelectedImageArray}
              label={"Images*"}
            />
            <button type="submit" className="dash-btn-two tran3s me-3 w-25">
              Submit
            </button>
          </form>
          {/* <UserAvatarSetting /> */}
        </div>
        <SocialMediaLink />
        <AddressAndLocation />

        <div className="button-group d-inline-flex align-items-center mt-30">
          <Link href="#" className="dash-btn-two tran3s me-3">
            Save
          </Link>
          <Link href="#" className="dash-cancel-btn tran3s">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
