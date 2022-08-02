import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Subject() {
  const [isActive, setIsActive] = useState(1);
  const [subject, setSubject] = useState("CBSE");
  const params = useParams();
  const board = params.board;
  const classs = params.class;

  const boardItem = [
    {
      id: 1,
      subject: "English",
    },
    {
      id: 2,
      subject: "Physics",
    },
    {
      id: 3,
      subject: "Chemistry",
    },
  ];

  const handleClick = (divNum) => () => {
    setIsActive(divNum);
    setSubject(boardItem[divNum - 1].subject);
  };

  return (
    <div>
      {" "}
      <div className="academicCourWrapper">
        <h2 style={{ color: "#4262FD" }}>{classs}</h2>
        <h1>Select Your Subject</h1>

        <div className="class">
          {boardItem.map((item, index) => {
            return (
              <div
                className={isActive === item.id ? "random" : "classItem"}
                onClick={handleClick(item.id)}
              >
                <a>{item.subject}</a>
              </div>
            );
          })}
        </div>
        <div className="nextBtn">
          {/* <a href="#">Next &raquo;</a> */}
          <Link to={`/stud-courses/${board}/${classs}/${subject}`}>
            Next &raquo;
          </Link>
        </div>
      </div>
    </div>
  );
}
