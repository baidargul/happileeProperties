"use client";
import DashboardPreference from "@/components/dashboard/preference";
import DashboardProfile from "@/components/dashboard/profile";
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
      <DashboardPreference />
    </Wrapper>
  );
};

export default Page;
