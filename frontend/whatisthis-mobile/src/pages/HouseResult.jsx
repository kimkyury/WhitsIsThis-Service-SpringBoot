import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Notification from "../components/Notification";
import AuthHttp from "../utils/AuthHttp";

const HouseResult = () => {
  const navigate = useNavigate();

  const { buildingId, houseId } = useParams();

  const [targetHouse, setTargetHouse] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    const getTargetHouse = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/requests/${houseId}`,
        });
        // console.log(response.data.data);
        setTargetHouse(response.data.data);
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
        // console.log(response.data.data);
        setResult(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    getTargetHouse();
  }, []);

  const handleAcceptClick = () => {
    //승인 했을 때 발생될 로직
    navigate(`/houselist`, { replace: true });
  };

  if (!result) {
    return <div className="HouseResult">로딩중입니다...</div>;
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
                  <h2>[IOT]{damage.category}</h2>
                </div>
              );
            })}
          {result.history.device &&
            result.history.device.map((device) => {
              console.log(device);
              return (
                <div key={device.id} className="result_item">
                  <h2>[IOT]{device.category}</h2>
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
                      <h2>[IP]{room.roomName}</h2>
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
          <Notification text={"보고서 확인"} type={"left"} color={"grey"} />
          <Notification
            text={"완료승인"}
            type={"right"}
            color={"green"}
            onClick={handleAcceptClick}
          />
        </div>
      </div>
    );
  }
};

export default HouseResult;
