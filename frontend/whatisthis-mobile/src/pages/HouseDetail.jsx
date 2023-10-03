import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MyButton from "../components/MyButton";
import HouseTodoList from "../components/HouseTodoList";
import AuthHttp from "../utils/AuthHttp";
import { useWebSocket } from "../utils/WebSocket";

const HouseDetail = () => {
  const navigate = useNavigate();

  const { houseId } = useParams();

  const [targetHouse, setTargetHouse] = useState();

  const [isOpenTodoList, setIsOpenTodoList] = useState(false);

  // 맵을 만드는지 확인 상태변수
  const [isCreatingMap, setIsCreatingMap] = useState(true);

  const { ws, receivedMessage } = useWebSocket();

  // 모든 검사를 마쳤는지 확인
  // 값 받아와서 설정해주기
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    console.log(targetHouse);
    // setIsFinish(targetHouse && targetHouse.status === "DONE" ? true : false);
    const getTargetHouse = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/requests/${houseId}`,
        });
        console.log(response.data.data);
        setTargetHouse(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getTargetHouse();
  }, []);

  const handleOpenTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  const handleIsFinish = (state) => {
    setIsFinish(state);
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
              <h1 className="proecss_percentge">탐색중</h1>
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
        {
          <HouseTodoList
            handleIsFinish={handleIsFinish}
            historyId={targetHouse.history.id}
            isOpen={isOpenTodoList}
            handleOpenTodoList={handleOpenTodoList}
          />
        }
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
            isFinish={isFinish}
          />
        </div>

        {/* 닫겼다가 다시 열릴때 새 페이지를 보여줄까 아니면 기존 상태 그대로 보여주는게 나을까 */}
        {
          <HouseTodoList
            handleIsFinish={handleIsFinish}
            requestContent={targetHouse.requestContent}
            historyId={targetHouse.history.id}
            isOpen={isOpenTodoList}
            handleOpenTodoList={handleOpenTodoList}
          />
        }
      </div>
    );
  }
};

export default HouseDetail;
