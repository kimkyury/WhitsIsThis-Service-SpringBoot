import axios from "axios";
// 토큰 재발행 로직 추가 필요
const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL + `/api/v1`,
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
    // console.error("토큰만료", e.response);
    if (e.response.status === 403 || e.response.status === 401) {
      try {
        // 액세스 토큰 갱신 요청
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL + `/api/v1/auth/reissue`,
          {},
          {
            withCredentials: true,
          }
        );

        console.log("재발급 완료");
        console.log(localStorage.getItem("token"));

        let token = response.headers.authorization;

        localStorage.setItem("token", token);
        console.log(localStorage.getItem("token"));

        config.headers = {
          Authorization: token,
        };

        const retryResponse = await api(config);

        return retryResponse;
      } catch (e) {
        console.log("재발급 실패", e);

        throw e;
      }
    } else {
      console.log("재발급 시도조차 못함", e);

      throw e;
    }
  }
};

export default AuthHttp;
