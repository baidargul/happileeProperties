import axios from "axios";

const apiPath = `/api/property/amenities/group`;

async function create(name: string) {
  const data = {
    name,
  };

  const response = await axios.post(apiPath, data);
  return response.data;
}

async function list(id: string) {
  const response = await axios.get(`${apiPath}?id=${id}`);
  return response.data;
}

async function listAll() {
  const response = await axios.get(apiPath);
  return response.data;
}

async function remove(id: string) {
  const response = await axios.delete(`${apiPath}?id=${id}`);
  return response.data;
}

async function update(id: string, name: string) {
  const data = {
    id,
    name,
  };

  const response = await axios.patch(`${apiPath}`, data);
  return response.data;
}

export const group = {
  create,
  list,
  listAll,
  update,
};
