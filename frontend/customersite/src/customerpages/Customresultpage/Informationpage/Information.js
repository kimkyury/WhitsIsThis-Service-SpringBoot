import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Information() {
  const navigate = useNavigate();
  const location = useLocation();

  const { content } = location.state;

  const handleHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <div>
      <div className="">
        <div className="">
          <p style={{ marginLeft: "5%" }}>✔ {content}</p>
        </div>
        <div>
          <button onClick={() => handleHome()}>홈으로</button>
        </div>
      </div>
    </div>
  );
}

export default Information;
