import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Notification from "../components/Notification";
import { BuildingDataContext } from "../App";

const ConnectionResult = () => {
  const navigate = useNavigate();
  const [connectState, setConnectState] = useState(true);

  const { buildingId, houseId } = useParams();
  const { serialNumber } = useLocation().state;

  const targetBuilding = useContext(BuildingDataContext)[parseInt(buildingId)];
  const targetHouse = targetBuilding.requests.find((it) => parseInt(it.id) === parseInt(houseId));

  const startWorking = () => {
    // houselist 추가하는 로직

    navigate(`/houselist/${buildingId}`, { replace: true });
  };

  return (
    <div className="ConnectionResult container">
      <div className="building_info_wrapper">
        <div className="building_info">
          <h1>{targetHouse.addressDetail}</h1>
          <h3>{targetBuilding.address}</h3>
        </div>
      </div>
      <div className="connect_info_wrapper">
        <img
          src={process.env.PUBLIC_URL + `/assets/${connectState ? "check_big" : "uncheck_big"}.png`}
          alt="chkimg"
        />
        <h1>[ {serialNumber} ]</h1>
        {connectState ? <h2>기기연결 성공!</h2> : <h2>기기연결 실패..</h2>}
      </div>

      <div className="button_wrapper">
        {connectState ? (
          <>
            <Notification text={"점검시작"} type={"right"} color={"green"} onClick={startWorking} />
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
};

export default ConnectionResult;
