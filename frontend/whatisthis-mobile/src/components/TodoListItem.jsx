import { useNavigate } from "react-router-dom";

const TodoListItem = ({}) => {
  const navigate = useNavigate();

  //체크 됐을 때 상태, input 내용, 찍은 사진을 다 갖고 있어야함

  return (
    <div className="TodoListItem">
      <div className="header">
        <input type="checkbox" />
        <h2>체크리스트</h2>
        {/* 카메라로 이동할 때 해당 섹션 이름을 가져갸아함 */}
        <div className="image_wrapper" onClick={() => navigate(`/camera`)}>
          <img src={process.env.PUBLIC_URL + `/assets/camera.png`} alt="" />
        </div>
      </div>
      <input className="description" type="text" />
      {/* 이미지는 일단 세개까지만 되는걸로 하죠.. */}
      <div className="image_list">
        <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="img" />
        <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="img" />
        <img src={process.env.PUBLIC_URL + `/assets/image_none.png`} alt="img" />
      </div>
    </div>
  );
};

export default TodoListItem;
