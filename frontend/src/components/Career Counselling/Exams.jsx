import React, { useEffect, useState } from "react";
import CareerImg from "./../../assets/images/career-img.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function Exams() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const params = useParams();
  const courseCategory = params.exams;

  console.log(courseCategory);
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get("/admin/getAllCareerBy/" + courseCategory)
        .then((response) => {
          setData(response.data);
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // navigate("/login");
        });
    };
    fetchdata();
  }, [courseCategory]);

  if (isLoading) {
    return <Loader />;
  } else {
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
            <img src={CareerImg} alt="" />
          </div>
        </div>
        <div className="afterBannerWrapper">
          <h1>Exams</h1>
          <div className="courseCategory">
            <div className="courseCategoryItem">
              <span className="courseCateHeading">Engineering Exams</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "engineering-exams" ? (
                        <li>
                          <Link to={`/about/${item._id}`}>{item.title}</Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>

            <div className="courseCategoryItem">
              <span className="courseCateHeading">Competitive Exams</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "competitive-exams" ? (
                        <li>
                          <Link to={`/about/${item._id}`}>{item.title}</Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="courseCategoryItem">
              <span className="courseCateHeading">MBA Exams</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "mba-exams" ? (
                        <li>
                          <Link to={`/about/${item._id}`}>{item.title}</Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="courseCategoryItem">
              <span className="courseCateHeading">Medical Exams</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "medical-exams" ? (
                        <li>
                          <Link to={`/about/${item._id}`}>{item.title}</Link>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
