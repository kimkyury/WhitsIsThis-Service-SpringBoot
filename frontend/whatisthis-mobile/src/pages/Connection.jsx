import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MyButton from "../components/MyButton";
import SerialNumberRecognition from "../components/SerialNumberRecognition";

import QRrecognition from "../components/QRrecognition";
import { BuildingDataContext } from "../App";
const Connection = () => {
  const { buildingId } = useParams();
  const { houseId } = useParams();

  const { buildingList } = useContext(BuildingDataContext);
  const targetBuilding = buildingList[parseInt(buildingId)];
  const targetHouse =
    targetBuilding && targetBuilding.requests.find((it) => parseInt(it.id) === parseInt(houseId));

  const navigate = useNavigate();

  const [isSnum, setIsSnum] = useState(false);

  const handleConnectionMethodTymeClick = () => {
    // 카메라 멈추고 시리얼넘버 컴포넌트 스폰 토글..
    setIsSnum(!isSnum);
  };
  const handleOpenSnumRecognition = () => {
    setIsSnum(!isSnum);
  };

  const connect = (serialNumber) => {
    //시리얼 넘버가 유효한지 확인하는 로직 필요
    navigate(`/connection/${buildingId}/${houseId}/result`, {
      state: {
        serialNumber: serialNumber,
      },
      replace: true,
    });
  };

  if (!targetHouse) {
    return <div className="Connection">로딩중입니다...</div>;
  } else {
    return (
      <div className="Connection container">
        <div className="header">
          <div className="building_info_wrapper">
            <h2>{targetHouse.addressDetail}</h2>
            <h4>{targetBuilding.address}</h4>
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
            addr={targetHouse.address}
            buildingId={buildingId}
            houseId={houseId}
            handleOpenSnumRecognition={handleOpenSnumRecognition}
          />
        }
      </div>
    );
  }
};

export default Connection;
