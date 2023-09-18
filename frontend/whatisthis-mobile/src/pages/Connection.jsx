import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBuildingName } from "../utils/ParseAddress";

import MyButton from "../components/MyButton";
import SerialNumberRecognition from "../components/SerialNumberRecognition";

import { dummyBuildingData } from "../utils/DummyData";
import { dummyHouseData } from "../utils/DummyData";
const Connection = () => {
  const { buildingId } = useParams();
  const { houseId } = useParams();
  const buildingList = dummyBuildingData;
  const houseList = dummyHouseData;

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [addr, setAddr] = useState();

  const [isSnum, setIsSnum] = useState(false);

  useEffect(() => {
    if (buildingList.length >= 1) {
      const targetBuilding = buildingList.find(
        (it) => parseInt(it.id) === parseInt(buildingId)
      );
      if (targetBuilding) {
        if (targetBuilding.houses.length >= 1) {
          const targetHouse = targetBuilding.houses.find(
            (it) => parseInt(it.id) === parseInt(houseId)
          );
          setAddr(targetBuilding.addr);
          if (targetHouse) {
            setData(targetHouse);
          } else {
            alert("없는 세대입니다.");
            navigate("/search", { replace: true });
          }
        }
      } else {
        alert("없는 건물입니다.");
        navigate("/search", { replace: true });
      }
    }
  }, [houseId, houseList]);

  const handleConnectionMethodTymeClick = () => {
    // 카메라 멈추고 시리얼넘버 컴포넌트 스폰 토글..
    setIsSnum(!isSnum);
  };
  const handleOpenSnumRecognition = () => {
    setIsSnum(!isSnum);
  };

  if (!data) {
    return <div className="Connection">로딩중입니다...</div>;
  } else {
    return (
      <div className="Connection container">
        <div className="header">
          <div className="building_info_wrapper">
            <h1>{getBuildingName(addr)}</h1>
            <h4>{addr}</h4>
          </div>
          <div className="connection_method_wrapper">
            <img
              src="/assets/qr.png"
              alt="QR"
              onClick={() => handleConnectionMethodTymeClick()}
            />
            <img
              src="/assets/snum.png"
              alt="SNUM"
              onClick={() => handleConnectionMethodTymeClick()}
            />
          </div>
        </div>
        {/* camera container */}
        <div>
          <img
            className="camera_frame"
            src="/assets/camera_frame_small.png"
            alt=""
          />
        </div>

        <h2>기기의 QR을 인식</h2>

        <MyButton
          color={"black"}
          text={"돌아가기"}
          onClick={() => navigate(-1)}
        />
        {
          <SerialNumberRecognition
            isOpen={isSnum}
            addr={addr}
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
