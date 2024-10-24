import axios from "axios";

async function GET_ALLOTMENT_STRUCTURE() {
  const response = await axios.get("/api/property/structure");
  return response;
}

export const property = {
  GET_ALLOTMENT_STRUCTURE,
};
