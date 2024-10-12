import axios from "axios";

const apiPath = `/api/users/agent`;

async function create(id: string, experience: number, description?: string) {
  const data = {
    id,
    experience,
    description,
  };

  const Result = await axios.post(apiPath, data).then(async (res: any) => {
    const response = await res.json();
    return response;
  });

  return Result;
}

export const agent = {
  create,
};
