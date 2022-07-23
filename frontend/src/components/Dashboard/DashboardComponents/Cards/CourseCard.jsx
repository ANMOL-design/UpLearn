import React from "react";

//for progress bar
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CourseCard(props) {
  return (
    <div
      className="courseCardContainer"
      style={{ background: props.color.backGround }}
    >
      <div className="courseCard">
        <div className="courseTitle">{props.title}</div>
        <div className="courseCardData">
          <div>
            <p>Instructor</p>
            <span>Maical</span>
          </div>
          <div style={{ width: 70, height: 70 }}>
            <CircularProgressbar
              value={props.barValue}
              text={`${props.barValue}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
