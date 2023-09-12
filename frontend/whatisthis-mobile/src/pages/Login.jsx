import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "../components/MyButton";

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

  const userIdInput = useRef();
  const userPasswordInput = useRef();

  const handleSubmit = () => {
    if (state.userId.length < 1) {
      userIdInput.current.focus();
      return;
    }

    if (state.userPassword.length < 5) {
      userPasswordInput.current.focus();
      return;
    }

    // auth 통신로직

    localStorage.setItem("userId", JSON.stringify(state.userId));

    navigate("/");

    setState({
      author: "",
      content: "",
    });
  };

  return (
    <div className="Login container">
      <img src="/assets/pavicon_white.png" alt="Logo" />
      <h2>Loginnnnn</h2>
      <div>
        <h5>ID</h5>
        <input ref={userIdInput} name="userId" onChange={handleChangeState} />
      </div>
      <div>
        <h5>Password</h5>
        <input
          ref={userPasswordInput}
          type="password"
          name="userPassword"
          onChange={handleChangeState}
        />
      </div>
      <MyButton text={"로그인"} onClick={handleSubmit} />
    </div>
  );
};

export default Login;
