const HouseInfo = ({ houseInfo, onClick }) => {
  const houseStatus = ["DONE", "todo"].includes(houseInfo.status) ? houseInfo.status : "todo";

  return (
    <div className="HouseInfo" onClick={onClick}>
      <h1>{houseInfo.addressDetail}</h1>
      {houseInfo.status === "DONE" && (
        <img src={process.env.PUBLIC_URL + `/assets/check_green_small.png`} alt="done" />
      )}
    </div>
  );
};

HouseInfo.defaultProps = {
  status: "todo",
};

export default HouseInfo;
