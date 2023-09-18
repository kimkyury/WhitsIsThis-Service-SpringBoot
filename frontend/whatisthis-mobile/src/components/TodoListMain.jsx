import { useState } from "react";
import TodoSectionItem from "./TodoSectionItem";

// 닫기는게 왼쪽 열리는게 오른쪽 디폴트는 고정
const TodoListMain = ({ isListMain, sectionList, handleAddClick, handleSectionOpen }) => {
  const [isFinish, setIsFinish] = useState(false);

  // return (

  return (
    <div
      className={`TodoListMain section_list ${isListMain ? "slide_in_left" : "slide_out_left"} `}
    >
      <div className="user_request">
        <h3>사용자 요청사항</h3>
        <p>
          사용자 요청사항 사용 자요 청사항 사 용자요 청사항 사용자 요청사항 사용 자요 청사항 사
          용자요 청
        </p>
      </div>
      {/* section list map 적용해서 출력 */}
      <TodoSectionItem sectionName={"구역1"} onClick={() => handleSectionOpen("1")} />
      <TodoSectionItem sectionName={"구역2"} onClick={() => handleSectionOpen("2")} />
      <TodoSectionItem sectionName={"구역3"} onClick={() => handleSectionOpen("3")} />
      <TodoSectionItem sectionName={"구역4"} onClick={() => handleSectionOpen("4")} />
      <TodoSectionItem sectionName={"구역5"} onClick={() => handleSectionOpen("5")} />

      <div className="TodoSectionItem" onClick={handleAddClick}>
        <img className="add_section_btn" src="/assets/plus_circle_grey.png" alt="add" />
      </div>
    </div>
  );
};

TodoListMain.defaultProps = {
  sectionList: [],
};

export default TodoListMain;
