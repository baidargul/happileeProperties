"use client";
import React, { useEffect } from "react";
import { serverActions } from "../../../serveractions/commands/serverCommands";

type Props = {};

const Page = (props: Props) => {
  const aaa = async () => {
    const response = await serverActions.property.initializeDefaults();
    console.log(response);
  };

  useEffect(() => {
    aaa();
  }, []);
  return <div>DEFAULT INITIALIZATION PAGE</div>;
};

export default Page;
