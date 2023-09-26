import { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";
import QRCodeScanner from "./QRCodeScanner";
import Test from "./Test";
import Test2 from "./Test2";
import MyCamera from "./MyCamera";
import CaptureImage from "./CaptureImage";

import HouseCard from "../components/HouseCard";

// import "./TestPage.css";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const navigate = useNavigate();

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // 저 100 을 진행상황 받아와서 설졍해야함
      if (progressPercentage < 100) {
        setProgressPercentage((prevPercentage) => prevPercentage + 1);
      }

      if (progressPercentage === 100) {
        setTimeout(() => {
          document.getElementById("card-1").checked = true;
        }, 1000);
      }
    });

    return () => clearInterval(timer);
  }, [progressPercentage]);

  return (
    <div className="HouseCard">
      <input type="checkbox" id={`card-1`} disabled />
      <label htmlFor={`card-1`} className="card ">
        <div className="front HouseCard card_wrapper">
          <CircularProgressBar percentage={progressPercentage} />
          <div className="houseInfo_wrapper ">
            <h2 className="title">동호</h2>
            <h2 className="work_name">작업이름</h2>
            <h2 className="work_name">작업이름</h2>
          </div>
        </div>
        <div
          className="back HouseCard card_wrapper"
          style={{
            backgroundColor: "#9dd772",
          }}
        >
          <div className="image_container">
            <img src={process.env.PUBLIC_URL + `/assets/check_done.png`} alt="" />
          </div>
          <div className="houseInfo_wrapper">
            <h2 className="title">동호</h2>
            <h2 className="work_name">작업이름</h2>
            <h2 className="work_name">작업이름</h2>
          </div>
        </div>
      </label>
    </div>
  );
};

export default TestPage;
