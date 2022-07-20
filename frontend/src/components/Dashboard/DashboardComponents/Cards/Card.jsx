import React from "react";

export default function Card(props) {
  return (
    <div className="cardContainer">
      <div className="card">
        <div className="cardHead">
          <props.icon className="cardIcon" />
          <span>{props.title}</span>
        </div>
        <div className="cardContent">
          <span>{props.count}</span>
        </div>
      </div>
    </div>
  );
}
