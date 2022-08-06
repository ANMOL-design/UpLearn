import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "./CoursesCards.json";
import { AiFillStar, AiOutlineRadiusSetting } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { GiNetworkBars } from "react-icons/gi";
import { GrLinkNext } from "react-icons/gr";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import avtar from "../../assets/images/avtar.png";
import axios from "axios";
import BannerGirl from "../../assets/images/couse-banner-student.png";
import {
  MdArrowForward,
  MdBrush,
  MdNotStarted,
  MdOutlineBorderAll,
} from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
var CryptoJS = require("crypto-js");
function Courses() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [courseData, setCourseData] = useState([]);
  const [InstructorInfo, setInstructorInfo] = useState([]);
  const loginDetails = useSelector((state) => state.userReducers);
  let squares = [];

  for (let i = 0; i < 20; i++) {
    squares.push(i);
  }

  const generateRandomNum = ({ min, max }) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  let navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      const fetchdata = async () => {
        await axios
          .get("/CoursesUplearn")
          .then((response) => {
            setCourseData(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else {
      navigate("/login");
    }
    const fetchInstructor = async () => {
      await axios
        .get("/allInstructor")
        .then((response) => {
          setInstructorInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchInstructor();
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);

  const CourseInstructor = (props) => {
    const instructorId = props.id;
    console.log(InstructorInfo);
    const courseInstructor = InstructorInfo.find((e) => e._id == instructorId);
    if (courseInstructor) {
      return (
        <>
          <Link to="/">
            <img src={courseInstructor.image} alt="" />
          </Link>
          <span>
            <Link className="instructor-link" to="/">
              {courseInstructor.Teachername}
            </Link>
          </span>
        </>
      );
    } else {
      return (
        <>
          <img src={avtar}></img>
          <span>Instructor</span>
        </>
      );
    }
  };
  return (
    <>
      <div className="course-main-comtainer">
        <div className="intro">
          <div className="squares-wrapper">
            <div className="banner-text">
              <h1>
                Develop a Passion for <br /> Learning New Things
              </h1>
              <p>
                {" "}
                Learn Free from world class Instuctors and Upgrade your skills{" "}
              </p>
              <button className="course-banner-btn">
                Start Learning <MdNotStarted />{" "}
              </button>
            </div>
            <div className="banner-img">
              <img src={BannerGirl} alt="" />
            </div>
            <ul className="squares">
              {squares.map((el, i) => {
                const randomDimensions = Math.floor(
                  Math.random() * (150 - 15 + 1) + 15
                );
                return (
                  <li
                    key={i}
                    style={{
                      left: `${generateRandomNum({ min: 0, max: 90 })}%`,
                      width: randomDimensions,
                      height: randomDimensions,
                      animationDelay: `${
                        i % 2 ? generateRandomNum({ min: 0, max: 20 }) : 0
                      }s`,
                      animationDuration: `${generateRandomNum({
                        min: 10,
                        max: 50,
                      })}s`,
                    }}
                  />
                );
              })}
            </ul>
          </div>
        </div>

        {/* category slider */}
        <div className="category-slider">
          <div className="category-slider-header">
            <h2>Popular Topics to Learn</h2>
            <p>Browse with Categories</p>
          </div>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
          >
            {data.map((item) => (
              <div key={item.id} className="category-card">
                <div className="category-card-icon">
                  <img src={item.image} alt="" />
                </div>
                <div className="category-card-text">
                  <h2>{item.heading}</h2>
                </div>
                <div className="category-overlay">
                  <h2>{item.heading}</h2>
                  <button>
                    <GrLinkNext />
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="all-category-btn">
            <button
              onClick={(e) => {
                console.log(e);
              }}
            >
              Browse All Category{" "}
              <span>
                <MdArrowForward />
              </span>
            </button>
          </div>
        </div>

        {/* courses */}

        <div className="courses-list-conteiner">
          <div className="courses-list-header">
            <h1>Top Recommended Courses</h1>
          </div>
          <div className="course-list-card-container">
            {courseData.map((item) => {
              return (
                <>
                  <div className="course-list-card">
                    <div className="course-card-img">
                      <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="course-card-body">
                      <span className="course-card-level">
                        {item.level} <GiNetworkBars />
                      </span>
                      <div className="course-card-title">
                        <h2>{item.title}</h2>
                      </div>
                      <hr style={{ margin: "0px 30px 0px 10px" }} />
                      <div className="cours-card-instructor">
                        <CourseInstructor id={item.courseInstructor} />
                        <div className="card-rating">
                          <StarRatings
                            rating={2.403}
                            starDimension="20px"
                            starEmptyColor="grey"
                            starRatedColor="#2b4eff"
                            starSpacing="3px"
                          />
                          </div>
                      </div>
                      
                     
                      <div className="course-card-footer">
                        
                          <div className="course-card-btn">
                            <Link className="course-card-btn-link" to={"/course/"+item._id}>Know More </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
