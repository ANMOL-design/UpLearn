import React from "react";
import { EventData } from "../../Data";
import EventCard from "./EventCard";

export default function eventCards() {
  return (
    <div className="eventCards">
      {EventData.map((eventCard, id) => {
        return (
          <div className="parentContainer">
            <EventCard
              title={eventCard.title}
              date={eventCard.date}
              color={eventCard.color}
            />
          </div>
        );
      })}
    </div>
  );
}
