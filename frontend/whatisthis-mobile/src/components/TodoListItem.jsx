import { useEffect, useState } from "react";

const TodoListItem = ({
  todoListId,
  handleCheckboxChange,
  handleDescriptionChange,
  todoListItem,
  openCamera,
}) => {
  //체크 됐을 때 상태, input 내용, 찍은 사진을 다 갖고 있어야함
  // 위에서 props로 받아와야 함.
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [imageList, setImageList] = useState();
  useEffect(() => {
    setIsChecked(JSON.parse(todoListItem.isChecked));
    setDescription(todoListItem.significant);
    setImageList(todoListItem.images);
  }, []);

  const handleCheckBoxState = (e) => {
    setIsChecked(e.target.checked);
    handleCheckboxChange(todoListItem.id, e.target.checked);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    handleDescriptionChange(todoListItem.id, e.target.value);
  };

  const handleOpenCamera = () => {
    openCamera(todoListItem.id, todoListItem.content);
  };

  return (
    <div className="TodoListItem">
      <div className="header">
        <input id={todoListId} type="checkbox" checked={isChecked} onChange={handleCheckBoxState} />
        <h2>항목이름 간단하게</h2>
        <div className="image_wrapper" onClick={handleOpenCamera}>
          <img src={process.env.PUBLIC_URL + `/assets/camera.png`} alt="" />
        </div>
      </div>
      <input
        id={todoListId}
        className="description"
        type="text"
        placeholder={todoListItem.content}
        value={description}
        onChange={handleDescription}
      />
      {imageList && imageList.length > 0 && (
        <div className="image_list">
          {imageList.map((it, idx) => {
            return (
              <img key={idx} src={process.env.REACT_APP_S3_BASE_URL + it.imageUrl} alt="img" />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoListItem;
