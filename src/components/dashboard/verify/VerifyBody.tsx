"use client";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import { useEffect } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/features/userSlice";
import VerifyForm from "./VerifyForm";

interface UserType {
  id: number;
  label: string;
  svg: JSX.Element;
  fill: string;
}

interface RootState {
  user: any;
}

const VerifyBody = () => {
  // Define the form schema using Zod
  const dispatch = useDispatch();

  const userProfile =
    useSelector((state: RootState) => state.user.userProfile) || {};

  const { status,type, id, name, address, description, gst } = userProfile;

  const getUserDetails = async () => {
    const response = await serverActions.user.list(id);
    if (response.status === 200) {
      dispatch(userLogin(response.data));
      console.log(response)
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
        <VerifyForm/>
      </div>
    </div>
  );
};

export default VerifyBody;
