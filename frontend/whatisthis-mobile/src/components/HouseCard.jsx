import { useEffect, useState } from "react";
import CircularProgressBar from "../test/CircularProgressBar";

const HouseCard = ({ houseInfo, onClick, percentageObj }) => {
  const [progressPercentage, setProgressPercentage] = useState(0);

  const [currentPercentage, setCurrentPercentage] = useState(0);

  const [isSearching, setIsSearching] = useState(false);

  const checkBox = document.getElementById("card-" + houseInfo.id);

  useEffect(() => {
    if (parseInt(houseInfo.historyId) === parseInt(percentageObj.historyId)) {
      setCurrentPercentage(parseInt(percentageObj.percentage));
      setIsSearching(percentageObj.isSearching);
    }
    if (houseInfo.status === "DONE") {
      setCurrentPercentage(100);
    }
    const timer = setInterval(() => {
      if (progressPercentage < currentPercentage) {
        setProgressPercentage((prevPercentage) => prevPercentage + 1);
      }

      if (progressPercentage === 100 && checkBox) {
        setTimeout(() => {
          checkBox.checked = true;
        }, Math.floor(Math.random() * (2500 - 1000 + 1)) + 1000);
      }
    });

    return () => clearInterval(timer);
  }, [percentageObj, currentPercentage, progressPercentage]);

  return (
    <div className="HouseCard" onClick={onClick}>
      <input type="checkbox" id={`card-` + houseInfo.id} disabled />
      <label htmlFor={`card-` + houseInfo.id} className="card ">
        <div className="front HouseCard card_wrapper">
          <CircularProgressBar percentage={progressPercentage} />
          <div className="houseinfo_wrapper ">
            <h2 className="title">{houseInfo.addressDetail}</h2>
            <h3 className="address">{houseInfo.address}</h3>
            <h2 className="work_name">{isSearching ? "탐색중" : "대기중"}</h2>
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
          <div className="houseinfo_wrapper">
            <h2 className="title">{houseInfo.addressDetail}</h2>
            <h3 className="address">{houseInfo.address}</h3>
            <h2
              className="work_name"
              style={{
                color: "#ea5455",
              }}
            >
              완료
            </h2>
          </div>
        </div>
      </label>
    </div>
  );
};

export default HouseCard;
