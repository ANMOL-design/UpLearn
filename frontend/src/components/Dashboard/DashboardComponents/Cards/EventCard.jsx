import React from "react";

export default function EventCard(props) {
  return (
    <div
      className="eventCard"
      style={{ backgroundColor: props.color.backGround }}
    >
      <div className="title">
        <h4>{props.title}</h4>
      </div>
      <div className="content">
        <span>{props.date}</span>
        <a href="#/">Learn More</a>
      </div>
    </div>
  );
}
