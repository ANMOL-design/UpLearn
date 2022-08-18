import React from "react";
import CareerImg from "./../../assets/images/career-img.png";

export default function After12th() {
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
        <h1>After 12th</h1>
        <div className="courseCategory">
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Engineering</span>
            <ul>
              <li>
                <a>B.Tech</a>
              </li>
              <li>
                <a>Computer Science</a>
              </li>
              <li>
                <a>Information Technology</a>
              </li>
              <li>
                <a>Electrical Engineering</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Medical & Health Care</span>
            <ul>
              <li>
                <a>MBBS</a>
              </li>
              <li>
                <a>BPT</a>
              </li>
              <li>
                <a>BDS</a>
              </li>
              <li>
                <a>BAMS</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Commerce</span>
            <ul>
              <li>
                <a>B.Com</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Diploma in Engineering</span>
            <ul>
              <li>
                <a>Polytechnic</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Arts and Humanities</span>
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
            <span className="courseCateHeading">Computers</span>
            <ul>
              <li>
                <a>BCA</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
