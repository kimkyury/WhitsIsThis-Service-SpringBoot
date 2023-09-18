import TodoSectionItem from "./TodoSectionItem";

// 닫기는게 오른쪽 열리는게 왼쪽
const TodoAddSection = (isAddSection) => {
  isAddSection = true;
  return (
    <div className={`TodoAddSection section_list ${isAddSection ? "slide_in" : "slide_out"}`}>
      {/* section list map 적용해서 출력 */}
      <TodoSectionItem sectionName={"거실"} type={"add"} />
      <TodoSectionItem sectionName={"주방"} type={"add"} />
      <TodoSectionItem sectionName={"베란다"} type={"add"} />
      <TodoSectionItem sectionName={"화장실"} type={"add"} />
      <TodoSectionItem sectionName={"방"} type={"add"} />
    </div>
  );
};

export default TodoAddSection;
