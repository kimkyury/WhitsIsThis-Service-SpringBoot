import TodoSectionItem from "./TodoSectionItem";
import TodoListItem from "./TodoListItem";
import { useNavigate, useParams } from "react-router-dom";

// 할일이 객체로 이름, 내용, 선택됨, 이미지 를 갖고 있어야 함

const SectionDetail = ({ targetSection, isSectionDetail, handleSectionOpen }) => {
  const navigate = useNavigate();
  const { buildingId, houseId } = useParams();
  // 렌더링 여러번 되는 문제 개선 필요

  const openCamera = (todoListItemId) => {
    const targetTodoItem = targetSection.todoList.find(
      (it) => parseInt(it.id) === parseInt(todoListItemId)
    );
    // console.log(buildingId, houseId);
    navigate(`/camera`, { state: targetTodoItem.imageList });
  };

  if (!targetSection) {
    return <div className="SectionDetail">로딩중입니다...</div>;
  } else {
    return (
      <div
        className={`SectionDetail section_list ${
          isSectionDetail ? "slide_in_right" : "slide_out_right"
        }`}
      >
        {/* section list map 적용해서 출력 */}
        {/* handleSectionClick은 편의상 임시로 넣은 것 뒤로가기 아이콘을 추가해야할 듯 */}
        <TodoSectionItem
          sectionName={targetSection.sectionId}
          onClick={() => handleSectionOpen(targetSection.sectionId)}
        />
        {targetSection.todoList &&
          targetSection.todoList.map((it, idx) => {
            return <TodoListItem key={idx} todoListItem={it} openCamera={openCamera} />;
          })}
      </div>
    );
  }
};

export default SectionDetail;
