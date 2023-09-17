const HouseInfo = ({ houseInfo, onClick }) => {
  const houseStatus = ["done", "todo"].includes(houseInfo.status)
    ? houseInfo.status
    : "todo";

  return (
    <div className="HouseInfo" onClick={onClick}>
      <h1>
        {houseInfo.dong}동 {houseInfo.ho}호
      </h1>
      {houseInfo.status === "done" && (
        <img src="/assets/check_green_small.png" alt="done" />
      )}
    </div>
  );
};

HouseInfo.defaultProps = {
  status: "todo",
};

export default HouseInfo;
