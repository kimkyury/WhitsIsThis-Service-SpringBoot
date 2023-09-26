import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://j9e203.p.ssafy.io/api/v1/private",
});

const authorizedRequest = async (config) => {
  try {
    const accessToken = localStorage.getItem("key");

    console.log(accessToken);
    config.headers = {
      Authorization: accessToken,
    };
    console.log(config);

    const response = await instance(config);

    return response;
  } catch (e) {
    console.log(e);
    // if (e.response.status === 401) {
    //   try {
    //     // 액세스 토큰 갱신 요청
    //     const response = await instance.post({});

    //     console.log("재발급 완료");
    //     console.log(localStorage.getItem("key"));

    //     let token = response.headers.authorization;

    //     localStorage.setItem("key", token);
    //     console.log(localStorage.getItem("key"));

    //     config.headers = {
    //       Authorization: token,
    //     };

    //     const retryResponse = await instance(config);

    //     return retryResponse;
    //   } catch (e) {
    //     console.log("재발급 실패", e);

    //     throw e;
    //   }
    // } else {
    //   console.log(e);

    //   throw e;
    // }
  }
};

export default instance;
export { authorizedRequest };
