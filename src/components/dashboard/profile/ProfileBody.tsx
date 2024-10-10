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
import { useEffect, useState } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { user } from "../../../../serveractions/commands/partials/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { accountTypes } from "@prisma/client";
import { userLogin } from "@/redux/features/userSlice";

interface UserType {
  id: number;
  label: string;
  svg: JSX.Element;
  fill: string;
}

interface RootState {
  user: any;
}

const ProfileBody = () => {
  // Define the form schema using Zod
  const dispatch=useDispatch();

  const [selectedImageArray, setSelectedImageArray] = useState([]);
  const [removedImageArray, setRemovedImageArray] = useState([]);
  const {state,type,id,name,address,description,gst} =useSelector((state:RootState)=>state.user.userProfile)

  
  const getUserDetails = async () => {
    const response = await serverActions.user.list(id);
    if (response.status === 200) {
      dispatch(userLogin(response.data));
      // console.log(response)
    }
  };

  useEffect(() => {
      getUserDetails();
  },[])

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    gst: z
      .string()
      .optional() // GST is optional
      .refine((value) => !value || /^[0-9]{15}$/.test(value), {
        message: "GST must be a valid 15-digit number",
      }),
    address: z.string().min(1, { message: "Address is required" }),
  });

  // Set up the form with default values
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: name??"",
      description: description??"",
      gst: gst??"",
      address: address??"",
    },
    resolver: zodResolver(formSchema),
  });

  // Example submit function
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    selectedImageArray.forEach((file: File) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });
    // Display the key/value pairs`
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    formData.append('id',id)
    const response = await serverActions.builder.create(formData);
    console.log(response)
  };

  const userTypeData = [
    {
      id: 1,
      value:accountTypes.BUILDER,
      label: "Builder",
      svg: "M447.029 472.238C434.064 420.379 387.469 384 334.017 384H113.984C60.532 384 13.935 420.379 0.972 472.238C-4.079 492.438 11.197 512 32.015 512H415.983C436.802 512 452.078 492.438 447.029 472.238ZM32.019 479.998C41.438 442.316 75.144 416 113.984 416H334.017C372.857 416 406.561 442.316 415.983 480L32.019 479.998ZM322.44 224C322.44 276.938 279.374 320 226.431 320S130.421 276.938 130.421 224C130.421 215.156 123.263 208 114.418 208S98.417 215.156 98.417 224C98.417 294.578 155.844 352 226.431 352C297.015 352 354.444 294.578 354.444 224C354.444 215.156 347.286 208 338.443 208C329.598 208 322.44 215.156 322.44 224ZM80.436 176H370.009C378.893 176 386.096 168.836 386.096 160C386.096 151.162 378.893 144 370.009 144H353.918C353.918 143.994 353.922 143.99 353.922 143.984C353.922 78.885 304.623 25.578 241.31 17.602V16C241.31 7.156 234.115 0 225.223 0C216.331 0 209.135 7.156 209.135 16V17.602C145.823 25.578 96.524 78.885 96.524 143.984C96.524 143.99 96.528 143.994 96.528 144H80.436C71.552 144 64.349 151.162 64.349 160C64.349 168.836 71.552 176 80.436 176ZM241.31 49.602C286.866 57.273 321.747 96.525 321.747 143.984C321.747 143.99 321.751 143.994 321.751 144H241.31V49.602ZM128.699 143.984C128.699 96.525 163.579 57.273 209.135 49.602V144H128.695C128.695 143.994 128.699 143.99 128.699 143.984Z",  
    },
    {
      id: 2,
      value:accountTypes.AGENT,
      label: "Agent",
      svg: "M328.228 312.627C326.732 312.141 325.21 311.91 323.706 311.91C317.536 311.91 311.671 315.779 309.087 321.697L273.751 402.637L246.206 320H255.997C264.841 320 271.997 312.844 271.997 304S264.841 288 255.997 288H191.997C183.154 288 175.997 295.156 175.997 304S183.154 320 191.997 320H201.788L174.244 402.637L138.908 321.697C136.324 315.781 130.458 311.912 124.288 311.912C122.785 311.912 121.265 312.141 119.767 312.627C49.804 335.348 -0.692 401.217 0.007 478.922C0.173 497.426 16.158 512 34.661 512H413.333C431.837 512 447.822 497.426 447.988 478.922C448.687 401.217 398.195 335.346 328.228 312.627ZM34.661 480C33.15 480 32.117 478.936 32.005 478.635C31.494 421.73 64.562 371.127 115.66 348.424L173.101 480H34.661ZM239.997 479.953H207.997L193.38 446.473L223.997 354.594L254.615 446.473L239.997 479.953ZM413.333 480H274.894L332.335 348.424C383.431 371.123 416.501 421.727 415.999 478.598C415.878 478.936 414.845 480 413.333 480ZM223.997 256C294.747 256 351.997 198.75 351.997 128S294.747 0 223.997 0S95.997 57.25 95.997 128S153.247 256 223.997 256ZM223.997 32C276.933 32 319.997 75.064 319.997 128C319.997 180.934 276.933 224 223.997 224S127.997 180.934 127.997 128C127.997 75.064 171.062 32 223.997 32Z",  
    },
    {
      id: 3,
      value:accountTypes.BUYER,
      label: "Buyer",
      svg: "M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM224 32C276.936 32 320 75.064 320 128C320 180.934 276.936 224 224 224S128 180.934 128 128C128 75.064 171.064 32 224 32ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304ZM413.336 480H34.664C33.195 480 32 478.803 32 477.332C32 399.4 95.402 336 173.336 336H274.664C352.598 336 416 399.4 416 477.332C416 478.803 414.805 480 413.336 480Z",
    },
  ];

  const [userType, setUserType] = useState<accountTypes>();

  const handleTypeChange = async (value:accountTypes) =>{
    const res = serverActions.user.changeType(id,value)
    // console.log(res)
    dispatch(userLogin(res))
    // if(res){
    //   setUserType(value)
    // }
  }

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Profile" />
        <h2 className="main-title d-block d-lg-none">Profile</h2>
        {type==='UNDEFINED' ? (
          <div className="bg-white p-30 card-box border-20">
            <h4 className="text-center mb-30">Please select user type</h4>
            <div className="d-flex align-items-center justify-content-center">
              {userTypeData.map((item) => (
                <div
                  key={item.id}
                  className={`border border-2 mx-3 d-flex align-items-center justify-content-center border-primary flex-column ${
                    userType === item.value ? "bg-primary" : ""
                  }`}
                  style={{
                    width: "100px",
                    height: "100px",
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "5%",
                  }}
                  onClick={() => setUserType(item.value)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="35"
                    height="35"
                  >
                    <path
                      fill={`${userType === item.value ? "white" : "black"}`}
                      d={item.svg}
                    />
                  </svg>
                  <p
                    className={`fs-14 fw-500 user-select-none mt-2 ${
                      userType === item.value ? "text-white" : ""
                    }`}
                    style={{ margin: 0 }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button onClick={() => userType !== undefined && handleTypeChange(userType)} className="dash-btn-two tran3s w-25 mt-30 align-self-center">Submit</button>              
            </div>
          </div>
        ):
        (
          <div className="bg-white card-box border-20">
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
              <div className="">
                <FormInput
                  label={"GST"}
                  control={control}
                  name="gst"
                  type="text"
                  placeholder="Enter GST number"
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
                setRemovedImageArray={setSelectedImageArray}
                label={"Images*"}
              />
              <button type="submit" className="dash-btn-two tran3s me-3 w-25">
                Submit
              </button>
            </form>
            {/* <UserAvatarSetting /> */}
          </div>
        )
        }
        {/* <SocialMediaLink />
        <AddressAndLocation /> */}

        {/* <div className="button-group d-inline-flex align-items-center mt-30">
          <Link href="#" className="dash-btn-two tran3s me-3">
            Save
          </Link>
          <Link href="#" className="dash-cancel-btn tran3s">
            Cancel
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileBody;
