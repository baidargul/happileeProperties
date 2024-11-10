"use client";
import DashboardFavourite from "@/components/dashboard/favourites";
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
      <DashboardFavourite />
    </Wrapper>
  );
};

export default Page;
