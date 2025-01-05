import axios from "axios";

const apiPath = "/api/users/bluetick";

async function addDocuments(data: any) {
  try {
    const res = await axios.post(apiPath, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const response = await res.data;
    return response;
  } catch (error: any) {
    console.error("Error while submitting bluetick:", error);
    console.error("ERROR:", error.message);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}

async function list(userId: string) {
  const response = await axios
    .get(`${apiPath}?userId=${userId}`)
    .then(async (res) => {
      const response = await res.data;
      return response;
    });
  return response;
}

async function listAll() {
  const response = await axios.get(apiPath).then(async (res) => {
    const response = await res.data;
    return response;
  });
  return response;
}

async function toggle(userId: string) {
  const data = {
    userId,
  };
  const response = await axios.put(apiPath, data);
  return response;
}

export const Bluetick = {
  toggle,
  addDocuments,
  list,
  listAll,
};
