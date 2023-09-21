import TodoSectionItem from "./TodoSectionItem";
import TodoListItem from "./TodoListItem";

// 할일이 객체로 이름, 내용, 선택됨, 이미지 를 갖고 있어야 함
const dummyTodoList = ["할일 1", "할일 2", "할일 3", "할일 4", "할일 5"];

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
      {dummyTodoList.map((it, idx) => {
        console.log(it, idx);
        return <TodoListItem key={idx} todoListName={it} />;
      })}
    </div>
  );
};

export default SectionDetail;
