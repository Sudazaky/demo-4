import { get, post } from "../utils/request"

export const getLogin = async (email, password) => {
  const result = await get(`users?email=${email}&password=${password}`);
  return result;
}

export const postRegister = async (options) => {
  const result = await post("users", options);
  return result;
}

export const checkExits = async (key, value) => {
  const result = await get(`users?${key}=${value}`);
  return result;
}