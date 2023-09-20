import TodoSectionItem from "./TodoSectionItem";
import TodoListItem from "./TodoListItem";
const SectionDetail = ({ sectionId, isSectionDetail, handleAddClick, handleSectionOpen }) => {
  return (
    <div
      className={`SectionDetail section_list ${
        isSectionDetail ? "slide_in_right" : "slide_out_right"
      }`}
    >
      {/* section list map 적용해서 출력 */}
      {/* handleSectionClick은 편의상 임시로 넣은 것 뒤로가기 아이콘을 추가해야할 듯 */}
      <TodoSectionItem sectionName={sectionId} onClick={() => handleSectionOpen(sectionId)} />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </div>
  );
};

export default SectionDetail;
