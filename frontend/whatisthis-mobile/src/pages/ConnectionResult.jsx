import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Notification from "../components/Notification";
import { BuildingDataContext } from "../App";
import AuthHttp from "../utils/AuthHttp";
import { useWebSocket } from "../utils/WebSocket";

const ConnectionResult = () => {
  const navigate = useNavigate();

  const { buildingId, houseId } = useParams();
  const { serialNumber, connectState } = useLocation().state;

  const [targetHouse, setTargetHouse] = useState();
  const { ws, receivedMessage } = useWebSocket();

  useEffect(() => {
    const getTargetHouse = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/requests/${houseId}`,
        });
        setTargetHouse(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getTargetHouse();
    // console.log(targetHouse);
  }, []);

  const startWorking = async () => {
    // houselist 추가하는 로직

    try {
      // start가 정상적으로 전달 됐는지 몰라도 되려나..?
      handleSend("COMMAND", {
        command: "START",
        serialNumber: serialNumber,
      });
      const response = await AuthHttp({
        method: "patch",
        url: `/private/requests/${houseId}/status`,
        data: {
          status: "IN_PROGRESS",
        },
      });
      console.log(response);

      console.log(targetHouse);
    } catch (e) {
      console.error(e);
    }
    navigate(`/houselist`, { replace: true });
  };

  const handleSend = (type, data) => {
    if (!ws) {
      console.log("소켓 없음");
      return;
    }
    const message = {
      type: type,
      data: data,
    };
    const messageString = JSON.stringify(message, null, 2);
    ws.send(messageString);
  };

  if (!targetHouse) {
    return <div className="ConnectionResult">로딩중입니다...</div>;
  } else {
    return (
      <div className="ConnectionResult container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <h1>{targetHouse.addressDetail}</h1>
            <h3>{targetHouse.address}</h3>
          </div>
        </div>
        <div className="connect_info_wrapper">
          <img
            src={
              process.env.PUBLIC_URL + `/assets/${connectState ? "check_big" : "uncheck_big"}.png`
            }
            alt="chkimg"
          />
          <h1>[ {serialNumber} ]</h1>
          {connectState ? <h2>기기연결 성공!</h2> : <h2>기기연결 실패..</h2>}
        </div>

        <div className="button_wrapper">
          {connectState ? (
            <>
              <Notification
                text={"점검시작"}
                type={"right"}
                color={"green"}
                onClick={startWorking}
              />
              <Notification
                text={"기기변경"}
                type={"right"}
                color={"orange"}
                onClick={() =>
                  navigate(`/connection/${buildingId}/${houseId}`, {
                    replace: true,
                  })
                }
              />
            </>
          ) : (
            <>
              <Notification
                text={"다시연결"}
                type={"left"}
                color={"orange"}
                onClick={() =>
                  navigate(`/connection/${buildingId}/${houseId}`, {
                    replace: true,
                  })
                }
              />
              <Notification
                text={"뒤로가기"}
                type={"left"}
                onClick={() => navigate(`/search/${buildingId}`, { replace: true })}
              />
            </>
          )}
        </div>
      </div>
    );
  }
};

export default ConnectionResult;