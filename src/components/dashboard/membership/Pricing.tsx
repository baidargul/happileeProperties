"use client";
import Link from "next/link";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";

interface DataType {
  id: number;
  title: string;
  price: string;
  desc: string;
  list_details: {
    list: string;
    disable?: string;
  }[];
  class_name: string;
  btn: string;
}

const pricing_data: DataType[] = [
  {
    id: 1,
    title: "FREE PLAN",
    price: "0",
    desc: "per user/month",
    list_details: [
      { list: "60-day chat history" },
      { list: "Basic widget customization" },
      { list: "Ticketing system", disable: "disable" },
      { list: "Data security", disable: "disable" },
    ],
    btn: "Choose Plan",
    class_name: "border-0",
  },
  {
    id: 2,
    title: "STANDARD",
    price: "$12",
    desc: "per user/month",
    list_details: [
      { list: "60-day chat history" },
      { list: "Basic widget customization" },
      { list: "Ticketing system" },
      { list: "Data security", disable: "disable" },
    ],
    btn: "Current Plan",
    class_name: "active",
  },
  // {
  //    id: 3,
  //    title: "BUSINESS",
  //    price: "$39",
  //    desc: "per user/month",
  //    list_details: [{ list: "60-day chat history" }, { list: "Basic widget customization" }, { list: "Ticketing system" }, { list: "Data security" }],
  //    btn: "Choose Plan",
  //    class_name:"border-0",
  // },
  // {
  //    id: 1,
  //    title: "FREE PLAN",
  //    price: "0",
  //    desc: "per user/month",
  //    list_details: [{ list: "60-day chat history" }, { list: "Basic widget customization" }, { list: "Ticketing system", disable: "disable" }, { list: "Data security", disable: "disable" }],
  //    btn: "Choose Plan",
  //    class_name:"border-0",
  // },
  // {
  //    id: 2,
  //    title: "STANDARD",
  //    price: "$12",
  //    desc: "per user/month",
  //    list_details: [{ list: "60-day chat history" }, { list: "Basic widget customization" }, { list: "Ticketing system" }, { list: "Data security", disable: "disable" }],
  //    btn: "Current Plan",
  //    class_name: "active",
  // },
  // {
  //    id: 3,
  //    title: "BUSINESS",
  //    price: "$39",
  //    desc: "per user/month",
  //    list_details: [{ list: "60-day chat history" }, { list: "Basic widget customization" }, { list: "Ticketing system" }, { list: "Data security" }],
  //    btn: "Choose Plan",
  //    class_name:"border-0",
  // },
];

const Pricing = () => {
  const userProfile = useSelector((state: any) => state.user.userProfile);

  const [subscriptions, setSubscriptions] = useState({});

  const getSubscription = async () => {
    const res = await serverActions.user.subscription.listAll();
    if (res.status === 200) {
      const subs = res.data.find(
        (element: any) => element.name === userProfile.type
      );
      if (subs) {
        setSubscriptions(subs);
      }
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);

  return (
<div className="pricing-section-two">
  <div className="">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '20px', // Adds spacing between the cards
      }}
    >
      <div
        style={{
          flex: '1 1 20%', // Each card takes up 30% of the container on large screens
          marginBottom: '20px', // Adds bottom margin for spacing between rows
        }}
      >
        <SubscriptionCard subscriptions={subscriptions} role={userProfile.type} />
      </div>
      {/* <div
        style={{
          flex: '1 1 30%',
          marginBottom: '20px',
        }}
      >
        <SubscriptionCard subscriptions={subscriptions} role={userProfile.type} />
      </div> */}
      {/* <div
        style={{
          flex: '1 1 30%',
          marginBottom: '20px',
        }}
      >
        <SubscriptionCard subscriptions={subscriptions} role={userProfile.type} />
      </div> */}
      {/* Add more SubscriptionCard components as needed */}
    </div>
  </div>
</div>

  );
};

export default Pricing;
