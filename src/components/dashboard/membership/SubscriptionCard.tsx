import Link from "next/link";
import React, { use, useState } from "react";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { user } from "../../../../serveractions/commands/partials/user";
import { userLogin } from "@/redux/features/userSlice";

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

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SubscriptionCard({
  showCase,
  planName,
  planData,
  isPopular = false, // New prop for Popular Badge
}: {
  planName: string;
  planData: PlanData;
  isPopular?: boolean;
  showCase?: boolean; // Optional prop to control if the card is popular
}) {
  // serverActions.user.subscription.changeUserSubscription()
  const dispatch = useDispatch();
  const userProfile = useSelector((state: any) => state.user.userProfile);
  const [loading,setLoading]=useState(false);


  const handleSubscriptionChange = async (planName: string) => {
    const res = await serverActions.user.subscription.changeUserSubscription(
      userProfile.id,
      planName
    );
    if (res.status === 200) {
      const response = await serverActions.user.list(userProfile?.id);
      if (response.status === 200) {
        dispatch(userLogin(response.data));
        // console.log(response)
      }
      toast.success("Subscription Changed Successfully");
    }
  };


const createOrder=()=>{

}

  const onSubmit = async () => {
    setLoading(true);
  
    try {
        // Step 1: Create Razorpay order from backend
        // const { data: { order } } = await axiosInstance.post('/api/razorpay/create-order', {
        //   amount: checkout?.amount?.total
        // });
  
        if (!order) {
          alert('Failed to create Razorpay order');
          setLoading(false);
          return;
        }
  
        // Step 2: Define Razorpay options
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay Key ID
          amount: order.amount, // Amount in paise (no need to multiply by 100)
          currency: 'INR',
          name: 'The Perfume By Goldy',
          description: 'Order',
          order_id: order.id, // Razorpay order ID from backend
          handler: async function (response) {
            try {
              // Step 3: Verify the payment
              const verifyResponse = await axiosInstance.post('/api/razorpay/verify-payment', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
  
              if (verifyResponse.data.success) {
                await createOrder(response.razorpay_payment_id); // If payment is verified, create the order
              } else {
                alert('Payment verification failed');
                setLoading(false); // Ensure loading is false if payment verification fails
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              setLoading(false); // Ensure loading state is false even on error
            }
          },
          prefill: {
            name: checkout?.delivery?.name,
            email: checkout?.delivery?.email,
            contact: checkout?.delivery?.phoneNumber,
          },
          theme: {
            color: '#F2C437',
          },
          modal: {
            ondismiss: function () {
              alert('Payment dismissed');
              setLoading(false); // Ensure loading is false when modal is closed
            }
          }
        };
  
        // Step 4: Open Razorpay checkout
        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
      console.error('Error in Razorpay flow:', error);
      setLoading(false); // Ensure loading is false even in case of error
    }
  };

  
  const renderProperties = (properties: PlanData["properties"]) =>
    properties &&
    Object.entries(properties).map(([key, value]) => (
      <li
        key={value.id}
        className="mb-2"
        style={{
          listStyleType: "none",
        }}
      >
        <i
          className="fa-solid fa-check"
          style={{
            color: "#4CBB17",
            marginRight: "10px",
          }}
        ></i>
        <span className="font-weight-bold">{key}: </span>
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          {value.limit === "0"
            ? "-"
            : value.limit === "-1"
            ? "Unlimited"
            : value.limit == "1"
            ? "Yes"
            : `${value.limit}${key === "Validity" ? " Days" : ""}`}
        </span>
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
          top: "30px",
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
          <div
            className="h4 font-weight-bold text-dark"
            style={{
              fontWeight: "bold",
            }}
          >
            {planName}
          </div>
          <div
            className="h4 text-primary"
            style={{
              fontSize: "3rem",
            }}
          >
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(parseFloat(planData.price))}
          </div>
        </div>
        <ul className="text-left mb-4">
          {renderProperties(planData.properties)}
        </ul>
        {userProfile?.subscription?.id ? (
          <div
            className="text-center"
            onClick={() =>
              !showCase &&
              userProfile.subscription.id != planData.id &&
              handleSubscriptionChange(planName)
            }
          >
            <Link
              href={showCase ? "/dashboard/membership" : "#"}
              className={`btn ${
                userProfile.subscription.id == planData.id
                  ? "btn-dark opacity-75 pe-none"
                  : "btn-primary"
              } w-100`}
            >
              {userProfile.subscription.id == planData.id
                ? "Current Plan"
                : planData.price === "0"
                ? "Free"
                : "Subscribe"}
            </Link>
          </div>
        ) : (
          <Link
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            className={`btn btn-primary w-100`}
          >
            {planData.price === "0" ? "Free" : "Subscribe"}
          </Link>
        )}
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
        <div
          className="h4 font-weight-bold text-dark"
          style={{
            fontWeight: "bold",
          }}
        >
          {planName}
        </div>
        <div
          className="h1 text-primary"
          style={{
            fontSize: "3rem",
          }}
        >
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(parseFloat(planData.price))}
        </div>
      </div>
      <ul className="text-left mb-4">
        {renderProperties(planData.properties)}
      </ul>
      {userProfile?.subscription?.id ? (
        <div
          className="text-center"
          onClick={() =>
            !showCase &&
            userProfile.subscription.id != planData.id &&
            handleSubscriptionChange(planName)
          }
        >
          <Link
            href={showCase ? "/dashboard/membership" : "#"}
            className={`btn ${
              userProfile.subscription.id == planData.id
                ? "btn-dark opacity-75 pe-none"
                : "btn-primary"
            } w-100`}
          >
            {userProfile.subscription.id == planData.id
              ? "Current Plan"
              : planData.price === "0"
              ? "Free"
              : "Subscribe"}
          </Link>
        </div>
      ) : (
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
          className={`btn btn-primary w-100`}
        >
          {planData.price === "0" ? "Free" : "Subscribe"}
        </Link>
      )}
    </div>
  );
}
