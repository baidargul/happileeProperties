"use client";
import { useEffect, useState } from "react";
import DashboardAddProperty from "@/components/dashboard/add-property";
import Wrapper from "@/layouts/Wrapper";

const Index = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true after the component has mounted (client-side only)
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <Wrapper>
      <DashboardAddProperty />
    </Wrapper>
  );
};

export default Index;
