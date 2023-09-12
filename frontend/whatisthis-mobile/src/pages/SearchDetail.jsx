import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBuildingName } from "../utils/ParseAddress";

import Notification from "../components/Notification";

const dummyData = [
  {
    id: 1,
    addr: "감자시 고구마구 호박로 1번길 100 야채빌",
    todo: 10,
    inProgress: 3,
    houses: [
      {
        dong: 101,
        ho: 101,
      },
      {
        dong: 101,
        ho: 102,
      },
      {
        dong: 101,
        ho: 103,
      },
      {
        dong: 101,
        ho: 104,
      },
      {
        dong: 101,
        ho: 105,
      },
    ],
  },
  {
    id: 2,
    addr: "토란시 감치구 돼지로 2번길 32 채소빌",
    todo: 12,
    inProgress: 3,
    houses: [
      {
        dong: 201,
        ho: 101,
      },
      {
        dong: 201,
        ho: 102,
      },
      {
        dong: 201,
        ho: 103,
      },
      {
        dong: 201,
        ho: 104,
      },
      {
        dong: 201,
        ho: 105,
      },
    ],
  },
  {
    id: 3,
    addr: "병아리시 알알구 아리로 3번길 99 치킨빌",
    todo: 40,
    inProgress: 1,
    houses: [
      {
        dong: 301,
        ho: 101,
      },
      {
        dong: 301,
        ho: 102,
      },
      {
        dong: 301,
        ho: 103,
      },
      {
        dong: 301,
        ho: 104,
      },
      {
        dong: 301,
        ho: 105,
      },
    ],
  },
  {
    id: 4,
    addr: "닭시 계구 췩힌로 4번길 101",
    todo: 5,
    inProgress: 0,
    houses: [
      {
        dong: 401,
        ho: 101,
      },
      {
        dong: 401,
        ho: 102,
      },
      {
        dong: 401,
        ho: 103,
      },
      {
        dong: 401,
        ho: 104,
      },
      {
        dong: 401,
        ho: 105,
      },
    ],
  },
];

const SearchDetail = () => {
  const { id } = useParams();
  const buildingList = dummyData;
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (buildingList.length >= 1) {
      const targetBuilding = buildingList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetBuilding) {
        setData(targetBuilding);
      } else {
        alert("없는 건물입니다.");
        navigate("/search", { replace: true });
      }
    }
  }, [id, buildingList]);

  if (!data) {
    return <div className="SearchDetail">로딩중입니다...</div>;
  } else {
    return (
      <div className="SearchDetail container">
        <div className="building_info_wrapper">
          <h1>{getBuildingName(data.addr)}</h1>
          <h3>{data.addr}</h3>
        </div>
        <div className="house_info_list_wrapper">
          {/* houst info list */}
          <h5>building number is = {id}</h5>
        </div>
        <Notification
          type={"left"}
          text={"뒤로가기"}
          onClick={() => navigate(-1)}
        />
      </div>
    );
  }
};

export default SearchDetail;
