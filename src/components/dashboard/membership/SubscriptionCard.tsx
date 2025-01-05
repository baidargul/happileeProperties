import Link from "next/link";
import React from "react";

interface PlanData {
  id: string;
  type: string;
  price: string;
  properties: {
    [key: string]: {
      id: string;
      limit: string;
    };
  };
}

export default function SubscriptionCard({
  planName,
  planData,
}: {
  planName: string;
  planData: PlanData;
}) {
  const renderProperties = (properties: PlanData["properties"]) =>
    properties &&
    Object.entries(properties).map(([key, value]) => (
      <li key={value.id}>
        {key}: {value.limit === "0" ? "Not Included" : value.limit}
      </li>
    ));

  return (
    <div className="pr-column-wrapper bg-white rounded-5 active mt-30">
      <div className="pr-header text-center mb-55">
        <div className="plan fw-500 text-uppercase color-dark">{planName}</div>
        <strong className="price fw-500">
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(parseFloat(planData.price))}
        </strong>
      </div>
      <ul className="style-none text-center">
        {renderProperties(planData.properties)}
      </ul>
      <div className="pr-footer text-center mt-60">
        <Link href="#" className="btn-twelve w-100 sm">
          {planData.price === "0" ? "Free" : "Subscribe"}
        </Link>
      </div>
    </div>
  );
}
