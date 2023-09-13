import { useParams } from "react-router-dom";

const HouseResult = () => {
  const { buildingId, houseId } = useParams();

  return (
    <div className="HouseResult">
      <h2>Here is HouseResult</h2>
      <h2>
        {buildingId} {houseId}
      </h2>
    </div>
  );
};

export default HouseResult;
