import { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";
import QRCodeScanner from "./QRCodeScanner";
import Test from "./Test";
import Test2 from "./Test2";
import MyCamera from "./MyCamera";
import CaptureImage from "./CaptureImage";

import HouseCard from "../components/HouseCard";

import "./TestPage.css";

const TestPage = () => {
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
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="card-container">
        <input type="checkbox" id="card-1" disabled />
        <label htmlFor="card-1" className="card">
          <div className="front HouseCard">
            <h2 className="title">???</h2>
            <CircularProgressBar percentage={progressPercentage} />
            <h2 className="work_name">작업이름</h2>
          </div>
          <div
            className="back HouseCard"
            style={{
              backgroundColor: "#9dd772",
            }}
          >
            <h2 className="title">???</h2>
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "6.5625rem",
              }}
            >
              <img
                style={{ width: "7rem" }}
                src={process.env.PUBLIC_URL + `/assets/check_done.png`}
                alt=""
              />
            </div>

            <h2 className="work_name">작업이름</h2>
          </div>
        </label>
      </div>

      <p>쮜바.. 집에보내줘..</p>
    </div>
  );
};

export default TestPage;
