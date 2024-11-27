"use client";
import { useEffect } from "react";
import { serverActions } from "../../../serveractions/commands/serverCommands";

export const AddInterestWrapper = (props: {
  children: React.ReactNode;
  propertyId: string;
}) => {
  const addInt = async () => {
    await serverActions.buyer.interest.addInterest(
      props.propertyId,
      "ReduxUserId"
    );
  };

  useEffect(() => {
    addInt();
  }, []);

  return <div>{props.children}</div>;
};
