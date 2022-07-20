import React from "react";
import { CardData } from "../../Data";
import Card from "./Card";

export default function Cards(props) {
  return (
    <div className="cards">
      {CardData.map((card, id) => {
        return (
          <div className="parentContainer">
            <Card icon={card.icon} title={card.title} count={card.count} />
          </div>
        );
      })}
    </div>
  );
}
