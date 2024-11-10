"use client";
import DashboardSavedSearch from "@/components/dashboard/saved-search";
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
      <DashboardSavedSearch />
    </Wrapper>
  );
};

export default Page;
