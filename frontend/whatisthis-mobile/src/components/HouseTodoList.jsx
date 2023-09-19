import { useState } from "react";

import TodoListMain from "./TodoListMain";
import TodoAddSection from "./TodoAddSection";
import SectionDetail from "./SectionDetail";

const HouseTodoList = ({ isOpen, handleOpenTodoList }) => {
  const modalStatus = isOpen ? "slide_up" : "slide_down";

  const [sectionList, setSectionList] = useState();

  const [isAddSection, setIsAddSection] = useState(false);
  const [isListMain, setIsListMain] = useState(true);
  const [isSectionDetail, setIsSectionDetail] = useState(false);
  const [targetSectionId, setTargetSectionId] = useState(0);

  const handleAddClick = (sectionId) => {
    if (isListMain) {
      setIsListMain(!isListMain);
      setIsAddSection(!isAddSection);
      return;
    }
    // sectionId 추가
    setIsListMain(!isListMain);
    setIsAddSection(!isAddSection);
  };

  const handleSectionOpen = (sectionId) => {
    if (setIsListMain) {
      setTargetSectionId(sectionId);
      setIsListMain(!isListMain);
      setIsSectionDetail(!isSectionDetail);
      return;
    }
    setIsListMain(!isListMain);
    setIsSectionDetail(!isSectionDetail);
  };

  // const handleCameraOpen = () => {
  //   setIsAddSection(false);
  //   setIsListMain(true);
  //   setIsSectionDetail(false);
  //   // 카메라 열렸을 때 창 전환
  //   isOpen = false;
  // };

  return (
    <div className={`HouseTodoList options ${modalStatus}`}>
      <div className="option_header" onClick={handleOpenTodoList}>
        <img src="/assets/stick_small.png" alt="" />
      </div>

      <TodoListMain
        isListMain={isListMain}
        sectionList={sectionList}
        handleAddClick={handleAddClick}
        handleSectionOpen={handleSectionOpen}
      />
      <TodoAddSection isAddSection={isAddSection} handleAddClick={handleAddClick} />
      <SectionDetail
        sectionId={targetSectionId}
        isSectionDetail={isSectionDetail}
        handleSectionOpen={handleSectionOpen}
      />
    </div>
  );
};

HouseTodoList.defaultProps = {
  isOpen: false,
};

export default HouseTodoList;
