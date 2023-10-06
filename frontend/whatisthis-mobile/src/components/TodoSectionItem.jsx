const TodoSectionItem = ({ sectionName, isFinish, onClick, type, isSave }) => {
  const btnType = ["default", "add"].includes(type) ? type : "default";
  const imageVisibility = btnType === "default" ? true : false;

  return (
    <div className="TodoSectionItem" onClick={onClick}>
      <p>{sectionName}</p>
      {imageVisibility &&
        (isFinish ? (
          <img src={process.env.PUBLIC_URL + `/assets/check_green_small.png`} alt="status" />
        ) : (
          <img src={process.env.PUBLIC_URL + `/assets/check_red_small.png`} alt="status" />
        ))}
      {isSave && (
        <img
          style={{
            width: "2.5rem",
            height: "2.5rem",
          }}
          src={process.env.PUBLIC_URL + `/assets/save.png`}
          alt="status"
        />
      )}
    </div>
  );
};

TodoSectionItem.defaultProps = {
  isFinish: false,
  isSave: false,
  type: "default",
};

export default TodoSectionItem;
