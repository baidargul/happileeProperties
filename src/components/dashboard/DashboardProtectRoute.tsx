"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface RootState {
  user: {
    isLoggedIn: boolean;
	userProfile: any;
  };
}

export default function DashboardProtectRoute({
  children: children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userProfile =useSelector((state: RootState) => state.user.userProfile);

  if ((!isLoggedIn || userProfile?.status === 'UNDEFINED') && !pathname.includes('/profile')) {
    router.push("/");
    return (
		<div className="vh-100 d-flex align-items-center justify-content-center">
			<div className="spinner-border text-primary" role="status">
        		<span className="sr-only">Loading...</span>
      		</div>
		</div>
    );
  }
  return <>{children}</>;
}
