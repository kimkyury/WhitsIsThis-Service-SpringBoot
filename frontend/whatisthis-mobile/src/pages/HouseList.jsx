import { useNavigate, useParams } from "react-router-dom";
import { getBuildingName } from "../utils/ParseAddress";

import { useContext, useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import HouseCard from "../components/HouseCard";

import { BuildingDataContext } from "../App";

const HouseList = () => {
  const navigate = useNavigate();
  // const { buildingId } = useParams();

  const buildingList = useContext(BuildingDataContext);
  // console.log(targetBuilding);
  const [houseList, setHouseList] = useState();

  useEffect(() => {
    if (buildingList) {
      setHouseList(buildingList.map((building) => building.requests).flat());
      console.log(buildingList.map((building) => building.requests).flat());
      // console.log(buildingList);
      // setHouseList(targetBuilding.requests.filter((request) => request.status === "IN_PROGRESS"));
      // console.log(targetBuilding.requests.filter((request) => request.status === "IN_PROGRESS"));
    }
  }, []);

  const handleHouseCardClick = (houseId) => {
    navigate(`/house/${houseId}`);
  };

  if (!buildingList) {
    return <div className="HouseList">로딩중입니다...</div>;
  } else {
    return (
      <div className="HouseList container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <div className="building_title">
              <h1>여기는 이미지 넣을거임</h1>
              <MyButton color={"orange"} text={"뒤로가기"} onClick={() => navigate(`/search`)} />
            </div>
            <h3>여기는 이미지 넣을거임</h3>
          </div>
        </div>
        <div className="house_card_wrapper">
          {houseList &&
            houseList.map((it, idx) => {
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
          <div className="HouseCard add_card_btn" onClick={() => navigate(`/search`)}>
            <img src={process.env.PUBLIC_URL + `/assets/plus_circle.png`} alt="add_card" />
          </div>
          {houseList && houseList.length % 2 === 0 && <div className="blank"></div>}
        </div>
      </div>
    );
  }
};

export default HouseList;
