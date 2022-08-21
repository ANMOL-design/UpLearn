import React, { useEffect, useState } from "react";
import CareerImg from "./../../assets/images/career-img.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function After12th() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const params = useParams();
  const courseCategory = params.after_12;

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
          <h1>After 12th</h1>
          <div className="courseCategory">
            <div className="courseCategoryItem">
              <span className="courseCateHeading">Engineering</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "engineering" ? (
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
              <span className="courseCateHeading">Medical & Health Care</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "medical-health-care" ? (
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
              <span className="courseCateHeading">Commerce</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "commerce" ? (
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
              <span className="courseCateHeading">Diploma in Engineeing</span>
              <ul>
                {data.map((item, index) => {
                  return (
                    <div key={item._id}>
                      {item.subcategory === "diploma-in-engineering" ? (
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
