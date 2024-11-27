import axios from "axios";

async function addInterest(propertyId: string, userId: string) {
  const data = { propertyId, userId };
  const response = await axios.post(`/api/property/interested`, data);
  return response;
}

async function isInterested(propertyId: string, userId: string) {
  const data = { propertyId, userId };
  const response = await axios.post(`/api/property/interested/check`, data);
  return response;
}

async function userInterests(userId: string) {
  const data = { userId };
  const response = await axios.post(
    `/api/property/interested/userInterests`,
    data
  );
  return response;
}

async function propertyInterests(propertyId: string) {
  const data = { propertyId };
  const response = await axios.post(`/api/property/interested/check`, data);
  return response;
}

export const interest = {
  addInterest,
  isInterested,
  userInterests,
  propertyInterests,
};
