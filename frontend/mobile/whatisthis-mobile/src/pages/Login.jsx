import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyButton from "../components/MyButton";
import AuthHttp from "../utils/AuthHttp";

import { useWebSocket } from "../utils/WebSocket";

const Login = () => {
  const navigate = useNavigate();

  const { ws, receivedMessage } = useWebSocket();

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

  const userIdInput = useRef();
  const userPasswordInput = useRef();

  const handleSend = (type, data) => {
    if (!ws) {
      console.log("소켓 없음");
      return;
    }
    const message = {
      type: type,
      data: data,
    };
    const messageString = JSON.stringify(message, null, 2);
    ws.send(messageString);
  };

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
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + `/api/v1/auth/employees/login`,
        // {
        //   username: "1234",
        //   password: "1234",
        // }

        {
          username: state.userId,
          password: state.userPassword,
        }
      );

      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("userInfo", JSON.stringify(response.data.data.employeeinfo));

      // console.log("login success", response.data.data.employeeinfo);
      setState({
        userId: "",
        userPassword: "",
      });

      const token = localStorage.getItem("token");

      handleSend("AUTH", { accessToken: token });

      navigate("/");
    } catch (e) {
      alert("로그인 실패ToT");
      console.error(e);
    }
  };

  // const test = async () => {
  //   try {
  //     const response = await AuthHttp({
  //       method: "patch",
  //       url: `/private/requests/122/status`,
  //       data: {
  //         status: "WAITING_FOR_INSPECTION",
  //       },
  //     });
  //     console.log(response);
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   try {
  //     const response = await AuthHttp({
  //       method: "patch",
  //       url: `/private/requests/125/status`,
  //       data: {
  //         status: "WAITING_FOR_INSPECTION",
  //       },
  //     });
  //     console.log(response);
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   try {
  //     const response = await AuthHttp({
  //       method: "patch",
  //       url: `/private/requests/127/status`,
  //       data: {
  //         status: "WAITING_FOR_INSPECTION",
  //       },
  //     });
  //     console.log(response);
  //     navigate("/");
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

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
      {/* <MyButton color={"black"} text={"테스트"} onClick={test} /> */}
    </div>
  );
};

export default Login;
