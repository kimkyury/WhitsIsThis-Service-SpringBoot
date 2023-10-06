import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import MyButton from "../components/MyButton";
import HouseTodoList from "../components/HouseTodoList";
import AuthHttp from "../utils/AuthHttp";
import { useWebSocket } from "../utils/WebSocket";

const HouseDetail = () => {
  const navigate = useNavigate();
  const { houseId } = useParams();
  const [targetHouse, setTargetHouse] = useState();
  const [isOpenTodoList, setIsOpenTodoList] = useState(false);

  const historyId = useLocation().state.historyId;
  const isFinding = useLocation().state.isFinding;

  const [processPercentage, setProcessPercentage] = useState(0);

  const [isCreatingMap, setIsCreatingMap] = useState(isFinding);
  const [map, setMap] = useState(null);
  const { ws, receivedMessage } = useWebSocket();

  const [isTodoFinish, setTodoFinish] = useState(false);
  const [isInspectFinish, setIsInspectFinish] = useState(false);

  const [damagedImage, setDamagedImage] = useState([]);

  useEffect(() => {
    const getTargetHouse = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/requests/${houseId}`,
        });
        // console.log(response.data.data);
        // getMap(response.data.data.history.id);
        setTargetHouse(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    getTargetHouse();
  }, []);

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      console.log(data.data.historyId, historyId);

      if (parseInt(data.data.historyId) !== parseInt(historyId)) {
        return;
      }

      if (data.type === "DAMAGED") {
        console.error("하우수디테이루", data);
      } else {
        console.log("하우수디테이루", data);
      }

      if (data.type === "DRAWING") {
        setMap(data.data.image);
      }

      if (data.data.state && data.data.state === "FINDING") {
        console.log("hello");
        setIsCreatingMap(false);
        return;
      }
      if (data.type && data.type === "COMPLETION_RATE") {
        if (isCreatingMap === true) {
          setIsCreatingMap(false);
        }
        if (data.data.rate >= 98) {
          setProcessPercentage(100);
          //연결 끊기
          const message = {
            type: "COMMAND",
            data: { command: "END", serialNumber: data.data.serialNumber },
          };
          const messageString = JSON.stringify(message, null, 2);
          ws.send(messageString);
          setIsInspectFinish(true);
        } else {
          setProcessPercentage(parseInt(data.data.rate));
        }
      }
      if (data.type && data.type === "DAMAGED") {
        console.log("damage", data.data.image);
        if (isCreatingMap === true) {
          setIsCreatingMap(false);
        }
        setDamagedImage((prevData) => [data.data, ...prevData]);
      }
    };
  }, [ws]);

  const handleOpenTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  const handleIsFinish = (state) => {
    setTodoFinish(state);
  };

  const getPercentage = () => {
    const rate = receivedMessage?.data?.rate;
    if (rate) {
      setProcessPercentage(parseInt(rate));
      return rate;
    }
    return processPercentage;
  };

  const endInspection = () => {
    navigate(`/house/${houseId}/result`);
  };

  if (!targetHouse) {
    return (
      <div className="HouseDetail">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="loader2"></span>
          <div style={{ marginTop: "1rem" }}>로딩중입니다</div>
          <MyButton
            text={"처음으로"}
            color={"orange"}
            onClick={() => navigate("/", { replace: true })}
          />
        </div>
      </div>
    );
  } else {
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
            isFinish={isTodoFinish && isInspectFinish}
          />
        </div>

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
              <h1 className="proecss_percentge">{getPercentage()}%</h1>
            </div>
            <h3>{targetHouse.address}</h3>
          </div>
        </div>

        <div className="map_wrapper">
          {map ? (
            <img src={map} alt="map" />
          ) : (
            <img src={process.env.PUBLIC_URL + "/assets/image_none.png"} alt="nomap" />
          )}
        </div>
        <div className="carousel">
          {damagedImage &&
            damagedImage.map((image, idx) => {
              return <img key={idx} src={image.image} alt="dmagedImg" />;
            })}
        </div>

        <div className="button_wrapper">
          <MyButton text={"추가정보 입력"} color={"orange"} onClick={() => handleOpenTodoList()} />
          <MyButton
            text={"점검완료"}
            color={"green"}
            onClick={endInspection}
            isFinish={isTodoFinish && isInspectFinish}
          />
        </div>

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
