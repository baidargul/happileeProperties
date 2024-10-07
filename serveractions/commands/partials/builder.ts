import axios from "axios";

const apiPath = "/api/users/builder";

async function listAll() {
  const temp = await axios.get(apiPath).then(async (res: any) => {
    const response = await res.data;
    return response;
  });

  return temp;
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

async function findByName(name: string) {
  const temp = await axios
    .get(`${apiPath}/name?name=${name}`)
    .then(async (res: any) => {
      const response = await res.data;
      return response;
    });

  return temp;
}

async function create(data: any) {
  try {
    const res = await axios.post(apiPath, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const response = await res.data;
    return response;
  } catch (error: any) {
    console.error("Error while creating user:", error);
    console.error("ERROR:", error.message);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}

export const builder = {
  listAll,
  get,
  findByName,
  create,
};
