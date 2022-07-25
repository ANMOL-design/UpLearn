import React from "react";
import { CardData } from "../../Data";
import Card from "./Card";

export default function Cards() {
  var x = 0;
  return (
    <div className="cards">
      {CardData.map((card) => {
        return (
          <>
            <Card icon={card.icon} title={card.title} count={card.count}/>
          </>
        );
      })}
    </div>
  );
}
