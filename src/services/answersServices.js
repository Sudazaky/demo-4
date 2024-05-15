import { getCookie } from "../helpers/cookie";
import { get, post } from "../utils/request"

export const getAnswersByUserId = async () => {
  const userId = getCookie("id");
  const result = await get(`answers?userId=${userId}`);
  return result;
}

export const postAnswers = async (options) => {
  const result = await post("answers", options);
  return result;
}

export const getAnswers = async (id) => {
  const result = await get(`answers/${id}`);
  return result;
}