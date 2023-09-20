import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

const Camera = () => {
  const navigate = useNavigate();
  return (
    <div className="Camera container">
      <div className="camera_container">
        <img src={process.env.PUBLIC_URL + `/assets/camera_frame_big.png`} alt="frame" />
        {/* 카메라 */}
      </div>

      <div className="result_wrapper">
        <div className="title">
          <h2>123123</h2>
        </div>
        <div className="image_container">
          {/* map.. */}
          <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="img" />
        </div>
      </div>

      <div className="button_wrapper">
        <Notification
          text={"뒤로가기"}
          type={"left"}
          color={"orange"}
          onClick={() => navigate(-1)}
        />
        <Notification text={"촬영"} type={"right"} color={"grey"} />
      </div>
    </div>
  );
};

export default Camera;
