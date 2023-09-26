// HouseDetail
// 	AddSection
// 	SectionList
// 	SectionDetail
// 	SectionDetailCamera

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MyButton from "../components/MyButton";
import HouseTodoList from "../components/HouseTodoList";
import { BuildingDataContext } from "../App";
import AuthHttp from "../utils/AuthHttp";

const HouseDetail = () => {
  const navigate = useNavigate();

  const { houseId } = useParams();

  const [targetHouse, setTargetHouse] = useState();

  const [isOpenTodoList, setIsOpenTodoList] = useState(false);

  // 맵을 만드는지 확인 상태변수
  const [isCreatingMap, setIsCreatingMap] = useState(true);

  // 모든 검사를 마쳤는지 확인
  // 값 받아와서 설정해주기
  const [isFinish, setIsFinish] = useState(
    targetHouse && targetHouse.stats === "DONE" ? true : false
  );

  useEffect(() => {
    const getTargetHouse = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/requests/${houseId}`,
        });
        // console.log(response.data.data);
        setTargetHouse(response.data.data);
        test(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    const test = async (houseInfo) => {
      console.log(houseInfo);
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/histories/${houseInfo.history.id}/todolists`,
        });
        console.log(response.data.data);
        // setTargetHouse(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    getTargetHouse();
  }, []);

  // useEffect(() => {
  //   if (buildingList.length >= 1) {
  //     const targetBuilding = buildingList.find((it) => parseInt(it.id) === parseInt(buildingId));
  //     if (targetBuilding) {
  //       if (targetBuilding.houses.length >= 1) {
  //         const targetHouse = targetBuilding.houses.find(
  //           (it) => parseInt(it.id) === parseInt(houseId)
  //         );
  //         setAddr(targetBuilding.addr);
  //         if (targetHouse) {
  //           setData(targetHouse);
  //         } else {
  //           alert("없는 세대입니다.");
  //           navigate("/search", { replace: true });
  //         }
  //       }
  //     } else {
  //       alert("없는 건물입니다.");
  //       navigate("/search", { replace: true });
  //     }
  //   }
  // }, [houseId, houseList]);

  const handleOpenTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  if (!targetHouse) {
    return <div className="HouseDetail">로딩중입니다...</div>;
  } else {
    // 작업 상태가 도면을 만드는 중이면 도면을 만드는 로딩 사진 아니면 디테일 보여줌
    return isCreatingMap ? (
      <div className="HouseDetail container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <div className="building_title">
              <h1>{targetHouse.addressDetail}</h1>
              <h1 className="proecss_percentge">NN%</h1>
            </div>
            <h3>{targetHouse.address}</h3>
          </div>
        </div>

        <div className="loading_create_map">
          <span className="loader" />
          <img
            src={process.env.PUBLIC_URL + `/assets/turtlebot.png`}
            alt=""
            // 임시로 바뀌게 해뒀습니다.
            onClick={() => setIsCreatingMap(!isCreatingMap)}
          />
        </div>

        <div className="button_wrapper">
          <MyButton text={"추가정보 입력"} color={"orange"} onClick={() => handleOpenTodoList()} />
          <MyButton
            text={"점검완료"}
            color={"green"}
            onClick={() => navigate(`/house/${houseId}/result`)}
            isFinish={isFinish}
          />
        </div>

        {/* 닫겼다가 다시 열릴때 새 페이지를 보여줄까 아니면 기존 상태 그대로 보여주는게 나을까 */}
        {<HouseTodoList isOpen={isOpenTodoList} handleOpenTodoList={handleOpenTodoList} />}
      </div>
    ) : (
      <div className="HouseDetail container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <div className="building_title">
              <h1>{targetHouse.addressDetail}</h1>
              <h1 className="proecss_percentge">NN%</h1>
            </div>
            <h3>{targetHouse.address}</h3>
          </div>
        </div>

        <div className="map_wrapper">
          <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="map" />
        </div>
        <div className="carousel">
          <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="map" />
          <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="map" />
          <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="map" />
          <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="map" />
          <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="map" />
          <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="map" />
        </div>

        <div className="button_wrapper">
          <MyButton text={"추가정보 입력"} color={"orange"} onClick={() => handleOpenTodoList()} />
          <MyButton
            text={"점검완료"}
            color={"green"}
            onClick={() => navigate(`/house/${houseId}/result`)}
          />
        </div>

        {/* 닫겼다가 다시 열릴때 새 페이지를 보여줄까 아니면 기존 상태 그대로 보여주는게 나을까 */}
        {<HouseTodoList isOpen={isOpenTodoList} handleOpenTodoList={handleOpenTodoList} />}
      </div>
    );
  }
};

export default HouseDetail;
