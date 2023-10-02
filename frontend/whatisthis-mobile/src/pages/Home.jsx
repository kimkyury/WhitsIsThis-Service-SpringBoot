import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MyButton from "../components/MyButton";
import Notification from "../components/Notification";
import { BuildingDispatchContext } from "../App";
import AuthHttp from "../utils/AuthHttp";

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [workInProgress, setWorkInprogress] = useState(true);

  const { init } = useContext(BuildingDispatchContext);

  const [socket, setSocket] = useState(null);
  const [type, setType] = useState("");
  const [datas, setDatas] = useState({});
  const [displayMessage, setDisplayMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  // const handleConnect = () => {
  //   const ws = new WebSocket(process.env.REACT_APP_WS_BASE_URL);

  //   ws.onopen = () => {
  //     console.log("connected!!");
  //     setSocket(ws);
  //   };

  //   ws.onerror = (error) => {
  //     console.log("Connection error..");
  //     console.error(error);
  //   };

  //   ws.onmessage = (e) => {
  //     const data = JSON.parse(e.data);
  //     const formattedData = JSON.stringify(data, null, 2);
  //     setReceivedMessage(formattedData);
  //   };

  //   ws.onclose = (e) => {
  //     alert("소켓 연결 끊김!");
  //     console.error(e);
  //   };
  // };

  const handleSend = (type, data) => {
    if (!socket) return;

    const message = {
      type: type,
      data: data,
    };

    const messageString = JSON.stringify(message, null, 2);

    setDisplayMessage(JSON.stringify(message, null, 2));

    socket.send(messageString);
  };

  useEffect(() => {
    const getBuildingList = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: "/private/requests/assigned",
        });
        const data = response.data.data;
        console.log(response.data.data);
        if (data.length >= 1) {
          init(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const localData = localStorage.getItem("userInfo");
    if (localData) {
      const userData = JSON.parse(localData);

      if (userData) {
        setIsLogin(true);
        getBuildingList();
      }
    }

    setType("AUTH");
    const token = localStorage.getItem("token");
    setDatas({ accessToken: token });

    handleSend("AUTH", { accessToken: token });
    // handleConnect();
  }, []);

  const logout = async () => {
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
    //진행중인 작업이 있으면 활성화 하고 해당 houselist 로 보내벌임
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
