import TodoSectionItem from "./TodoSectionItem";

// 닫기는게 오른쪽 열리는게 왼쪽
const TodoAddSection = ({ isAddSection, handleAddClick }) => {
  return (
    <div
      className={`TodoAddSection section_list ${
        isAddSection ? "slide_in_right" : "slide_out_right"
      }`}
    >
      {/* section list map 적용해서 출력 */}
      <TodoSectionItem sectionName={"거실"} type={"add"} onClick={() => handleAddClick(1)} />
      <TodoSectionItem sectionName={"주방"} type={"add"} onClick={() => handleAddClick(2)} />
      <TodoSectionItem sectionName={"베란다"} type={"add"} onClick={() => handleAddClick(3)} />
      <TodoSectionItem sectionName={"화장실"} type={"add"} onClick={() => handleAddClick(4)} />
      <TodoSectionItem sectionName={"방"} type={"add"} onClick={() => handleAddClick(5)} />
    </div>
  );
};

export default TodoAddSection;
