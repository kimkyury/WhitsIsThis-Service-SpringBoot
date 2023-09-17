const MyInput = ({ text, type, onClick }) => {
  return (
    <input
      className={["MyInput", `MyInput_${type}`].join(" ")}
      onClick={onClick}
    />
  );
};

MyInput.defaultProps = {
  type: "default",
};

export default MyInput;
