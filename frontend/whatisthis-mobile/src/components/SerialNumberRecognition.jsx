import { useRef, useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../utils/WebSocket";

const SerialNumberRecognition = ({
  isOpen,
  buildingId,
  houseId,
  historyId,
  handleOpenSnumRecognition,
}) => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState("");
  const modalStatus = isOpen ? "slide_up" : "slide_down";
  const serialNumberInput = useRef();
  const { ws, receivedMessage } = useWebSocket();

  const handleChangeSnum = (e) => {
    setSerialNumber(e.target.value);
  };

  const connect = () => {
    if (serialNumber.length < 5) {
      serialNumberInput.current.focus();
      return;
    }
    console.log("target", historyId, "serialNumber", serialNumber);

    handleSend("REGISTER", {
      historyId: historyId,
      serialNumber: serialNumber,
    });

    if (receivedMessage) {
      // if (receivedMessage && receivedMessage.data.message === "SUCCESS") {
      console.log(receivedMessage);
      navigate(`/connection/${buildingId}/${houseId}/result`, {
        state: {
          serialNumber: serialNumber,
          historyId: historyId,

          connectState: true,
        },
        replace: true,
      });
    } else {
      console.log(receivedMessage);
      navigate(`/connection/${buildingId}/${houseId}/result`, {
        state: {
          serialNumber: serialNumber,
          historyId: historyId,

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

  return (
    <div className={`SerialNumberRecognition options ${modalStatus}`}>
      <div className="option_header" onClick={handleOpenSnumRecognition}>
        <img src={process.env.PUBLIC_URL + `/assets/stick_small.png `} alt="" />
      </div>
      <img
        className="img_turtlebot"
        src={process.env.PUBLIC_URL + `/assets/turtlebot.png`}
        alt="turtlebot"
      />
      <h2>시리얼넘버 입력</h2>
      <input
        ref={serialNumberInput}
        type="text"
        name="serialNumber"
        onChange={handleChangeSnum}
        placeholder="ex) 00-12345 의 8자 문자열입력"
      />
      <MyButton color={"black"} text={"연결하기"} onClick={connect} />
    </div>
  );
};

SerialNumberRecognition.defaultProps = {
  isOpen: false,
};

export default SerialNumberRecognition;
