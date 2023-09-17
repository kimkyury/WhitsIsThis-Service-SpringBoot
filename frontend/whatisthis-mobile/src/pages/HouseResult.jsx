import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Notification from "../components/Notification";
import { dummyBuildingData, dummyHouseData } from "../utils/DummyData";
import { getBuildingName } from "../utils/ParseAddress";

const HouseResult = () => {
  const navigate = useNavigate();

  const { buildingId, houseId } = useParams();
  const buildingList = dummyBuildingData;
  const houseList = dummyHouseData;

  const [addr, setAddr] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    if (buildingList.length >= 1) {
      const targetBuilding = buildingList.find(
        (it) => parseInt(it.id) === parseInt(buildingId)
      );
      if (targetBuilding) {
        if (targetBuilding.houses.length >= 1) {
          const targetHouse = targetBuilding.houses.find(
            (it) => parseInt(it.id) === parseInt(houseId)
          );
          setAddr(targetBuilding.addr);
          if (targetHouse) {
            setData(targetHouse);
          } else {
            alert("없는 세대입니다.");
            navigate("/search", { replace: true });
          }
        }
      } else {
        alert("없는 건물입니다.");
        navigate("/search", { replace: true });
      }
    }
  }, [houseId, houseList]);

  const handleAcceptClick = () => {
    //승인 했을 때 발생될 로직
    navigate(`/houselist/${buildingId}`, { replace: true });
  };

  if (!data) {
    return <div className="HouseResult">로딩중입니다...</div>;
  } else {
    return (
      <div className="HouseResult container">
        <img src="/assets/check_big.png" alt="" />
        <div className="building_info_wrapper">
          <h2>
            {data.dong}동{data.ho}호
          </h2>
          <h4>{addr}</h4>
        </div>
        <div className="result_list">
          {/* dummy start */}
          <div className="result_dummy">
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
            <h2>기기가 발견한 결함</h2>
          </div>
          {/* dummy end */}
        </div>
        <div className="button_wrapper">
          <Notification text={"보고서 확인"} type={"left"} color={"grey"} />
          <Notification
            text={"완료승인"}
            type={"right"}
            color={"green"}
            onClick={handleAcceptClick}
          />
        </div>
      </div>
    );
  }
};

export default HouseResult;
