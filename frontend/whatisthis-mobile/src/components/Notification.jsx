const Notification = ({ text, type, onClick }) => {
  const btnType = ["left", "right"].includes(type) ? type : "default";

  return (
    <button
      className={["Notification", `Notification_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Notification.defaultProps = {
  type: "default",
};

export default Notification;
