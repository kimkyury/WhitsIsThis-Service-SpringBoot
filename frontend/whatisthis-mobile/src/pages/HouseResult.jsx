import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Notification from "../components/Notification";
import AuthHttp from "../utils/AuthHttp";
import MyButton from "../components/MyButton";

const HouseResult = () => {
  const navigate = useNavigate();

  const { houseId } = useParams();

  const [targetHouse, setTargetHouse] = useState();
  const [result, setResult] = useState();
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    const getTargetHouse = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/requests/${houseId}`,
        });
        setTargetHouse(response.data.data);
        setIsFinish(response.data.data.status === "DONE" ? true : false);
        getResult(response.data.data.history.id);
      } catch (e) {
        console.error(e);
      }
    };

    const getResult = async (historyId) => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/histories/${historyId}`,
        });
        setResult(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    getTargetHouse();
  }, []);

  const handleAcceptClick = async () => {
    try {
      const response = await AuthHttp({
        method: "patch",
        url: `/private/requests/${houseId}/status`,
        data: {
          status: "DONE",
        },
      });
      console.log(response);
      navigate(`/houselist`, { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  const exportReport = () => {
    // 보고서 생성
    setIsFinish(true);
  };

  if (!result) {
    return (
      <div className="HouseResult">
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
      <div className="HouseResult container">
        <img src={process.env.PUBLIC_URL + `/assets/check_big.png`} alt="" />
        <div className="building_info_wrapper">
          <h2>{targetHouse.addressDetail}</h2>
          <h4>{targetHouse.address}</h4>
        </div>
        <div className="result_list">
          {result.history.damaged &&
            result.history.damaged.map((damage) => {
              console.log(damage);
              return (
                <div key={damage.id} className="result_item">
                  <h2>[IOT] 손상발견</h2>
                  <h4>항목 : {damage.category}</h4>
                </div>
              );
            })}
          {result.history.device &&
            result.history.device.map((device) => {
              console.log(device);
              return (
                <div key={device.id} className="result_item">
                  <h2>[IOT] {device.category}</h2>
                  <h4>{device.isWorked ? "정상작동" : "작동불가"}</h4>1
                </div>
              );
            })}
          {result.todolist &&
            result.todolist.map((room) => {
              return room.todolist.map((todo) => {
                if (todo.isChecked === true) {
                  return (
                    <div key={todo.id} className="result_item">
                      <h2>[IP] {room.roomName}</h2>
                      <h4>{todo.content}</h4>
                    </div>
                  );
                } else {
                  return null;
                }
              });
            })}
        </div>
        <div className="button_wrapper">
          <Notification text={"보고서 전송"} type={"left"} color={"grey"} onClick={exportReport} />
          <Notification
            text={"완료승인"}
            type={"right"}
            color={"green"}
            onClick={handleAcceptClick}
            isFinish={isFinish}
          />
        </div>
      </div>
    );
  }
};

export default HouseResult;
