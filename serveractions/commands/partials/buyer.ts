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
  await axios.post("/api/users/buyer").then(async (res: any) => {
    const response = await res.data;
    return response;
  });
}

export const buyer = {
  listAll,
  get,
  findByName,
  create,
};
