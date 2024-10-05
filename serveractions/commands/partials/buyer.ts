import axios from "axios";

async function listAll() {
  await axios.get("").then(async (res: any) => {
    const response = await res.data;
    return response;
  });
}

async function get(id: number) {
  await axios.get("").then(async (res: any) => {
    const response = await res.data;
    return response;
  });
}

async function findByName(name: string) {
  await axios.get("").then(async (res: any) => {
    const response = await res.data;
    return response;
  });
}

async function create(data: any) {
  try {
    const res = await axios.post("/api/users/buyer", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const response = await res.data;
    return response;
  } catch (error) {
    console.error("Error while creating user:", error);
    throw error;
  }
}

export const buyer = {
  listAll,
  get,
  findByName,
  create,
};
