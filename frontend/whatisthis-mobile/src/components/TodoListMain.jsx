import { useState } from "react";
import TodoSectionItem from "./TodoSectionItem";

// 닫기는게 왼쪽 열리는게 오른쪽 디폴트는 고정
const TodoListMain = ({ sectionList }) => {
  const [isFinish, setIsFinish] = useState(false);

  return (
    <div className="TodoListMain slide_in">
      <div className="user_request">
        <h3>사용자 요청사항</h3>
        <p>
          사용자 요청사항 사용 자요 청사항 사 용자요 청사항 사용자 요청사항 사용 자요 청사항 사
          용자요 청
        </p>
      </div>
      <div className="section_list">
        {/* section list map 적용해서 출력 */}
        <TodoSectionItem sectionName={"구역N"} />
        <TodoSectionItem sectionName={"구역N"} />
        <TodoSectionItem sectionName={"구역N"} />
        <TodoSectionItem sectionName={"구역N"} />
        <div className="TodoSectionItem">
          <img className="add_section_btn" src="/assets/plus_circle_grey.png" alt="add" />
        </div>
      </div>
    </div>
  );
};

TodoListMain.defaultProps = {
  sectionList: [],
};

export default TodoListMain;
