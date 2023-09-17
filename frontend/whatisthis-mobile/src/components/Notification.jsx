const Notification = ({ text, type, onClick, color }) => {
  const btnType = ["left", "right"].includes(type) ? type : "default";
  const btnColor = ["orange", "green", "grey"].includes(color) ? color : "grey";

  return (
    <button
      className={[
        "Notification",
        `Notification_${btnType}`,
        `Notification_${btnColor}`,
      ].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Notification.defaultProps = {
  type: "default",
  color: "grey",
};

export default Notification;
