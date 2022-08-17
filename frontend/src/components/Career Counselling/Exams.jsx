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
        <h1>Exams</h1>
        <div className="courseCategory">
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Medical Exams</span>
            <ul>
              <li>
                <a>Neet</a>
              </li>
              
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Engineering Exams</span>
            <ul>
              <li>
                <a>JEE Mains</a>
              </li>
              
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">MBA Exams</span>
            <ul>
              <li>
                <a>CAT</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">LAW Exams</span>
            <ul>
              <li>
                <a>CLAT</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Competetive Exams</span>
            <ul>
              <li>
                <a>UPSC</a>
              </li>
            </ul>
          </div>
          <div className="courseCategoryItem">
            <span className="courseCateHeading">Others</span>
            <ul>
              <li>
                <a>NATA</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
