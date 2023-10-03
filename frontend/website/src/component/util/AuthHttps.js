import axios from "axios";
// 토큰 재발행 로직 추가 필요
const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL + `/api/v1`,
});

export const setAuthToken = (token) => {
  sessionStorage.setItem("accessToken", token);
};

const getAuthToken = () => {
  return sessionStorage.getItem("accessToken");
};

const AuthHttps = async (config) => {
  const token = getAuthToken();

  const formData = new FormData(); // FormData 객체 생성

  for (const key in config.data) {
    // config.data의 데이터를 FormData에 추가
    formData.append(key, config.data[key]);
  }

  formData.append("Authorization", token); // 토큰도 FormData에 추가

  try {
    const response = await api({
      ...config,
      data: formData, // 변경된 FormData를 config에 할당
    });

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





export default AuthHttps;
