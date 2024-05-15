import { get } from "../utils/request"

export const getQuestions = async (topics) => {
  const result = await get(`questions?topicsId=${topics}`);
  return result;
}