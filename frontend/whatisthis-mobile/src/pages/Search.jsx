import { useEffect, useState } from "react";
import Building from "../components/Building";
import { useNavigate } from "react-router-dom";

import { dummyBuildingData } from "../utils/DummyData";

const Search = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [buildingList, setBuildingList] = useState(dummyBuildingData);

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
          return (
            <Building
              key={idx}
              buildingData={it}
              onClick={() => navigate(`/mobile/search/${it.id}`)}
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
