import React from "react";
import CareerImg from "./../../assets/images/career-img.png";

export default function After10th() {
  return (
    <div className="career-counselling">
      <div className="after-banner">
        <div className="after-banner-text">
          <span>
            Choosing the right
            <br />
            career path
          </span>
        </div>
        <div className="after-banner-img">
          <img src={CareerImg} />
        </div>
      </div>
      <div className="afterBannerWrapper">
        <h1>After 10th</h1>
        <div className="courseCategory">
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Class 11th-12th</span>
            <ul>
              <li>
                <a>Science</a>
              </li>
              <li>
                <a>Commerce</a>
              </li>
              <li>
                <a>Arts</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Diploma Courses</span>
            <ul>
              <li>
                <a>MBBS</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Paramedical Courses</span>
            <ul>
              <li>
                <a>B.Com</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">ITI Courses</span>
            <ul>
              <li>
                <a>Polytechnic</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Vocational Courses</span>
            <ul>
              <li>
                <a>BA</a>
              </li>
              <li>
                <a>BFA</a>
              </li>
              <li>
                <a>DFA</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Polytechnic Courses</span>
            <ul>
              <li>
                <a>BA</a>
              </li>
              <li>
                <a>BFA</a>
              </li>
              <li>
                <a>DFA</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
