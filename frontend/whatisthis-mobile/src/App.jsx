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
import AuthAxios from "./utils/AuthAxios";

export const BuildingDataContext = React.createContext();

function App() {
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";

  const [isLogin, setIsLogin] = useState(false);
  const [buildinglist, setBuildingList] = useState();
  useEffect(() => {
    // 토큰 만료됐을때 다시 로그인하면 데이터 가져오게끔 해야함
    const localData = localStorage.getItem("userInfo");
    if (localData) {
      const userData = JSON.parse(localData);

      if (userData) {
        setIsLogin(true);
        console.log("hello");
      }
    } else {
      console.log("notloggin");
    }
    const getBuildingList = async () => {
      try {
        const response = await AuthAxios({
          method: "get",
          url: "/requests/assigned",
        });
        setBuildingList(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getBuildingList();
  }, []);

  return (
    <BuildingDataContext.Provider value={buildinglist}>
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
            <Route path="/connection/:buildingId/:houseId/result" element={<ConnectionResult />} />
            <Route path="/house/:buildingId/:houseId" element={<HouseDetail />} />
            <Route path="/houselist/:buildingId" element={<HouseList />} />
            <Route path="/house/:buildingId/:houseId/result" element={<HouseResult />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:buildingId" element={<SearchDetail />} />
            <Route path="/camera" element={<Camera />} />
          </Routes>
        </BrowserRouter>
      </div>
    </BuildingDataContext.Provider>
  );
}

export default App;
