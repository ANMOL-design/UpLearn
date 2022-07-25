import React from "react";
import { CourseCardData } from "../../Data";
import CourseCard from "./CourseCard";

export default function CourseCards() {
  return (
    <div className="courseCards">
      {CourseCardData.map((courseCard, id) => {
        return (
            <CourseCard
              title={courseCard.title}
              instructor={courseCard.instructor}
              barValue={courseCard.barValue}
              color={courseCard.color}
            />
        );
      })}
    </div>
  );
}
