import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBuildingName } from "../utils/ParseAddress";

import Notification from "../components/Notification";
import HouseInfo from "../components/HouseInfo";

// buildinglist 를 context 로 받아와도 될듯
import { BuildingDataContext } from "../App";

const SearchDetail = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();

  const houseList = useContext(BuildingDataContext)[parseInt(buildingId)];
  console.log(houseList);

  const handleHouseInfoClick = (info) => {
    if (info.status === "DONE") {
      navigate(`/house/${info.id}/result`);
    } else {
      if (info.status === "IN_PROGRESS") {
        navigate(`/houselist`);
      } else if (!info.isConnected) {
        navigate(`/connection/${buildingId}/${info.id}`);
      }
    }
  };

  if (!houseList) {
    return <div className="SearchDetail">로딩중입니다...</div>;
  } else {
    return (
      <div className="SearchDetail container">
        <div className="building_info_wrapper">
          <h1>{getBuildingName(houseList.address)}</h1>
          <h3>{houseList.address}</h3>
        </div>
        <div className="house_info_list_wrapper">
          {houseList &&
            houseList.requests.map((it, idx) => {
              return (
                <HouseInfo key={idx} houseInfo={it} onClick={() => handleHouseInfoClick(it)} />
              );
            })}
        </div>
        <Notification
          type={"left"}
          text={"뒤로가기"}
          color={"orange"}
          onClick={() => navigate(`/search`)}
        />
      </div>
    );
  }
};

export default SearchDetail;
