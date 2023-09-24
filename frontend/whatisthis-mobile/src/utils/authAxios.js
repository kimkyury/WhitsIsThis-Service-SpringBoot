import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + `/api/v1/private`,
});

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const AuthAxios = async (config) => {
  const token = getAuthToken();
  const headers = {
    ...config.headers,
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

export default AuthAxios;
