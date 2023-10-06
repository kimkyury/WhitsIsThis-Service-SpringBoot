// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated }) => {
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    // 사용자가 인증되지 않은 경우, 로그인 페이지로 리다이렉트
    return <Navigate to="/" />;
  }
  return <Route element={element} />;
};

export default PrivateRoute;
