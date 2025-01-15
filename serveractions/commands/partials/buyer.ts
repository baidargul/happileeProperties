import axios from "axios";
import { favourite } from "./favourite";
import { interest } from "./interest";
import { propertyType } from "@prisma/client";

const apiPath = `/api/users/buyer`;

async function create(id: string, address?: string, description?: string) {
  const data = {
    id,
    address,
    description,
  };

  const result = await axios.post(apiPath, data).then(async (res) => {
    const response = await res.data;
    return response;
  });

  return result;
}
async function listAll() {
  const result = await axios.get(apiPath).then(async (res) => {
    const response = await res.data;
    return response;
  });

  return result;
}
async function get(id: string) {
  const temp = await axios
    .get(`${apiPath}/id?id=${id}`)
    .then(async (res: any) => {
      const response = await res.data;
      return response;
    });

  return temp;
}

async function savePreferences(
  userId: string,
  location: string,
  minBudget: number,
  maxBudget: number,
  propertyTypeIds: string[],
  amenitiesIds: string[]
) {
  const data = {
    userId,
    location,
    minBudget,
    maxBudget,
    propertyTypeIds,
    amenitiesIds,
  };
  const response = await axios.post(`${apiPath}/preferences`, data);
  return response;
}

export const buyer = {
  create,
  listAll,
  favourite,
  interest,
  savePreferences,
};
