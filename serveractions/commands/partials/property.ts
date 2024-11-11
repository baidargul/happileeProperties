import axios from "axios";
const apiPath = `/api/property`;
async function GET_ALLOTMENT_STRUCTURE() {
  const response = await axios.get(`${apiPath}/structure`);
  return response.data;
}

async function initializeDefaults() {
  const types = [
    { name: "House", type: "Residential" },
    { name: "Apartment", type: "Residential" },
    { name: "Villa", type: "Residential" },
    { name: "Office", type: "Commercial" },
    { name: "RetailShop", type: "Commercial" },
    { name: "ShowRoom", type: "Commercial" },
    { name: "Warehouse", type: "Commercial" },
  ];

  const allotmentTypes = [
    "Residential",
    "Commercial",
    "Industrial",
    "Agricultural",
    "Others",
  ];

  const allotmentFor = ["Sell", "Buy", "Rent"];

  const data = {
    types,
    allotmentTypes,
    allotmentFor,
  };

  const response = await axios.post(`${apiPath}/structure`, data);
  return response.data;
}

export const property = {
  initializeDefaults,
  GET_ALLOTMENT_STRUCTURE,
};
