import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function BoardSelect() {
  const [isActive, setIsActive] = useState(0);
  const [board, setBoard] = useState("");
  const navigate = useNavigate();

  const boardItem = [
    {
      id: 1,
      board: "CBSE",
    },
    {
      id: 2,
      board: "HBSE",
    },
    {
      id: 3,
      board: "ICSE",
    },
    {
      id: 4,
      board: "jksdf",
    },
    {
      id: 5,
      board: "kdfdf",
    },
    {
      id: 6,
      board: "dfs",
    },
  ];

  const handleClick = (divNum) => () => {
    setIsActive(divNum);
    setBoard(boardItem[divNum - 1].board);
    navigate(`/stud-courses/${boardItem[divNum - 1].board}`);
  };

  return (
    <div className="studWrapper">
      <Sidebar />
      <div className="academicCourWrapper">
        <h1>Select Your Board</h1>

        <div className="class">
          {boardItem.map((item, index) => {
            return (
              <div
                // className={isActive === item.id ? "random" : "classItem"}
                className="classItem"
                onClick={handleClick(item.id)}
              >
                {/* <a>{item.board}</a> */}
                <span>{item.board}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
