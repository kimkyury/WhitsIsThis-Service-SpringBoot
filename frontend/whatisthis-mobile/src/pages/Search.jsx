import { useEffect, useState } from "react";
import Building from "../components/Building";
import { useNavigate } from "react-router-dom";

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

const Search = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [buildingList, setBuildingList] = useState(dummyData);

  return (
    <div className="Search container">
      <div className="search_bar_wrapper">
        <input
          type="text"
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="ex) 부산시 남구.. , OO아파트"
        />
        <img src={`/assets/search2.png`} alt="search" />
      </div>
      <div className="building_wrapper">
        {buildingList.map((it, idx) => {
          return <Building key={idx} buildingData={it} />;
        })}
      </div>
    </div>
  );
};

// 나중에 디폴트 값 설정해두기

export default Search;
