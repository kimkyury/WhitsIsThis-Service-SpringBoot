import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MyButton from "../components/MyButton";
import SerialNumberRecognition from "../components/SerialNumberRecognition";

import QRrecognition from "../components/QRrecognition";
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
        // console.log(response.data.data);
        setTargetHouse(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getTargetHouse();
  }, []);

  const handleConnectionMethodTymeClick = () => {
    setIsSnum(!isSnum);
  };
  const handleOpenSnumRecognition = () => {
    setIsSnum(!isSnum);
  };

  const connect = async (serialNumber) => {
    console.log("target", targetHouse.history.id, "serialNumber", serialNumber);
    handleSend("REGISTER", {
      historyId: targetHouse.history.id,
      serialNumber: serialNumber,
    });

    // if (receivedMessage && receivedMessage.data.message === "SUCCESS") {
    if (receivedMessage) {
      navigate(`/connection/${buildingId}/${houseId}/result`, {
        state: {
          serialNumber: serialNumber,
          historyId: targetHouse.history.id,
          connectState: true,
        },
        replace: true,
      });
      console.log("얄루");
    } else {
      navigate(`/connection/${buildingId}/${houseId}/result`, {
        state: {
          serialNumber: serialNumber,
          historyId: targetHouse.history.id,
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
    return (
      <div className="Connection">
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
