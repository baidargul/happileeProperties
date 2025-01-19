"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import SubscriptionCard from "./SubscriptionCard";
import Spinner from "@/components/common/Spinner";

const Pricing = ({showCase,userType}:any) => {
  const userProfile = useSelector((state: any) => state.user.userProfile);
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading,setLoading]=useState(false);

  const getSubscription = async () => {
    const res = await serverActions.user.subscription.listAll();
    if (res.status === 200) {
      const userSubscriptions = res.data.find(
        (element: any) => showCase ? element.name === userType : element.name === userProfile.type
      );
      setSubscriptions(userSubscriptions?.subscriptions || null);
    }
  };

  useEffect(() => {
    getSubscription();
  }, [userType]);

  return (
    <div className="py-4">
  <div className="d-flex flex-nowrap overflow-auto" style={{
    scrollbarColor:"#0D6EFD transparent",
    scrollbarWidth:"thin",
    scrollBehavior:"smooth",
  }}>
    {subscriptions ? (
      Object.entries(subscriptions).map(([planName, planData]: any, index) => (
        <div key={planData.id} className="d-flex justify-content-center align-items-center">
          <SubscriptionCard planName={planName} planData={planData} isPopular={planData.isPopular} showCase={showCase}/>
        </div>
      ))
    ) : (
      <Spinner />
    )}
  </div>
</div>
  
  );
};

export default Pricing;
