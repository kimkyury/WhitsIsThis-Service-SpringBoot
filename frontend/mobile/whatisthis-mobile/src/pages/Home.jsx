import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MyButton from "../components/MyButton";
import Notification from "../components/Notification";
import { BuildingDispatchContext } from "../App";
import AuthHttp from "../utils/AuthHttp";

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [workInProgress, setWorkInprogress] = useState(false);

  const { init } = useContext(BuildingDispatchContext);

  useEffect(() => {
    const getBuildingList = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: "/private/requests/assigned",
        });
        const data = response.data.data;
        if (data.length >= 1) {
          init(data);
          setWorkInprogress(checkInProgress(data));
        }
      } catch (e) {
        console.error(e);
      }
    };

    const checkInProgress = (buildingList) => {
      const isInProgress = buildingList.some((building) => {
        return building.requests.some((request) => request.status === "IN_PROGRESS");
      });

      return isInProgress;
    };

    const localData = localStorage.getItem("userInfo");
    if (localData) {
      const userData = JSON.parse(localData);

      if (userData) {
        setIsLogin(true);
        getBuildingList();
      }
    }
  }, []);

  const logout = async () => {
    //임시
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    try {
      const response = await AuthHttp({
        method: "post",
        url: `/private/auth/logout`,
      });

      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      console.log("logout success", response);
      setIsLogin(false);

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const moveToWorkInProgress = () => {
    navigate("/houselist");
  };

  return (
    <div className="Home container">
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
