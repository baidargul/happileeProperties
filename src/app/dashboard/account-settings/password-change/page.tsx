"use client";
import PasswordChange from "@/components/dashboard/account-settings/password-change";
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
      <PasswordChange />
    </Wrapper>
  );
};

export default Page;
