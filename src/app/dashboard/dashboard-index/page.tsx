"use client";
import DashboardIndex from "@/components/dashboard/index";
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
      <DashboardIndex />
    </Wrapper>
  );
};

export default Page;
