import { accountTypes } from "@prisma/client";
import axios from "axios";

const apiPath = "/api/users/subscriptions";
const propertyApiPath = "/api/users/subscriptions/properties";

const property = {
  create: async (
    name: string,
    limit: number,
    subscriptionName: string,
    type: string
  ) => {
    const data = {
      name: name,
      limit: limit,
      subscriptionName: subscriptionName,
      type: type,
    };

    const response = await axios.post(propertyApiPath, data);
    return response.data;
  },
};

async function listAll() {
  const response = await axios.get(apiPath);
  return response.data;
}

async function create(name: string, type: accountTypes, price: number) {
  const data = {
    name: name,
    type: type,
    price: price,
  };

  const response = await axios.post(apiPath, data);
  return response.data;
}

export const subscription = {
  listAll,
  create,
  property,
};
