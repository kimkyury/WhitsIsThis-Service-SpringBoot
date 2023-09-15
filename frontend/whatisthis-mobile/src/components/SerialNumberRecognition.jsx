import { useRef, useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const SerialNumberRecognition = ({ addr, isOpen, buildingId, houseId }) => {
  const navigate = useNavigate();

  const [serialNumber, setSerialNumber] = useState("");

  const modalStatus = isOpen ? "slide_up" : "slide_out";

  const serialNumberInput = useRef();

  const handleChangeSnum = (e) => {
    setSerialNumber(e.target.value);
  };

  const connect = () => {
    if (serialNumber.length < 5) {
      serialNumberInput.current.focus();
      return;
    }
    navigate(`/connection/${buildingId}/${houseId}/result`, {
      state: {
        addr: addr,
        serialNumber: serialNumber,
      },
      replace: true,
    });
  };

  return (
    <div className={`SerialNumberRecognition options ${modalStatus}`}>
      <div className="option_header">
        <img src="/assets/stick_small.png" alt="" />
      </div>
      <img
        className="img_turtlebot"
        src="/assets/turtlebot.png"
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
      <MyButton text={"연결하기"} onClick={connect} />
    </div>
  );
};

SerialNumberRecognition.defaultProps = {
  isOpen: false,
};

export default SerialNumberRecognition;
