const Notification = ({ text, type, onClick, color, isFinish }) => {
  const btnType = ["left", "right"].includes(type) ? type : "default";
  const btnColor = ["orange", "green", "grey"].includes(color) ? color : "grey";

  return (
    <button
      className={[
        "Notification",
        `Notification_${btnType}`,
        `Notification_${btnColor}`,
        isFinish ? "" : "MyButton_disable",
      ].join(" ")}
      onClick={onClick}
      disabled={!isFinish}
    >
      {text}
    </button>
  );
};

Notification.defaultProps = {
  type: "default",
  color: "grey",
  isFinish: true,
};

export default Notification;
