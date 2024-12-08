import axios from "axios";

const apiPath = "/api/users/subscriptions";

async function listAll() {
  const response = await axios.get(apiPath);
  return response.data;
}

export const subscription = {
  listAll,
};
