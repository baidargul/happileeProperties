"use client";
import DashboardReview from "@/components/dashboard/review";
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
      <DashboardReview />
    </Wrapper>
  );
};

export default Page;
