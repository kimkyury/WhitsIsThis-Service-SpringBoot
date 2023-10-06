import TodoSectionItem from "./TodoSectionItem";

import { useEffect, useState } from "react";
import AuthHttp from "../utils/AuthHttp";

const TodoAddSection = ({ isAddSection, handleAddClick }) => {
  const [sectionList, setSectionList] = useState();

  useEffect(() => {
    const getSectionList = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/rooms`,
        });
        setSectionList(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getSectionList();
  }, []);

  return (
    <div
      className={`TodoAddSection section_list ${
        isAddSection ? "slide_in_right" : "slide_out_right"
      }`}
    >
      {sectionList &&
        sectionList.map((it, idx) => {
          return (
            <TodoSectionItem
              key={idx}
              sectionName={it.name}
              type={"add"}
              onClick={() => handleAddClick(it.id)}
            />
          );
        })}
    </div>
  );
};

export default TodoAddSection;
