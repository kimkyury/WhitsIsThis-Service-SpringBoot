import { useEffect, useState } from "react";
import CircularProgressBar from "../test/CircularProgressBar";

const HouseCard = ({ houseInfo, onClick }) => {
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progressPercentage < 70) {
        setProgressPercentage((prevPercentage) => prevPercentage + 10);
      }
    });

    return () => clearInterval(timer);
  }, [progressPercentage]);

  // 퍼센트 100퍼이면 다른거 보여줘야함

  return (
    <div className="HouseCard" onClick={onClick}>
      <h2 className="title">
        {houseInfo.dong}동{houseInfo.ho}호
      </h2>
      <CircularProgressBar percentage={progressPercentage} />
      <h2 className="work_name">작업이름</h2>
    </div>
  );
};

export default HouseCard;
