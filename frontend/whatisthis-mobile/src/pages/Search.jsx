import { useEffect, useState } from "react";
import Building from "../components/Building";
import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    id: 1,
    addr: "감자시 고구마구 호박로 1번길 100 야채빌",
    todo: 10,
    inProgress: 3,
  },
  {
    id: 2,
    addr: "토란시 감치구 돼지로 2번길 32 채소빌",
    todo: 12,
    inProgress: 3,
  },
  {
    id: 3,
    addr: "병아리시 알알구 아리로 3번길 99 치킨빌",
    todo: 40,
    inProgress: 1,
  },
  {
    buildingNumber: 4,
    addr: "닭시 계구 췩힌로 4번길 101",
    todo: 5,
    inProgress: 0,
  },
];

const Search = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="Search container">
      <div>
        <input
          type="text"
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="ex) 부산시 남구 대연동.. , OO아파트"
        />
      </div>
      <div className="building-wrapper">
        {dummyData.map((it, idx) => {
          return <Building key={idx} buildingData={it} />;
        })}
      </div>
    </div>
  );
};

// 나중에 디폴트 값 설정해두기

export default Search;
