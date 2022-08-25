import React from "react";
import studentpic from "../../assets/images/student.png";
import teacherpic from "../../assets/images/teacher.png";
import { useNavigate } from "react-router-dom";

export default function StudentInstructorCard() {
  let navigate = useNavigate();
  const handle1 = () => {
    navigate("/contact");
  };
  const handle2 = () => {
    navigate("/login");
  };
  return (
    <div className="studInsCard">
      <div onClick={handle1} className="studInsCardItem one">
        <div className="part1">
          <h3>Come Learn with UpLearn</h3>
          <p>
            Sign up today and get access to hundreds of resources, ebooks and
            video lectures free of cost
          </p>
        </div>
        <div className="part2">
          <img src={studentpic} alt="" />
        </div>
      </div>
      <div onClick={handle2} className="studInsCardItem two">
        <div className="part1">
          <h3>Become an Instructor</h3>
          <p>
            Top instructors from across the country are a part of the uplearn
            family today join now
          </p>
        </div>
        <div className="part2">
          <img src={teacherpic} alt="" />
        </div>
      </div>
    </div>
  );
}
