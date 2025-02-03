import { NextRequest } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "", // Your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET || "", // Your Razorpay Secret Key
});

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    const { amount } = data; // Amount and currency are passed from the frontend

    const options = {
      amount: amount * 100, // Razorpay expects the amount in the smallest unit (paise for INR)
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 1000000)}`, // Unique receipt ID for reference
    };

    // Create the order in Razorpay
    const order = await razorpay.orders.create(options);

    response.status = 200;
    response.message = "Order created successfully";
    response.data = order;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
