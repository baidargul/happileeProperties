"use client";
import DashboardAccountSetting from "@/components/dashboard/account-settings";
import Wrapper from "@/layouts/Wrapper";
import { useEffect, useState } from "react";

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Wrapper>
      <DashboardAccountSetting />
    </Wrapper>
  );
};

export default Page;
