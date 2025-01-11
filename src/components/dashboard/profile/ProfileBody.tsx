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
// import { RootState } from "@reduxjs/toolkit/query";
import { accountTypes } from "@prisma/client";
import { userLogin } from "@/redux/features/userSlice";
import UserTypeForm from "./UserTypeForm";
import BuilderForm from "./BuilderForm";
import AgentForm from "./AgentForm";
import BuyerForm from "./BuyerForm";
import PendingStatus from "./PendingStatus";

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
  const dispatch = useDispatch();

  const userProfile =
    useSelector((state: RootState) => state.user.userProfile) || {};

  const { status,type, id, name, address, description, gst } = userProfile;

  const getUserDetails = async () => {
    const response = await serverActions.user.list(id);
    if (response.status === 200) {
      dispatch(userLogin(response.data));
      // console.log(response)
    }
  };

  // const type='AGENT'

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Profile" />
        <h2 className="main-title d-block d-lg-none">Profile</h2>
        {status === "PENDING"?(
          <PendingStatus/>
        ): type === "UNDEFINED" ? (
          <UserTypeForm />
        ) : type === "BUILDER" ? (
          <BuilderForm />
        ) : type === "AGENT" ? (
          <AgentForm />
        ) : (
          <BuyerForm />
        )}
      </div>
    </div>
  );
};

export default ProfileBody;
