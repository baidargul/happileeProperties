import axios from "axios";

const apiPath = "/api/razorpay";

async function createOrder(data: any) {
  const response = await axios.post(`${apiPath}/razorpay`, data);
  return response.data;
}

export const razorpay = {
  createOrder,
};
