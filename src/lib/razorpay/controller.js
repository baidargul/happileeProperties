import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Initialize Razorpay instance with key_id and key_secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay Secret Key
});

// Create order function
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount and currency are passed from the frontend

    const options = {
      amount: amount * 100, // Razorpay expects the amount in the smallest unit (paise for INR)
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 1000000)}`, // Unique receipt ID for reference
    };

    // Create the order in Razorpay
    const order = await razorpay.orders.create(options);

    // Respond with order details
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};

// Verify payment function
export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Generate signature using the same method as Razorpay's backend
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  // Verify if the generated signature matches Razorpay's signature
  if (generatedSignature === razorpay_signature) {
    res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

// Refund payment function
export const refundPayment = async (paymentId, amount) => {
  try {
    // Initiate refund through Razorpay API
    const refundResponse = await razorpay.payments.refund(paymentId, {
      amount: amount ? amount * 100 : undefined, // Amount in paise; full refund if amount is not provided
    });

    return {
      success: true,
      message: "Refund processed successfully",
      data: refundResponse,
    };
  } catch (error) {
    console.error("Error processing refund:", error);
    return {
      success: false,
      message: "Failed to process refund",
      error: error.message,
    };
  }
};
