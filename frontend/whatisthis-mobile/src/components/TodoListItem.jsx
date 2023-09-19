import { useNavigate } from "react-router-dom";

const TodoListItem = ({}) => {
  const navigate = useNavigate();

  return (
    <div className="TodoListItem">
      <div className="header">
        <input type="checkbox" />
        <h2>체크리스트</h2>
        <div className="image_wrapper" onClick={() => navigate(`/camera`)}>
          <img src="/assets/camera.png" alt="" />
        </div>
      </div>
      <input className="description" type="text" />
      {/* 이미지는 일단 세개까지만 되는걸로 하죠.. */}
      <div className="image_list">
        <img src="/assets/image_none.png" alt="img" />
        <img src="/assets/image_none.png" alt="img" />
        <img src="/assets/image_none.png" alt="img" />
      </div>
    </div>
  );
};

export default TodoListItem;
