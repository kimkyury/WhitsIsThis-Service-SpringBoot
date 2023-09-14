import { useRef, useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const SerealNumberRecognition = ({ addr, isOpen, buildingId, houseId }) => {
  const navigate = useNavigate();

  const [serealNumber, setSerealNumber] = useState("");

  const modalStatus = isOpen ? "slide_up" : "slide_out";

  const serealNumberInput = useRef();

  const handleChangeSnum = (e) => {
    setSerealNumber(e.target.value);
  };

  const connect = () => {
    if (serealNumber.length < 5) {
      serealNumberInput.current.focus();
      return;
    }
    navigate(`/connection/${buildingId}/${houseId}/result`, {
      state: {
        addr: addr,
        serealNumber: serealNumber,
      },
      replace: true,
    });
  };

  return (
    <div className={`SerealNumberRecognition options ${modalStatus}`}>
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
        ref={serealNumberInput}
        type="text"
        name="serealNumber"
        onChange={handleChangeSnum}
        placeholder="ex) 00-12345 의 8자 문자열입력"
      />
      <MyButton text={"연결하기"} onClick={connect} />
    </div>
  );
};

SerealNumberRecognition.defaultProps = {
  isOpen: false,
};

export default SerealNumberRecognition;
