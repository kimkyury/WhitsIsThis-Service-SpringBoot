import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBuildingName } from "../utils/ParseAddress";

import Notification from "../components/Notification";
import HouseInfo from "../components/HouseInfo";

import { dummyBuildingData } from "../utils/DummyData";

const SearchDetail = () => {
  const { id } = useParams();
  const buildingList = dummyBuildingData;
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (buildingList.length >= 1) {
      const targetBuilding = buildingList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetBuilding) {
        setData(targetBuilding);
      } else {
        alert("없는 건물입니다.");
        navigate("/search", { replace: true });
      }
    }
  }, [id, buildingList]);

  const handleHouseInfoClick = (info) => {
    if (info.status === "done") {
      console.log("done");
      navigate(`/house/${data.id}/${info.id}/result`);
    } else {
      if (info.isConnected) {
        navigate(`/houselist/:${data.id}`);
      } else if (!info.isConnected) {
        navigate(`/connection/${data.id}/${info.id}`);
      }
    }
  };

  if (!data) {
    return <div className="SearchDetail">로딩중입니다...</div>;
  } else {
    return (
      <div className="SearchDetail container">
        <div className="building_info_wrapper">
          <h1>{getBuildingName(data.addr)}</h1>
          <h3>{data.addr}</h3>
        </div>
        <div className="house_info_list_wrapper">
          {data.houses.map((it, idx) => {
            return (
              <HouseInfo
                key={idx}
                houseInfo={it}
                onClick={() => handleHouseInfoClick(it)}
              />
            );
          })}
        </div>
        <Notification
          type={"left"}
          text={"뒤로가기"}
          onClick={() => navigate(-1)}
        />
      </div>
    );
  }
};

export default SearchDetail;
