import React, { useContext, useEffect, useState } from "react";
import Building from "../components/Building";
import { useNavigate } from "react-router-dom";

import { BuildingDataContext } from "../App";

// 검색 필터 해줘야해용

const Search = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const { buildingList, socket } = useContext(BuildingDataContext);

  const [filteredBuilding, setFilteredBuilding] = useState();
  // 새로고침되면 다시 불러오게끔 로직 수정 해야함

  useEffect(() => {
    setFilteredBuilding(buildingList);
  }, []);

  const handleSearchWordChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchWord(inputValue);

    if (inputValue === "") {
      setFilteredBuilding(buildingList);
    } else {
      const filteredBuilding = buildingList.filter((building) =>
        building.address.toLowerCase().includes(inputValue)
      );

      setSearchWord(inputValue);
      setFilteredBuilding(filteredBuilding);
    }
  };

  return (
    <div className="Search container">
      <div className="search_bar_wrapper">
        <input
          type="text"
          onChange={handleSearchWordChange}
          value={searchWord}
          placeholder="ex) 부산시 남구.. , OO아파트"
        />
        <img src={process.env.PUBLIC_URL + `/assets/search2.png`} alt="search" />
      </div>
      <div className="building_wrapper">
        {filteredBuilding &&
          filteredBuilding.map((it, idx) => {
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
