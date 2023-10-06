import MyButton from "../components/MyButton";

const Error = ({ onClick }) => {
  return (
    <div className="Error">
      <h1>ERROR</h1>
      <h2>서버와 연결이 끊겼습니다..</h2>

      <MyButton text={"뒤로가기"} color={"orange"} onClick={onClick} />
    </div>
  );
};

export default Error;
