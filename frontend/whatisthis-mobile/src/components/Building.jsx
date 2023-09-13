import { useNavigate } from "react-router-dom";

import { getBuildingName } from "../utils/ParseAddress";

const Building = ({ buildingData, onClick }) => {
  const navigate = useNavigate();

  const handleBuildingClick = () => {
    navigate(`/search/${buildingData.id}`);
  };

  return (
    <div className="Building " onClick={onClick}>
      <div className="building_info_wrapper">
        <h2>{getBuildingName(buildingData.addr)}</h2>
        <h5>{buildingData.addr}</h5>
      </div>
      <div className="building_status_wrapper">
        <h1>
          {buildingData.inProgress}/{buildingData.todo}
        </h1>
      </div>
    </div>
  );
};
export default Building;
