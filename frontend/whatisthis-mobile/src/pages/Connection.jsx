import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MyButton from "../components/MyButton";
import SerialNumberRecognition from "../components/SerialNumberRecognition";

import QRrecognition from "../components/QRrecognition";
import { BuildingDataContext } from "../App";
import AuthHttp from "../utils/AuthHttp";
import { useWebSocket } from "../utils/WebSocket";
const Connection = () => {
  const { buildingId } = useParams();
  const { houseId } = useParams();

  const [targetHouse, setTargetHouse] = useState();
  const navigate = useNavigate();
  const { ws, receivedMessage } = useWebSocket();

  const [isSnum, setIsSnum] = useState(false);

  useEffect(() => {
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
    console.log(targetHouse);
  }, []);

  const handleConnectionMethodTymeClick = () => {
    // 카메라 멈추고 시리얼넘버 컴포넌트 스폰 토글..
    setIsSnum(!isSnum);
  };
  const handleOpenSnumRecognition = () => {
    setIsSnum(!isSnum);
  };

  const connect = async (serialNumber) => {
    //소켓 연결

    handleSend("REGISTER", {
      historyId: targetHouse.history.id,
      serialNumber: serialNumber,
    });

    if (receivedMessage && receivedMessage.data.message === "SUCCESS") {
      navigate(`/connection/${buildingId}/${houseId}/result`, {
        state: {
          serialNumber: serialNumber,
          connectState: true,
        },
        replace: true,
      });
      console.log("얄루");
    } else {
      navigate(`/connection/${buildingId}/${houseId}/result`, {
        state: {
          serialNumber: serialNumber,
          connectState: false,
        },
        replace: true,
      });
    }
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
    return <div className="Connection">로딩중입니다...</div>;
  } else {
    return (
      <div className="Connection container">
        <div className="header">
          <div className="building_info_wrapper">
            <h2>{targetHouse.addressDetail}</h2>
            <h4>{targetHouse.address}</h4>
          </div>
          <div className="connection_method_wrapper">
            <img
              src={process.env.PUBLIC_URL + `/assets/qr.png`}
              alt="QR"
              onClick={() => handleConnectionMethodTymeClick()}
            />
            <img
              src={process.env.PUBLIC_URL + `/assets/snum.png`}
              alt="SNUM"
              onClick={() => handleConnectionMethodTymeClick()}
            />
          </div>
        </div>
        {/* camera container */}
        <div className="camera_container">
          <img src={process.env.PUBLIC_URL + `/assets/camera_frame_small.png`} alt="" />
          <QRrecognition connect={connect} />
        </div>

        <h2>기기의 QR을 인식</h2>

        <MyButton color={"black"} text={"돌아가기"} onClick={() => navigate(-1)} />
        {
          <SerialNumberRecognition
            isOpen={isSnum}
            buildingId={buildingId}
            houseId={houseId}
            historyId={targetHouse.history.id}
            handleOpenSnumRecognition={handleOpenSnumRecognition}
          />
        }
      </div>
    );
  }
};

export default Connection;
