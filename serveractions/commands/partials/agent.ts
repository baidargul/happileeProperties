import axios from "axios";

const apiPath = `/api/users/agent`;

async function create(
  id: string,
  rera: string,
  experience: number,
  description?: string
) {
  const data = {
    id,
    rera,
    experience,
    description,
  };

  const Result = await axios.post(apiPath, data).then(async (res: any) => {
    const response = await res.json();
    return response;
  });

  return Result;
}

async function listAll() {
  const temp = await axios.get(apiPath).then(async (res: any) => {
    const response = await res.data;
    return response;
  });

  return temp;
}

async function list(id: string) {
  const temp = await axios
    .get(`${apiPath}/id?id=${id}`)
    .then(async (res: any) => {
      const response = await res.data;
      return response;
    });

  return temp;
}

export const agent = {
  create,
  list,
  listAll,
};
