import { useNavigate, useParams } from "react-router-dom";
import { getBuildingName } from "../utils/ParseAddress";

import { dummyBuildingData } from "../utils/DummyData";
import { useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import HouseCard from "../components/HouseCard";

const HouseList = () => {
  const { buildingId } = useParams();
  const buildingList = dummyBuildingData;
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (buildingList.length >= 1) {
      const targetBuilding = buildingList.find(
        (it) => parseInt(it.id) === parseInt(buildingId)
      );
      if (targetBuilding) {
        setData(targetBuilding);
      } else {
        alert("없는 건물입니다.");
        navigate("/search", { replace: true });
      }
    }
  }, [buildingId, buildingList]);
  if (!data) {
    return <div className="HouseList">로딩중입니다...</div>;
  } else {
    console.log(data);
    return (
      <div className="HouseList container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <div className="building_title">
              <h1>{getBuildingName(data.addr)}</h1>
              <MyButton text={"목록으로"} onClick={() => navigate(-1)} />
            </div>
            <h3>{data.addr}</h3>
          </div>
        </div>
        <div className="house_card_wrapper">
          {/* dummy houseCardList */}
          {data.houses.map((it, idx) => {
            return <HouseCard houseInfo={it} />;
          })}
        </div>
      </div>
    );
  }
};

export default HouseList;
