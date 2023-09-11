import { useNavigate } from "react-router-dom";

const Building = ({ buildingData }) => {
  const navigate = useNavigate();

  const handleBuildingClick = () => {
    navigate(`/search/${buildingData.id}`);
  };

  return (
    <div className="Building " onClick={handleBuildingClick}>
      <div className="contents_wrapper">
        <h2>건물대표이름</h2>
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
