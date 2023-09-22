import TodoSectionItem from "./TodoSectionItem";

// 닫기는게 오른쪽 열리는게 왼쪽
import { dummySectionList } from "../utils/DummyData";

const TodoAddSection = ({ isAddSection, handleAddClick }) => {
  return (
    <div
      className={`TodoAddSection section_list ${
        isAddSection ? "slide_in_right" : "slide_out_right"
      }`}
    >
      {/* section list map 적용해서 출력 */}
      {dummySectionList.map((it, idx) => {
        return (
          <TodoSectionItem
            key={idx}
            sectionName={it.sectionName}
            type={"add"}
            onClick={() => handleAddClick(it)}
          />
        );
      })}
    </div>
  );
};

export default TodoAddSection;
