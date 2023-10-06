import { useNavigate, useParams } from "react-router-dom";
import { getBuildingName } from "../utils/ParseAddress";

import { useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import HouseCard from "../components/HouseCard";

import AuthHttp from "../utils/AuthHttp";
import { useWebSocket } from "../utils/WebSocket";

const HouseList = () => {
  const navigate = useNavigate();
  const { ws, receivedMessage } = useWebSocket();

  const [houseList, setHouseList] = useState();

  const [percentageObj, setPercentageObj] = useState({
    historyId: -1,
    percentage: 0,
    isSearching: false,
  });

  useEffect(() => {
    const getBuildingList = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: "/private/requests/assigned",
        });
        const data = response.data.data;
        if (data.length >= 1) {
          getHouseList(data);
          // setBuildings(data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getBuildingList();

    const getHouseList = (buildings) => {
      if (buildings) {
        setHouseList(
          buildings

            .map((building) => {
              const requests = building.requests.map((request) => {
                const newRequest = { ...request };
                newRequest.address = building.address;
                return newRequest;
              });

              return requests;
            })
            .flat()
            .filter((request) => request.status === "IN_PROGRESS" || request.status === "DONE")
            .sort((a, b) => {
              if (a.status === "DONE" && b.status !== "DONE") {
                return 1;
              } else if (a.status !== "DONE" && b.status === "DONE") {
                return -1;
              } else {
                return 0;
              }
            })
        );
      }
    };
  }, []);

  useEffect(() => {
    // console.log(houseInfo.historyId, " ", receivedMessage);
    if (!ws) return;
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("리스트", data);
      // if (houseInfo.historyId !== data.data.historyId) {
      //   return;
      // }
      // console.log(houseInfo.historyId, "카두입미다", data);

      if (data.type && data.type === "COMPLETION_RATE") {
        if (data.data.rate >= 98) {
          setPercentageObj({
            historyId: data.data.historyId,
            percentage: 100,
            isSearching: true,
          });
          //연결 끊기
          const message = {
            type: "COMMAND",
            data: { command: "END", serialNumber: data.data.serialNumber },
          };
          const messageString = JSON.stringify(message, null, 2);
          ws.send(messageString);
        } else {
          setPercentageObj({
            historyId: data.data.historyId,
            percentage: data.data.rate,
            isSearching: true,
          });
        }
      }
    };
  }, [ws]);

  const handleHouseCardClick = (houseInfo, percentageObj) => {
    if (houseInfo.status !== "DONE") {
      navigate(`/house/${houseInfo.id}`, {
        state: {
          historyId: houseInfo.historyId,
          isFinding: true,
        },
      });
    } else {
      navigate(`/house/${houseInfo.id}/result`);
    }
  };

  if (!houseList) {
    return (
      <div className="HouseList ">
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
      <div className="HouseList container">
        <div className="building_info_wrapper">
          <div className="building_info">
            <div className="building_title">
              <img
                onClick={() => navigate("/")}
                src={process.env.PUBLIC_URL + `/assets/logo_blue.png`}
                alt="logo"
              />
              <MyButton color={"black"} text={"세대추가"} onClick={() => navigate(`/search`)} />
            </div>
          </div>
        </div>
        <div className="house_card_wrapper">
          {houseList &&
            houseList.map((it, idx) => {
              // console.log(it);
              return (
                <HouseCard
                  key={idx}
                  houseInfo={it}
                  percentageObj={percentageObj}
                  // onclick 할 때 houseinfo 등 percentage 정보를 넘겨줘서 100프로이면 바로 결과창으로 보내던지
                  onClick={() => handleHouseCardClick(it, percentageObj)}
                />
              );
            })}

          {/* 아마 사용 안할 것 같음  */}
          {/* <div className="HouseCard add_card_btn" onClick={() => navigate(`/search`)}>
            <img src={process.env.PUBLIC_URL + `/assets/plus_circle.png`} alt="add_card" />
          </div>
          {houseList && houseList.length % 2 === 0 && <div className="blank"></div>} */}
        </div>
      </div>
    );
  }
};

export default HouseList;
