import { accountTypes } from "@prisma/client";
import axios from "axios";

const apiPath = "/api/users/subscriptions";

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
};
