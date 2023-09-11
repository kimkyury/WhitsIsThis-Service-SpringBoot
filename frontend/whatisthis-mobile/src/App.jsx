import React, { useEffect, useReducer, useRef } from "react";

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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/connectionresult" element={<ConnectionResult />} />
          <Route path="/house/:id" element={<HouseDetail />} />
          <Route path="/houselist" element={<HouseList />} />
          <Route path="/house/:id/result" element={<HouseResult />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<SearchDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
