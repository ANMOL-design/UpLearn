import React from "react";
import { Link } from "react-router-dom";

function FeaturesHome(){
 
    return(
        <div className="features-home">
        <div className="homecards" >
  <div className="homecard fill-orange" data-homecard={0}>
    <div className="homecard__icon" data-icon={1} />
    <div className="homecard__detail">details</div>
  </div>
  <div className="homecard fill-blue" data-homecard={1}>
    <div className="homecard__icon" data-icon={2} />
    <div className="homecard__detail">details</div>
  </div>
  <div className="homecard fill-green" data-homecard={2}>
    <div className="homecard__icon" data-icon={3} />
    <div className="homecard__detail">details</div>
  </div>
  <div className="homecard fill-green" data-homecard={3}>
    <div className="homecard__icon" data-icon={4} />
    <div className="homecard__detail">details</div>
  </div>
  <div className="homecard fill-green" data-homecard={4}>
    <div className="homecard__icon" data-icon={5} />
    <div className="homecard__detail">details</div>
  </div>
</div>
</div>

    );



}
export default FeaturesHome;