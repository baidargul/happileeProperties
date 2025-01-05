import { amenities } from "@prisma/client";
import axios from "axios";
import { group } from "./amenitiesgroup";

const apiPath = `/api/property/amenities`;

async function create(name: string, groupName: string) {
  const data = {
    name,
    groupName,
  };

  const response = await axios.post(apiPath);
  return response;
}

async function list(id: string) {
  const data: any = {
    id: id,
  };
  const response = await axios.get(apiPath, data);
  return response.data;
}

async function listAll() {
  const response = await axios.get(apiPath);
  return response.data;
}

async function remove(id: string) {
  const data: any = {
    id: id,
  };
  const response = await axios.delete(apiPath, data);
  return response.data;
}

async function update(amenities: amenities) {
  const data: any = {
    amenities,
  };
  const response = await axios.patch(apiPath, data);
  return response.data;
}

export const Amenities = {
  group,
  create,
  list,
  listAll,
  remove,
  update,
};
