import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useParams, useNavigate } from "react-router-dom";

export default function ClassSelect() {

  const [isActive, setIsActive] = useState(0);
  const [classs, setClasss] = useState("");
  const params = useParams();
  const board = params.board;
  const navigate = useNavigate();

  const classItem = [
    {
      class: 1,
    },
    {
      class: 2,
    },
    {
      class: 3,
    },
    {
      class: 4,
    },
    {
      class: 5,
    },
    {
      class: 6,
    },
    {
      class: 7,
    },
    {
      class: 8,
    },
    {
      class: 9,
    },
    {
      class: 10,
    },
    {
      class: 11,
    },
    {
      class: 12,
    },
  ];

  const handleClick = (divNum) => () => {
    setIsActive(divNum);
    setClasss(classItem[divNum - 1].class);
    navigate(`/stud-courses/${board}/Class-${classItem[divNum - 1].class}`);
  };

  return (
    <div className="studWrapper">
      {" "}
      <Sidebar />
      <div className="academicCourWrapper">
        <h2>
          For <span style={{ color: "#4262FD" }}>{board}</span> Board
        </h2>

        <h1>Choose Your Class</h1>

        <div className="class">
          {classItem.map((item, index) => {
            return (
              <div
                className="classItem"
                onClick={handleClick(item.class)}
              >
                <a>Class {item.class}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
