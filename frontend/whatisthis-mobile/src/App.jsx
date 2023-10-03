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
import { WebSocketProvider } from "./utils/WebSocket";

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

  const [isLogin, setIsLogin] = useState(false);
  const [buildingList, dispatch] = useReducer(reducer, []);

  //INIT
  const init = (data) => {
    dispatch({
      type: "INIT",
      data: data,
    });
  };

  return (
    <BrowserRouter basename={BASE_NAME}>
      <WebSocketProvider>
        <BuildingDataContext.Provider value={{ buildingList }}>
          <BuildingDispatchContext.Provider value={{ init }}>
            <div className="App">
              {/* <BrowserRouter>
          <Routes>
            <Route path="/health" element={<Health />} />
          </Routes>
        </BrowserRouter> */}
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
            </div>
          </BuildingDispatchContext.Provider>
        </BuildingDataContext.Provider>
      </WebSocketProvider>
    </BrowserRouter>
  );
}

export default App;