import axios from "axios";

const apiPath = "/api/users";

async function signUp(
  name: string,
  email: string,
  phone: string,
  password: string
) {
  const data = {
    name: name,
    email: email,
    phone: phone,
    password: password,
  };

  const response = await axios.post(apiPath, data).then(async (res) => {
    const response = await res.data;
    return response;
  });

  return response;
}

export const user = {
  signUp,
};
