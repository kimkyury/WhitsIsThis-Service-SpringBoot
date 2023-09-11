const Notification = ({ text, onClick }) => {
  return (
    <button className={"Notification"} onClick={onClick}>
      {text}
    </button>
  );
};

export default Notification;
