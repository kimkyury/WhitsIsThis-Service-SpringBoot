import axios from "axios";

const instance = axios.create({
  withCredentials: true,
});


const authorizedRequest = async (config) => {
  let response;
  try {
    // 클라이언트 사이드 저장소에서 액세스 토큰 가져옴
    const accessToken = localStorage.getItem("key");

    // 액세스 토큰을 이용해 인증 헤더를 설정
    config.headers = {
      // authorization: `Bearer ${accessToken}`
      authorization: accessToken,
    };

    // Axios를 이용하여 요청
    response = await instance(config);
    // console.log("토큰멀쩡");
    return response;
  } catch (err) {
    // 토큰 만료
    if (err.response.status === 401) {
      try {
        // 액세스 토큰 갱신 요청
        // URLINPUT 에 env 파일에서 url 설정해서 넣을 것
        const response = await instance.post("URLINPUTURLINPUTURLINPUTURLINPUT", {});

        // 액세스 토큰 업데이트
        console.log("재발급 완료");
        console.log(localStorage.getItem("key"));

        // let token = response.headers.authorization.replace('Bearer ', '');
        let token = response.headers.authorization;

        localStorage.setItem("key", token);
        console.log(localStorage.getItem("key"));

        // 새로운 액세스 토큰으로 원래의 요청을 다시 시도
        config.headers = {
          // authorization: `Bearer ${token}`
          authorization: token,
        };

        const retryResponse = await instance(config);

        return retryResponse;
      } catch (err) {
        console.log("재발급 실패", err);

        throw err;
      }
    } else {
      console.log(err);
      throw err;
    }
  }
};

export default instance;
export { authorizedRequest };
