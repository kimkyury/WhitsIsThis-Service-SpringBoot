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
      setHouseList(
        buildingList
          .map((building) => {
            const requests = building.requests.map((request) => {
              const newRequest = { ...request };
              newRequest.address = building.address;
              return newRequest;
            });

            return requests;
          })
          .flat()
          .filter((request) => request.status === "IN_PROGRESS" || request.status === "DONE")
          .sort((a, b) => {
            if (a.status === "DONE" && b.status !== "DONE") {
              return 1;
            } else if (a.status !== "DONE" && b.status === "DONE") {
              return -1;
            } else {
              return 0;
            }
          })
      );
      console.log(
        buildingList
          .map((building) => {
            const requests = building.requests.map((request) => {
              const newRequest = { ...request };
              newRequest.address = building.address;
              return newRequest;
            });

            return requests;
          })
          .flat()
          .filter((request) => request.status === "IN_PROGRESS" || request.status === "DONE")
          .sort((a, b) => {
            if (a.status === "DONE" && b.status !== "DONE") {
              return 1;
            } else if (a.status !== "DONE" && b.status === "DONE") {
              return -1;
            } else {
              return 0;
            }
          })
      );

      // console.log(buildingList);
      // setHouseList(targetBuilding.requests.filter((request) => request.status === "IN_PROGRESS"));
      // console.log(targetBuilding.requests.filter((request) => request.status === "IN_PROGRESS"));
    }
  }, []);

  const handleHouseCardClick = (houseInfo) => {
    if (houseInfo.status !== "DONE") {
      navigate(`/house/${houseInfo.id}`);
    } else {
      navigate(`/house/${houseInfo.id}/result`);
    }
  };

  if (!buildingList) {
    return <div className="HouseList">로딩중입니다...</div>;
  } else {
    return (
      <div className="HouseList container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <div className="building_title">
              <img
                onClick={() => navigate("/")}
                src={process.env.PUBLIC_URL + `/assets/logo_blue.png`}
                alt="logo"
              />
              <MyButton color={"black"} text={"세대추가"} onClick={() => navigate(`/search`)} />
            </div>
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
                  onClick={() => handleHouseCardClick(it)}
                />
              );
            })}

          {/* 아마 사용 안할 것 같음  */}
          {/* <div className="HouseCard add_card_btn" onClick={() => navigate(`/search`)}>
            <img src={process.env.PUBLIC_URL + `/assets/plus_circle.png`} alt="add_card" />
          </div>
          {houseList && houseList.length % 2 === 0 && <div className="blank"></div>} */}
        </div>
      </div>
    );
  }
};

export default HouseList;
