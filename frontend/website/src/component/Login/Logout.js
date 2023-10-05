import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";
  const handleLogout = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      if (accessToken) {
        // Send a POST request to the logout API with accessToken in Authorization header
        await axios.post(
          `${BASE_URL}/api/v1/private/auth/logout`,
          {},
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
      }

      // Assuming the logout was successful, clear the token from localStorage
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      sessionStorage.removeItem("imageurl");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("phone");
      sessionStorage.removeItem("accessToken");
      // sessionStorage.clear();
      // Cookies.clear();
      // Optionally, you can clear other data from localStorage as well, e.g., username
      localStorage.removeItem("username");
      // Redirect the user to the webmain page
      window.location.href = BASE_NAME + "/";

      console.log("로그아웃 성공");
    } catch (error) {
      // Handle logout error here
      console.error("로그아웃 실패", error);
      navigate("/");

      // Even if there is an error, clear the token from both localStorage and cookies

      // navigate('/');
    }
  };

  return (
    <div>
      <button className="font buttonta" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default Logout;
