import { useState } from "react";
import TodoSectionItem from "./TodoSectionItem";

import { dummySections } from "../utils/DummyData";

// 닫기는게 왼쪽 열리는게 오른쪽 디폴트는 고정
const TodoListMain = ({
  requestContent,
  isListMain,
  sectionList,
  handleAddClick,
  handleSectionOpen,
}) => {
  const checkFinish = (roomOrder) => {
    const room = sectionList.find((it) => it.roomOrder === roomOrder).todolist;
    const allTodoListIsDone = room.some((it) => it.isChecked);
    return allTodoListIsDone;
  };

  return (
    <div
      className={`TodoListMain section_list ${isListMain ? "slide_in_left" : "slide_out_left"} `}
    >
      <div className="user_request">
        <h3>사용자 요청사항</h3>
        <p>{(requestContent && requestContent) || "사용자 요청사항이 없습니다."}</p>
      </div>
      {/* section list map 적용해서 출력 */}
      {sectionList &&
        sectionList.map((it) => {
          return (
            <TodoSectionItem
              key={it.roomOrder}
              sectionName={it.roomName}
              // handleSectionOpen 전달 값 변경해야함
              onClick={() => handleSectionOpen(it.roomOrder)}
              isFinish={checkFinish(it.roomOrder)}
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
