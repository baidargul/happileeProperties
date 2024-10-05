import axios from "axios";

const apiPath = "/api/users/builder";

async function listAll() {
  await axios.get(apiPath).then(async (res: any) => {
    const response = await res.data;
    return response;
  });
}

async function get(id: number) {
  await axios.get(apiPath).then(async (res: any) => {
    const response = await res.data;
    return response;
  });
}

async function findByName(name: string) {
  await axios.get(apiPath).then(async (res: any) => {
    const response = await res.data;
    return response;
  });
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
