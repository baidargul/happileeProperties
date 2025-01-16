import { accountTypes } from "@prisma/client";
import axios from "axios";
import { subscription } from "./subscriptions";
import { Bluetick } from "./bluetick";

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

async function signIn(email: string, password: string) {
  const data = {
    email: email,
    password: password,
  };

  const response = await axios
    .post(`${apiPath}/login/`, data)
    .then(async (res) => {
      const response = await res.data;
      return response;
    });

  return response;
}

async function changeType(id: string, type: accountTypes) {
  const data = {
    id: id,
    type: type,
  };

  const response = await axios
    .patch(`${apiPath}/type`, data)
    .then(async (res) => {
      const response = await res.data;
      return response;
    });

  return response;
}

async function deleteUser(id: string) {
  const data = {
    id: id,
  };

  const response = await axios
    .patch(`${apiPath}/delete`, data)
    .then(async (res) => {
      const response = await res.data;
      return response;
    });

  return response;
}
async function deleteAllUsers() {
  const response = await axios.post(`${apiPath}/delete`).then(async (res) => {
    const response = await res.data;
    return response;
  });

  return response;
}
async function listAll() {
  const response = await axios.get(apiPath).then(async (res) => {
    const response = await res.data;
    return response;
  });
  return response;
}

async function list(id: string) {
  const data = {
    id: id,
  };
  const response = await axios.put(apiPath, data).then(async (res) => {
    const response = await res.data;
    return response;
  });
  return response;
}

async function recommendations(userId: string) {
  const response = await axios.get(`${apiPath}/recommendations?id=${userId}`);
  return response;
}

export const user = {
  signIn,
  signUp,
  list,
  listAll,
  recommendations,
  Bluetick,
  subscription,
  changeType,
  deleteUser,
  deleteAllUsers,
};
