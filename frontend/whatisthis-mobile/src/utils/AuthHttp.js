import axios from "axios";
// 토큰 재발행 로직 추가 필요
const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL + `/api/v1/private`,
});

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const AuthHttp = async (config) => {
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

export default AuthHttp;
