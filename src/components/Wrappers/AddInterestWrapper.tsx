"use client";
import { useEffect } from "react";
import { serverActions } from "../../../serveractions/commands/serverCommands";
import { useSelector } from "react-redux";

export const AddInterestWrapper = (props: {
  children: React.ReactNode;
  propertyId: string;
}) => {

  const userId=useSelector((state:any)=>state.user.userProfile.id);

  const addInt = async () => {
    await serverActions.buyer.interest.addInterest(
      props.propertyId,
      userId
    );
  };

  useEffect(() => {
    addInt();
  }, []);

  return <div>{props.children}</div>;
};
