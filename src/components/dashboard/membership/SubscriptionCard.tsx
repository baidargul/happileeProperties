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
  isPopular = false, // New prop for Popular Badge
}: {
  planName: string;
  planData: PlanData;
  isPopular?: boolean; // Optional prop to control if the card is popular
}) {
  const renderProperties = (properties: PlanData["properties"]) =>
    properties &&
    Object.entries(properties).map(([key, value]) => (
      <li key={value.id} className="mb-2" style={{
        listStyleType: "none",
      }}>
        <i className="fa-solid fa-check" style={{
          color:'#4CBB17',
          marginRight: "10px",
        }}></i>
        <span className="font-weight-bold">{key}: </span>
        <span style={{
          fontWeight: "bold",
        }}>{value.limit === "0" 
          ? "Unlimited" 
          : `${value.limit}${key === 'Validity' ? ' Days' : ''}`}</span>
      </li>
    ));

  return isPopular ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d6dfd66",
        padding: "100px 0", // Increased padding to give more space
        borderRadius: "10px",
        // marginBottom: "30px", // Add some spacing at the bottom
        minHeight: "400px", // Ensure the parent is taller than the child card
        position: "relative", // Position relative for the badge
      }}
    >
      {/* Most Recommended Text */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0",
          // right: "0",
          transform: "translateX(40%)",
          backgroundColor: "#fff",
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: "5px",
          color: "#0d6dfd",
          // width: "100%",
        }}
      >
        Most Recommended
      </div>

      {/* Card Content */}
      <div
        className="pricing-card bg-white rounded shadow-sm p-3 mx-2"
        style={{
          width: "380px",
          height: "600px", // Fixed height for the card
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="text-center mb-4">
          <div className="h4 font-weight-bold text-dark" style={{
            fontWeight: "bold",
          }}>{planName}</div>
          <div className="h4 text-primary" style={{
          fontSize: "3rem",
        }}>
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(parseFloat(planData.price))}
          </div>
        </div>
        <ul className="text-left mb-4">
          {renderProperties(planData.properties)}
        </ul>
        <div className="text-center">
          <Link href="#" className="btn btn-primary w-100">
            {planData.price === "0" ? "Free" : "Subscribe"}
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="pricing-card bg-white rounded shadow-sm p-3 mx-2"
      style={{
        width: "380px",
        height: "600px", // Fixed height for regular cards
        display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
      }}
    >
      <div className="text-center mb-4">
        <div className="h4 font-weight-bold text-dark" style={{
            fontWeight: "bold",
          }}>{planName}</div>
        <div className="h1 text-primary" style={{
          fontSize: "3rem",
        }}>
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(parseFloat(planData.price))}
        </div>
      </div>
      <ul className="text-left mb-4">
        {renderProperties(planData.properties)}
      </ul>
      <div className="text-center">
        <Link href="#" className="btn btn-primary w-100">
          {planData.price === "0" ? "Free" : "Subscribe"}
        </Link>
      </div>
    </div>
  );
}
