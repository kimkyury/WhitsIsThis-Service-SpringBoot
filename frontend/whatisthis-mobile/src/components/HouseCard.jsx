import { useEffect, useState } from "react";
import CircularProgressBar from "../test/CircularProgressBar";

const HouseCard = ({ houseInfo, onClick, currentPercentage }) => {
  const [progressPercentage, setProgressPercentage] = useState(0);

  const checkBox = document.getElementById("card-" + houseInfo.id);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progressPercentage < currentPercentage) {
        setProgressPercentage((prevPercentage) => prevPercentage + 1);
      }

      if (progressPercentage === 100 && checkBox) {
        setTimeout(() => {
          checkBox.checked = true;
        }, 1000);
      }
    });

    return () => clearInterval(timer);
  }, [progressPercentage]);

  // 퍼센트 100퍼이면 다른거 보여줘야함

  return (
    <div className="HouseCard" onClick={onClick}>
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

export default HouseCard;
