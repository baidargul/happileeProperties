"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import SubscriptionCard from "./SubscriptionCard";
import Spinner from "@/components/common/Spinner";

const Pricing = () => {
  const userProfile = useSelector((state: any) => state.user.userProfile);
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading,setLoading]=useState(false);

  const getSubscription = async () => {
    const res = await serverActions.user.subscription.listAll();
    if (res.status === 200) {
      const userSubscriptions = res.data.find(
        (element: any) => element.name === userProfile.type
      );
      setSubscriptions(userSubscriptions?.subscriptions || null);
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);

  return (
    <div className="pricing-section-two container py-4">
      <div className="row gy-4">
        {subscriptions ?
          Object.entries(subscriptions).map(([planName, planData]: any) => (
            <div key={planData.id} className="col-12 col-lg-6">
              <SubscriptionCard planName={planName} planData={planData} />
            </div>
          )):<Spinner/>}
      </div>
    </div>
  );
};

export default Pricing;
