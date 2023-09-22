import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authorizedRequest } from "../utils/AxiosInterceptor";
import MyButton from "../components/MyButton";
import authAxios from "../utils/authAxios";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    userId: "",
    userPassword: "",
  });
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [userInfo, setUserInfo] = useState();
  const [accessToken, setAccessToken] = useState("");

  const userIdInput = useRef();
  const userPasswordInput = useRef();

  const handleSubmit = async () => {
    // if (state.userId.length < 12) {
    //   alert("아이디(사번 12글자) 입력!");
    //   userIdInput.current.focus();
    //   return;
    // }

    // if (state.userPassword.length < 5) {
    //   userPasswordInput.current.focus();
    //   return;
    // }
    try {
      const response = await axios.post(`/api/v1/auth/employees/login`, {
        username: "202300000006",
        password: "ssafy0003",
      });
      // username: state.userId,
      // password: state.userPassword,

      console.log(response);
      console.log(response.data.data);
      console.log(response.data.data.employeeinfo);
      console.log(response.data.data.accessToken);

      setUserInfo(response.data.data.employeeinfo);
      setAccessToken(response.data.data.accessToken);
    } catch (e) {
      console.error(e);
    }

    localStorage.setItem("key", accessToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    console.log(userInfo);

    // navigate("/");

    setState({
      userId: "",
      userPassword: "",
    });
  };

  const test = async () => {
    try {
      // const response = await axios({
      //   headers: {
      //     Authorization: accessToken,
      //   },
      //   method: "get",
      //   url: `/api/v1/private/rooms`,
      // });
      // const response = await authorizedRequest({
      //   method: "get",
      //   url: `/rooms`,
      // });
      const response = await authAxios({
        method: "get",
        url: `/rooms`,
      });

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="Login container">
      <img src={process.env.PUBLIC_URL + `/assets/pavicon_white.png`} alt="Logo" />
      <h2>Loginnnnn</h2>
      <div>
        <h5>ID</h5>
        <input ref={userIdInput} value={state.userId} name="userId" onChange={handleChangeState} />
      </div>
      <div>
        <h5>Password</h5>
        <input
          ref={userPasswordInput}
          value={state.userPassword}
          type="password"
          name="userPassword"
          onChange={handleChangeState}
        />
      </div>
      <MyButton color={"white"} text={"로그인"} onClick={handleSubmit} />
      <MyButton color={"white"} text={"testtest"} onClick={test} />
    </div>
  );
};

export default Login;
