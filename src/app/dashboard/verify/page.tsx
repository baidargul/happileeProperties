"use client";
import DashboardProfile from "@/components/dashboard/profile";
import DashboardVerify from "@/components/dashboard/verify";
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
      <DashboardVerify />
    </Wrapper>
  );
};

export default Page;
