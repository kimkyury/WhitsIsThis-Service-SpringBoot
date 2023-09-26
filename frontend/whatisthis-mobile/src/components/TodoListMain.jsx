import { useState } from "react";
import TodoSectionItem from "./TodoSectionItem";

import { dummySections } from "../utils/DummyData";

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
      {sectionList.map((it, idx) => {
        return (
          <TodoSectionItem
            key={idx}
            sectionName={it.sectionName}
            // handleSectionOpen 전달 값 변경해야함
            onClick={() => handleSectionOpen(it.sectionId)}
            isFinish={it.isFinish}
          />
        );
      })}

      <div className="TodoSectionItem" onClick={handleAddClick}>
        <img
          className="add_section_btn"
          src={process.env.PUBLIC_URL + `/assets/plus_circle_grey.png`}
          alt="add"
        />
      </div>
    </div>
  );
};

TodoListMain.defaultProps = {
  sectionList: [],
};

export default TodoListMain;
