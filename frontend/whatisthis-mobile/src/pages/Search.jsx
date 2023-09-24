import React, { useContext, useEffect, useState } from "react";
import Building from "../components/Building";
import { useNavigate } from "react-router-dom";

import { dummyBuildingData } from "../utils/DummyData";
import AuthAxios from "../utils/AuthAxios";

import { BuildingDataContext } from "../App";

const Search = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  // const [buildingList, setBuildingList] = useState();
  const buildingList = useContext(BuildingDataContext);
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
              <Building
                key={idx}
                index={idx}
                buildingData={it}
                onClick={() => navigate(`/search/${idx}`)}
              />
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
