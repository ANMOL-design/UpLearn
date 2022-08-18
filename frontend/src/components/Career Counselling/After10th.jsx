import React, { useEffect, useState } from "react";
import CareerImg from "./../../assets/images/career-img.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function After12th() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const courseCategory = params.after_10;

  console.log(courseCategory);
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get("/admin/getAllCareerBy/" + courseCategory)
        .then((response) => {
          console.log(response.data);
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

  const handleClick = (id) => {
    navigate(`/about/${id}`);
  };

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
          <h1>After 10th</h1>
          <div className="courseCategory">
            <div className="courseCategoryItem">
              <span className="courseCateHeading">Class 11th-12th</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "class-11-12" ? (
                        <li>
                          <div onClick={() => handleClick(item._id)}>
                            {item.title}
                          </div>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>

            <div className="courseCategoryItem">
              <span className="courseCateHeading">Diploma Courses</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "diploma-courses" ? (
                        <li>
                          <div onClick={() => handleClick(item._id)}>
                            {item.title}
                          </div>
                        </li>
                      ) : null}
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="courseCategoryItem">
              <span className="courseCateHeading"> Paramedical Courses</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.subcategory === "paramedial-courses" ? (
                        <li>
                          <div onClick={() => handleClick(item._id)}>
                            {item.title}
                          </div>
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
