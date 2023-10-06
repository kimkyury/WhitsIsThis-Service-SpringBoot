const HouseInfo = ({ houseInfo, onClick }) => {
  const houseStatus = ["DONE", "IN_PROGRESS"].includes(houseInfo.status)
    ? houseInfo.status
    : "todo";

  return (
    <div className="HouseInfo" onClick={onClick}>
      <h2>{houseInfo.addressDetail}</h2>
      {houseInfo.status === "DONE" && (
        <img src={process.env.PUBLIC_URL + `/assets/check_green_small.png`} alt="done" />
      )}
      {houseInfo.status === "IN_PROGRESS" && (
        <img src={process.env.PUBLIC_URL + `/assets/in_progress_small.png`} alt="done" />
      )}
    </div>
  );
};

HouseInfo.defaultProps = {
  status: "todo",
};

export default HouseInfo;
