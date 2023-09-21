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
    // <div className="HouseCard" onClick={onClick}>
    //   <h2 className="title">
    //     {houseInfo.dong}동{houseInfo.ho}호
    //   </h2>
    //   <CircularProgressBar percentage={progressPercentage} />
    //   <h2 className="work_name">작업이름</h2>
    // </div>
    <div className="HouseCard" onClick={onClick}>
      <input type="checkbox" id={`card-` + houseInfo.id} disabled />
      <label htmlFor={`card-` + houseInfo.id} className="card">
        <div className="front HouseCard">
          <h2 className="title">
            {houseInfo.dong}동{houseInfo.ho}호
          </h2>
          <CircularProgressBar percentage={progressPercentage} />
          <h2 className="work_name">작업이름</h2>
        </div>
        <div
          className="back HouseCard"
          style={{
            backgroundColor: "#9dd772",
          }}
        >
          <h2 className="title">
            {houseInfo.dong}동{houseInfo.ho}호
          </h2>
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
  );
};

export default HouseCard;
