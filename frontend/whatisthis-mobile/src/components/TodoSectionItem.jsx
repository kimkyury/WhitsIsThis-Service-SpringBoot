const TodoSectionItem = ({ sectionName, isFinish, onClick, type }) => {
  const btnType = ["default", "add"].includes(type) ? type : "default";
  const imageVisibility = btnType === "default" ? true : false;

  return (
    <div className="TodoSectionItem" onClick={onClick}>
      <p>{sectionName}</p>
      {imageVisibility &&
        (isFinish ? (
          <img src="/assets/check_green_small.png" alt="status" />
        ) : (
          <img src="/assets/check_red_small.png" alt="status" />
        ))}
    </div>
  );
};

TodoSectionItem.defaultProps = {
  isFinish: false,
  type: "default",
};

export default TodoSectionItem;
