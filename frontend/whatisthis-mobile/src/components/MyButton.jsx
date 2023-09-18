const MyButton = ({ text, color, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  const btnColor = ["orange", "green", "grey", "white", "black"].includes(color) ? color : "grey";

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`, `MyButton_${btnColor}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
  color: "grey",
};

export default MyButton;
