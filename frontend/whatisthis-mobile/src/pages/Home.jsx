import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MyButton from "../components/MyButton";
import Notification from "../components/Notification";

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [workInProgress, setWorkInprogress] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem("userInfo");
    if (localData) {
      const userData = JSON.parse(localData);

      if (userData) {
        setIsLogin(true);
      }
    }
  }, []);

  const logout = () => {
    console.log("logged out");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    // 쿠키삭제도 해줘야합미다

    setIsLogin(false);
  };

  const moveToWorkInProgress = () => {
    //진행중인 작업이 있으면 활성화 하고 해당 houselist 로 보내벌임
    navigate("/houselist");
  };

  return (
    <div className="Home container">
      {/* 현재 작업중인 업무가 있는 경우 */}

      {isLogin && workInProgress && (
        <Notification
          type={"right"}
          text={"작업 진행중"}
          color={"grey"}
          onClick={moveToWorkInProgress}
        />
      )}

      <img src={process.env.PUBLIC_URL + `/assets/logo_white.png`} alt="Logo" />
      {!isLogin ? (
        <MyButton color={"white"} text={"로그인"} onClick={() => navigate("/login")} />
      ) : (
        <>
          <MyButton color={"white"} text={"검색"} onClick={() => navigate("/search")} />
          <MyButton color={"white"} text={"로그아웃"} onClick={logout} />
        </>
      )}
    </div>
  );
};

export default Home;
