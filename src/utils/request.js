const API_DOMAIN = "http://localhost:3006/";

export const get = async (path) => {
  const respone = await fetch(API_DOMAIN + path);
  const result = await respone.json();
  return result
}

export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}