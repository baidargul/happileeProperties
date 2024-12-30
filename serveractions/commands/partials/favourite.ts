import axios from "axios";
const apiPath = `/api/property`;

async function add(propertyId: string, userId: string) {
  const data = {
    propertyId,
    userId,
  };
  const response = await axios
    .post(`${apiPath}/favourite`, data)
    .then(async (res) => {
      const response = await res.data;
      return response;
    });
  return response;
}

async function remove(propertyId: string, userId: string) {
  const data = {
    propertyId,
    userId,
  };
  const response = await axios
    .patch(`${apiPath}/favourite`, data)
    .then(async (res) => {
      const response = await res.data;
      return response;
    });
  return response;
}

async function list(userId: string) {
  const response = await axios
    .get(`${apiPath}/favourite?id=${userId}`)
    .then(async (res) => {
      const response = await res.data;
      return response;
    });
  return response;
}

export const favourite = {
  list,
  add,
  remove,
};
