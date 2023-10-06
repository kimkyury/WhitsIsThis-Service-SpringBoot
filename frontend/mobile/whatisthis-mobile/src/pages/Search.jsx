import React, { useContext, useEffect, useState } from "react";
import Building from "../components/Building";
import { useNavigate } from "react-router-dom";

import { BuildingDispatchContext } from "../App";
import AuthHttp from "../utils/AuthHttp";
import MyButton from "../components/MyButton";

const Search = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [buildingList, setBuildingList] = useState();
  const { init } = useContext(BuildingDispatchContext);

  const [filteredBuilding, setFilteredBuilding] = useState();

  useEffect(() => {
    const getBuildingList = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: "/private/requests/assigned",
        });
        const data = response.data.data;
        if (data.length >= 1) {
          setBuildingList(data);
          setFilteredBuilding(data);

          init(data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getBuildingList();
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

  if (!buildingList) {
    return (
      <div className="Search">
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
  }
};

Search.defaultProps = {
  buildingList: [],
};
export default Search;
