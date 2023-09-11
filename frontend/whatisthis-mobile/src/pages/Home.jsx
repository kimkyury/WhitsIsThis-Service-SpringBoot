import { useNavigate } from "react-router-dom";

import MyButton from "../components/MyButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="Home container">
      <img src="/assets/logo_white.png" alt="Logo" />
      <MyButton text={"로그인"} onClick={() => navigate("/login")} />
    </div>
  );
};

export default Home;
