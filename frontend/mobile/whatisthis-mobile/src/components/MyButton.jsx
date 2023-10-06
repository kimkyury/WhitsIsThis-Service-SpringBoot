const MyButton = ({ text, color, onClick, isFinish }) => {
  const btnColor = ["orange", "green", "grey", "white", "black"].includes(color) ? color : "grey";

  return (
    <button
      className={["MyButton", `MyButton_${btnColor}`, isFinish ? "" : "MyButton_disable"].join(" ")}
      onClick={onClick}
      disabled={!isFinish}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  color: "grey",
  isFinish: true,
};

export default MyButton;
