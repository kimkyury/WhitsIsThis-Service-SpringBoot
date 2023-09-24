import React, { useContext, useEffect, useState } from "react";
import Building from "../components/Building";
import { useNavigate } from "react-router-dom";

import { BuildingDataContext } from "../App";

// 검색 필터 해줘야해용

const Search = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const buildingList = useContext(BuildingDataContext);
  // 새로고침되면 다시 불러오게끔 로직 수정 해야함
  console.log(buildingList);
  return (
    <div className="Search container">
      <div className="search_bar_wrapper">
        <input
          type="text"
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="ex) 부산시 남구.. , OO아파트"
        />
        <img src={process.env.PUBLIC_URL + `/assets/search2.png`} alt="search" />
      </div>
      <div className="building_wrapper">
        {buildingList &&
          buildingList.map((it, idx) => {
            return (
              <Building key={idx} buildingData={it} onClick={() => navigate(`/search/${idx}`)} />
            );
          })}
      </div>
    </div>
  );
};

Search.defaultProps = {
  buildingList: [],
};
export default Search;
