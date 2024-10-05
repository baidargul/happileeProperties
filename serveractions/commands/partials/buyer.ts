import axios from "axios";

const listAll = async () => {
  await axios.get("").then(async (res: any) => {
    const response = await res.data;
    return response;
  });
};

export const buyer = {
  listAll,
};
