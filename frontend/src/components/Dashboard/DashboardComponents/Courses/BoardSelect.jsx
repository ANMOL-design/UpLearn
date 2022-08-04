import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
      board: "UP-Board",
    },
    {
      id: 5,
      board: "Punjab-Board",
    },
    {
      id: 6,
      board: "Himachal-Board",
    },
  ];

  const handleClick = (divNum) => () => {
    setIsActive(divNum);
    setBoard(boardItem[divNum - 1].board);
    navigate(`/stud-courses/${boardItem[divNum - 1].board}`);
  };

  return (
      <div className="academicCourWrapper">
        <h1>Select Your Board</h1>

        <div className="class">
          {boardItem.map((item, index) => {
            return (
              <div
                className="classItem"
                onClick={handleClick(item.id)}
              >
                <span>{item.board}</span>
              </div>
            );
          })}
        </div>
      </div>
  );
}
