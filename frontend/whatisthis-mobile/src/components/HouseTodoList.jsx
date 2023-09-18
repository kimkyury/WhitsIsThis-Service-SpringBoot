import { useState } from "react";

import TodoListMain from "./TodoListMain";
import TodoAddSection from "./TodoAddSection";

const HouseTodoList = ({ isOpen, handleOpenTodoList }) => {
  const modalStatus = isOpen ? "slide_up" : "slide_down";

  const [sectionList, setSectionList] = useState();

  return (
    <div className={`HouseTodoList options ${modalStatus}`}>
      <div className="option_header" onClick={handleOpenTodoList}>
        <img src="/assets/stick_small.png" alt="" />
      </div>

      {/* <TodoListMain sectionList={sectionList} /> */}
      <TodoAddSection />
    </div>
  );
};

HouseTodoList.defaultProps = {
  isOpen: false,
};

export default HouseTodoList;
