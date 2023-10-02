import React, { useEffect, useReducer, useRef, useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Connection from "./pages/Connection";
import ConnectionResult from "./pages/ConnectionResult";
import HouseDetail from "./pages/HouseDetail";
import HouseList from "./pages/HouseList";
import HouseResult from "./pages/HouseResult";
import Search from "./pages/Search";
import SearchDetail from "./pages/SearchDetail";
import Health from "./pages/Health";

// testpage
import TestPage from "./test/TestPage";
import Camera from "./pages/Camera";
import AuthHttp from "./utils/AuthHttp";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    //필요한 action 추가.
    // case "CREATE": {
    //   newState = [action.data, ...state];
    //   break;
    // }
    // case "REMOVE": {
    //   newState = state.filter((it) => it.id !== action.targetId);
    //   break;
    // }
    // case "EDIT": {
    //   newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
    //   break;
    // }
    default:
      return state;
  }

  return newState;
};

export const BuildingDataContext = React.createContext();
export const BuildingDispatchContext = React.createContext();

function App() {
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";
  const WS_BASE_URL = process.env.REACT_APP_WS_BASE_URL || "";

  const [isLogin, setIsLogin] = useState(false);
  const [buildingList, dispatch] = useReducer(reducer, []);

  const [socket, setSocket] = useState(null);
  const [type, setType] = useState("");
  const [datas, setDatas] = useState({});
  const [displayMessage, setDisplayMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const handleConnect = () => {
    const ws = new WebSocket(`${WS_BASE_URL}`);

    ws.onopen = () => {
      console.log("connected!!");
      setSocket(ws);
    };
    ws.onerror = (error) => {
      console.log("Connection error..");
      console.error(error);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const formattedData = JSON.stringify(data, null, 2);
      setReceivedMessage(formattedData);
    };

    ws.onclose = (e) => {
      alert("소켓 연결 끊김!");
      console.error(e);
    };
  };

  useEffect(() => {
    // 토큰 만료됐을때 다시 로그인하면 데이터 가져오게끔 해야함
    const localData = localStorage.getItem("userInfo");
    if (localData) {
      const userData = JSON.parse(localData);
      if (userData) {
        if (!socket) {
          handleConnect();
        }
      }
    } else {
      console.log("notloggin");
    }
  }, [socket]);

  //INIT
  const init = (data) => {
    dispatch({
      type: "INIT",
      data: data,
    });
  };

  return (
    <BuildingDataContext.Provider value={{ buildingList, socket }}>
      <BuildingDispatchContext.Provider value={{ init }}>
        <div className="App">
          {/* <BrowserRouter>
          <Routes>
            <Route path="/health" element={<Health />} />
          </Routes>
        </BrowserRouter> */}
          <BrowserRouter basename={BASE_NAME}>
            <Routes>
              <Route path="/test" element={<TestPage />} />
              <Route path="" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connection/:buildingId/:houseId" element={<Connection />} />
              <Route
                path="/connection/:buildingId/:houseId/result"
                element={<ConnectionResult />}
              />
              <Route path="/house/:houseId" element={<HouseDetail />} />
              <Route path="/houselist" element={<HouseList />} />
              <Route path="/house/:houseId/result" element={<HouseResult />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:buildingId" element={<SearchDetail />} />
              <Route path="/camera" element={<Camera />} />
            </Routes>
          </BrowserRouter>
        </div>
      </BuildingDispatchContext.Provider>
    </BuildingDataContext.Provider>
  );
}

export default App;
