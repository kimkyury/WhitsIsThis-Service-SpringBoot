import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MyButton from "../components/MyButton";
import Notification from "../components/Notification";

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [workInProgress, setWorkInprogress] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem("userId");
    if (localData) {
      const userData = JSON.parse(localData);

      if (userData.length >= 1) {
        setIsLogin(true);
      }
    }
  }, []);

  const logout = () => {
    console.log("logged out");
    localStorage.removeItem("userId");
    setIsLogin(false);
  };

  return (
    <div className="Home container">
      {/* 현재 작업중인 업무가 있는 경우 */}

      {isLogin && workInProgress && (
        <Notification
          type={"right"}
          text={"작업 진행중"}
          onClick={() => navigate("/houselist")}
        />
      )}

      <img src="/assets/logo_white.png" alt="Logo" />
      {!isLogin ? (
        <MyButton text={"로그인"} onClick={() => navigate("/login")} />
      ) : (
        <>
          <MyButton text={"검색"} onClick={() => navigate("/search")} />
          <MyButton text={"로그아웃"} onClick={logout} />
        </>
      )}
    </div>
  );
};

export default Home;
