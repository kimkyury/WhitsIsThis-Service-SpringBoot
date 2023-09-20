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
  const [isFlipped, setIsFlipped] = useState(false);

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progressPercentage < 70) {
        setProgressPercentage((prevPercentage) => prevPercentage + 1);
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
      {/* <CircularProgressBar percentage={percentage} /> */}
      {/* <Test /> */}
      {/* <Test2 /> */}
      {/* <CaptureImage /> */}

      {/* <div
        className={["card", isFlipped ? "is-flipped" : ""].join(" ")}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card__face card__face--front">
          <div className="HouseCard">
            <h2 className="title">앞면입니당</h2>
            <CircularProgressBar percentage={0} />
            <h2 className="work_name">작업이름</h2>
          </div>
        </div>
        <div className="card__face card__face--back">
          <div className="HouseCard">
            <h2 className="title">뒷면입니당</h2>
            <CircularProgressBar percentage={10} />
            <h2 className="work_name">작업이름</h2>
          </div>
        </div>
      </div> */}

      <div className="card-container">
        <input type="checkbox" id="card-1" />
        <label htmlFor="card-1" className="card">
          <div className="front">front</div>
          <div className="back">back</div>
        </label>
      </div>

      <div className="HouseCard">
        <h2 className="title">???</h2>
        <CircularProgressBar percentage={progressPercentage} />
        <h2 className="work_name">작업이름</h2>
      </div>

      <p>Click card to flip.</p>
    </div>
  );
};

export default TestPage;
