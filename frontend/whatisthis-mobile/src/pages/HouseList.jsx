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
      const targetBuilding = buildingList.find((it) => parseInt(it.id) === parseInt(buildingId));
      if (targetBuilding) {
        setData(targetBuilding);
      } else {
        alert("없는 건물입니다.");
        navigate("/search", { replace: true });
      }
    }
  }, [buildingId, buildingList]);

  const handleHouseCardClick = (houseId) => {
    navigate(`/house/${buildingId}/${houseId}`);
  };

  if (!data) {
    return <div className="HouseList">로딩중입니다...</div>;
  } else {
    return (
      <div className="HouseList container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <div className="building_title">
              <h1>{getBuildingName(data.addr)}</h1>
              <MyButton
                color={"orange"}
                text={"목록으로"}
                onClick={() => navigate(`/search/${buildingId}`)}
              />
            </div>
            <h3>{data.addr}</h3>
          </div>
        </div>
        <div className="house_card_wrapper">
          {/* dummy houseCardList */}
          {data.houses.map((it, idx) => {
            return (
              <HouseCard
                key={idx}
                houseInfo={it}
                currentPercentage={Math.floor(Math.random() * 100) + 1}
                // onclick 할 때 houseinfo 등 percentage 정보를 넘겨줘서 100프로이면 바로 결과창으로 보내던지
                onClick={() => handleHouseCardClick(it.id)}
              />
            );
          })}
          <div className="HouseCard add_card_btn" onClick={() => navigate(`/search/${buildingId}`)}>
            <img src={process.env.PUBLIC_URL + `/assets/plus_circle.png`} alt="add_card" />
          </div>
          {data.houses.length % 2 === 0 && <div className="blank"></div>}
        </div>
      </div>
    );
  }
};

export default HouseList;
