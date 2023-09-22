import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "/api/v1/private",
});

export const setAuthToken = (token) => {
  localStorage.setItem("key", token);
};

const getAuthToken = () => {
  return localStorage.getItem("key");
};

const authAxios = async (config) => {
  const token = getAuthToken();

  console.log(token);

  const headers = {
    Authorization: token,
  };

  config.headers = headers;

  try {
    const response = await api(config);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export default authAxios;
