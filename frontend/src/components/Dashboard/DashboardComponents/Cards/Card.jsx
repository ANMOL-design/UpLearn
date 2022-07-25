import React from "react";

export default function Card(props) {
  return (
    <div className="cardContainer">
        {/* Top Heading / */}
        <div className="cardHead">
          <props.icon className="cardIcon" />
          <span>{props.title}</span>
        </div>
        {/* Bottom Count  */}
        <div className="cardContent">
          <span>{props.count}</span>
        </div>
    </div>
  );
}
