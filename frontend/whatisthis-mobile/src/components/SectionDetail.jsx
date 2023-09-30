import TodoSectionItem from "./TodoSectionItem";
import TodoListItem from "./TodoListItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import AuthHttp from "../utils/AuthHttp";
import { useState } from "react";

// 할일이 객체로 이름, 내용, 선택됨, 이미지 를 갖고 있어야 함

const SectionDetail = ({ targetSection, isSectionDetail, handleSectionOpen }) => {
  const navigate = useNavigate();
  const { houseId } = useParams();

  // 렌더링 여러번 되는 문제 개선 필요

  // useEffect(() => {
  //   const getTodoList = async () => {
  //     try {
  //       const response = await AuthHttp({
  //         method: "patch",
  //         url: `/private/histories/${houseId}/todolists`,
  //         data: {
  //           roomId: targetSection.id,
  //         },
  //       });
  //       console.log(response);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  // }, []);

  const closeSectionDetail = (roomOrder) => {
    console.log(targetSection);
    targetSection.todolist.map(async (todo) => {
      try {
        const response = await AuthHttp({
          method: "patch",
          url: `/private/todolists/${todo.id}/status`,
          data: {
            isChecked: todo.isChecked,
            significant: todo.significant,
          },
        });
        // console.log(response);
      } catch (e) {
        console.error(e);
      }
    });
    handleSectionOpen(roomOrder);
  };

  const handleCheckboxChange = (id, value) => {
    targetSection.todolist.find((it) => parseInt(it.id) === parseInt(id)).isChecked = value;

    const currentState = targetSection.todolist.find((it) => parseInt(it.id) === parseInt(id));
    // console.log(currentState);
  };

  const handleDescriptionChange = (id, value) => {
    targetSection.todolist.find((it) => parseInt(it.id) === parseInt(id)).significant = value;
    const currentState = targetSection.todolist.find((it) => parseInt(it.id) === parseInt(id));
    // console.log(currentState);
  };

  const openCamera = (todoListItemId, todoListContent) => {
    console.log(todoListItemId);
    const targetTodoItem = targetSection.todolist.find(
      (it) => parseInt(it.id) === parseInt(todoListItemId)
    );
    // console.log(buildingId, houseId);
    navigate(`/camera`, {
      state: {
        todoListId: todoListItemId,
        todoListContent: todoListContent,
        images: targetTodoItem.images,
      },
    });
  };

  if (!targetSection) {
    return <div className="SectionDetail">로딩중입니다...</div>;
  } else {
    return (
      <div
        className={`SectionDetail section_list ${
          isSectionDetail ? "slide_in_right" : "slide_out_right"
        }`}
      >
        <TodoSectionItem
          sectionName={targetSection.roomName}
          onClick={() => closeSectionDetail(targetSection)}
          type={"add"}
          isSave={true}
        />
        {targetSection.todolist &&
          targetSection.todolist.map((it) => {
            return (
              <TodoListItem
                key={it.id}
                todoListId={it.id}
                handleCheckboxChange={handleCheckboxChange}
                handleDescriptionChange={handleDescriptionChange}
                todoListItem={it}
                openCamera={openCamera}
              />
            );
          })}
      </div>
    );
  }
};

export default SectionDetail;
