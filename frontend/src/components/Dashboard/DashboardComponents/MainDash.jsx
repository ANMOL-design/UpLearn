import React from "react";
import Cards from "./Cards/Cards";
export default function MainDash() {
 
  
  return (
    <div className="mainDashContainer">
      <div>
        <h2>Dashboard</h2>
        <div className="studentNameContainer">
          <div className="studentName">
            <h4>Welcome Alice!</h4>
            <p>
              Education is the passport to the future, So learn more &amp; more
            </p>
          </div>
          <div className="image">
            <img
              src="https://eduadmin-template.multipurposethemes.com/bs4/images/svg-icon/color-svg/custom-15.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="mainCard">
        <Cards />
      </div>
    </div>
  );
  
}
