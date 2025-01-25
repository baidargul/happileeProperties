import axios from "axios";

const apiPath = `/api/users/agent`;

// FOR JSON
// async function create(
//   id: string,
//   rera: string,
//   experience: number,
//   description?: string
// ) {
//   const data = {
//     id,
//     rera,
//     experience,
//     description,
//   };

//   const Result = await axios.post(apiPath, data).then(async (res: any) => {
//     const response = await res.data;
//     return response;
//   });

//   return Result;
// }
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
    console.error("Error while creating agent:", error);
    console.error("ERROR:", error.message);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
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

/**
 *
 * @param userId
 * @param isSalesPerson
 * @returns user
 * @description takes userId and isSalesPerson and if user is an agent, sets the agent flag to isSalesPerson as provided
 */

async function setSalesPerson(userId: string, isSalesPerson: boolean) {
  const data = {
    userId,
    isSalesPerson,
  };

  const response = await axios.post(`${apiPath}/salesperson`, data);
  return response;
}

export const agent = {
  create,
  list,
  listAll,
  setSalesPerson,
};
