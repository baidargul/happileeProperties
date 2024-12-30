import axios from "axios";

const baseUrl = "/api/leads";

async function createLead(propertyId: string, userId: string) {
  const data = {
    propertyId,
    userId,
  };
  const response = await axios.post(`${baseUrl}`, data);
  return response.data;
}

async function listAll() {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
}

async function listByUser(userId: string) {
  const response = await axios.get(`${baseUrl}/user?id=${userId}`);
  return response.data;
}

async function listByProperty(propertyId: string) {
  const response = await axios.get(`${baseUrl}/property?id=${propertyId}`);
  return response.data;
}

export const leads = {
  createLead,
  listAll,
  listByUser,
  listByProperty,
};
