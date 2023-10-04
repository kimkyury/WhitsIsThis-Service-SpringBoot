import { getBuildingName } from "../utils/ParseAddress";

const Building = ({ buildingData, onClick }) => {
  const getFinishedRequest = () => {
    const doneItems = buildingData.requests.filter((it) => it.status === "DONE");

    return doneItems.length;
  };

  return (
    <div className="Building " onClick={onClick}>
      <div className="building_info_wrapper">
        <h2>{getBuildingName(buildingData.address)}</h2>
        <h5>{buildingData.address}</h5>
      </div>
      <div className="building_status_wrapper">
        <h1>
          {getFinishedRequest()}/{buildingData.requests.length}
        </h1>
      </div>
    </div>
  );
};
export default Building;
