import { useEffect, useState } from "react";

import TodoListMain from "./TodoListMain";
import TodoAddSection from "./TodoAddSection";
import SectionDetail from "./SectionDetail";

import AuthHttp from "../utils/AuthHttp";

const HouseTodoList = ({ requestContent, historyId, isOpen, handleOpenTodoList }) => {
  const modalStatus = isOpen ? "slide_up" : "slide_down";

  const [sectionList, setSectionList] = useState();

  const [isAddSection, setIsAddSection] = useState(false);
  const [isListMain, setIsListMain] = useState(true);
  const [isSectionDetail, setIsSectionDetail] = useState(false);
  const [targetSection, setTargetSection] = useState({});

  useEffect(() => {
    // axios로 리스트 가져오는 등..
    const getSectionList = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/histories/${historyId}/todolists`,
        });

        setSectionList(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getSectionList();
    console.log(sectionList);
  }, []);

  const handleAddClick = async (sectionId) => {
    console.log(sectionId);

    if (isListMain) {
      setIsListMain(!isListMain);
      setIsAddSection(!isAddSection);
      return;
    }

    // sectionId 추가
    try {
      const response = await AuthHttp({
        method: "post",
        url: `/private/histories/${historyId}/todolists`,
        data: { roomId: sectionId },
      });

      setSectionList((prevData) => [...prevData, response.data.data]);
    } catch (e) {
      console.error(e);
    }

    console.log(sectionList);
    setIsListMain(!isListMain);
    setIsAddSection(!isAddSection);
  };

  const handleSectionOpen = (section) => {
    if (isListMain) {
      const target = sectionList.find(
        (it) => parseInt(it.roomOrder) === parseInt(section.roomOrder)
      );
      console.log(target);
      if (target) {
        setTargetSection(target);
      }

      setIsListMain(!isListMain);
      setIsSectionDetail(!isSectionDetail);
      return;
    }
    const targetTodoLists = sectionList.find((it) => it.roomOrder === section.roomOrder);
    setIsListMain(!isListMain);
    setIsSectionDetail(!isSectionDetail);
  };

  const handleMenu = () => {
    setTimeout(() => {
      setIsAddSection(false);
      setIsListMain(true);
      setIsSectionDetail(false);
    }, 500);
    handleOpenTodoList();
  };

  return (
    <div className={`HouseTodoList options ${modalStatus}`}>
      <div className="option_header" onClick={handleMenu}>
        <img src={process.env.PUBLIC_URL + `/assets/stick_small.png`} alt="" />
      </div>

      <TodoListMain
        requestContent={requestContent}
        isListMain={isListMain}
        sectionList={sectionList}
        handleAddClick={handleAddClick}
        handleSectionOpen={handleSectionOpen}
      />
      <TodoAddSection isAddSection={isAddSection} handleAddClick={handleAddClick} />
      <SectionDetail
        targetSection={targetSection}
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
