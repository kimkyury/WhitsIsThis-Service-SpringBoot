// HouseDetail
// 	AddSection
// 	SectionList
// 	SectionDetail
// 	SectionDetailCamera

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyBuildingData, dummyHouseData } from "../utils/DummyData";
import { getBuildingName } from "../utils/ParseAddress";

import MyButton from "../components/MyButton";
import HouseTodoList from "../components/HouseTodoList";

const HouseDetail = () => {
  const navigate = useNavigate();

  const { buildingId, houseId } = useParams();
  const buildingList = dummyBuildingData;
  const houseList = dummyHouseData;

  const [addr, setAddr] = useState();
  const [data, setData] = useState();
  const [isOpenTodoList, setIsOpenTodoList] = useState(false);

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

  const handleOpenTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  if (!data) {
    return <div className="HouseDetail">로딩중입니다...</div>;
  } else {
    return (
      <div className="HouseDetail container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <div className="building_title">
              <h1>
                {data.dong}동{data.ho}호
              </h1>
              <h1 className="proecss_percentge">NN%</h1>
            </div>
            <h3>{addr}</h3>
          </div>
        </div>

        <div className="map_wrapper">
          <img src="/assets/image_none.png" alt="map" />
        </div>
        <div className="carousel">
          <img src="/assets/image_none.png" alt="map" />
          <img src="/assets/image_none.png" alt="map" />
          <img src="/assets/image_none.png" alt="map" />
          <img src="/assets/image_none.png" alt="map" />
          <img src="/assets/image_none.png" alt="map" />
          <img src="/assets/image_none.png" alt="map" />
        </div>

        <div className="button_wrapper">
          <MyButton
            text={"추가정보 입력"}
            color={"orange"}
            onClick={() => handleOpenTodoList()}
          />
          <MyButton
            text={"점검완료"}
            color={"green"}
            onClick={() => navigate(`/house/${buildingId}/${houseId}/result`)}
          />
        </div>

        {
          <HouseTodoList
            isOpen={isOpenTodoList}
            handleOpenTodoList={handleOpenTodoList}
          />
        }
      </div>
    );
  }
};

export default HouseDetail;
