import axios from "axios";
const apiPath = `/api/property/structure`;
async function GET_ALLOTMENT_STRUCTURE() {
  const response = await axios.get(apiPath);
  return response.data;
}

export const property = {
  GET_ALLOTMENT_STRUCTURE,
};
