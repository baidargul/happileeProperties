//npm install jose
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
// require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

type RESPONSE = {
  status: number;
  message: string;
  data: any;
};

const generateToken = (payload: any) => {
  const secretKey = JWT_SECRET_KEY; // Replace with your own secret key
  const options = {
    expiresIn: "1d", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const isValidToken = async (token: string) => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // Secret key as ArrayBuffer

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err: any) {
    console.error("Token verification failed:", err.message);
    return null;
  }
};

const isValidRequest = (req: any, tokenName: string) => {
  const secretKey = JWT_SECRET_KEY;
  const token = req.cookies.get(tokenName)?.value;
  if (!token) {
    console.log(
      `No token found with name '${tokenName}' in request for validation.`
    );
    return null;
  }

  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

const createResponseHeader = (
  response: RESPONSE,
  token: string,
  HttpOnly?: false
) => {
  const headers = new Headers();
  if (HttpOnly) {
    headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/;`);
  } else {
    headers.append("Set-Cookie", `token=${token};  Path=/;`);
  }
  return new Response(JSON.stringify(response), { headers });
};

const decodeToken = (token: string) => {
  const secretKey = JWT_SECRET_KEY; // Replace with your own secret key
  let payload = jwt.decode(token, secretKey);
  const isExpired = JWTUtils.isExpired(token);
  const isValid = JWTUtils.isValidToken(token);
  return { ...payload, isExpired: isExpired, isValid: isValid };
};

const isExpired = (token: string) => {
  const secretKey = JWT_SECRET_KEY; // Replace with your own secret key
  try {
    const decodedToken = jwt.decode(token, secretKey);
    const expirationDate = decodedToken.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    return now > expirationDate;
  } catch (err) {
    return true;
  }
};

function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null; // Cookie not found
}

export const JWTUtils = {
  generateToken,
  createResponseHeader,
  isValidRequest,
  isValidToken,
  decodeToken,
  isExpired,
  getCookie,
};
