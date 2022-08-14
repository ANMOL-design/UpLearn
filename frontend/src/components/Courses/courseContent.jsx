import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ArticleContent from "./CourseContent/Articles";
import CourseCertificate from "./CourseContent/CourseCertificate";
import QuizesContent from "./CourseContent/Quizes";
import VideosContent from "./CourseContent/Video";

import Loader from "../Loader";
import axios from "axios";

var CryptoJS = require("crypto-js");

export default function CourseContent() {

  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  let { id } = useParams();

  console.log(id);

  const [courseData, setCourseData] = useState({});
  const [User, setUser] = useState({});


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

    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            setUser(response.data);
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


    // Fetching the Course Detail 
    const fetchcourse = async () => {
      await axios
        .get("/Instructorcourse/" + id)
        .then((response) => {
          setCourseData(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchcourse();
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate, id]);

  console.log(courseData, User);
  
  let isEnrolled = "";

  if (User.CousesEnrolled) {
    isEnrolled = User.CousesEnrolled.find((i) => i.CourseId == courseData._id);
    if (isEnrolled) {
      return (
        <>
          <div className="course-content-navbar">
            <div className="article-content-display-btn">
              <Link
                id="article-content-Link"
                className="article-content-Link"
                to="Articles"
              >
                Articles
              </Link>
            </div>
            <div className="Video-content-display-btn">
              <Link className="video-content-Link" to="videoLectures">
                Video Lectures
              </Link>
            </div>
            <div className="mcqs-content-display-btn">
              <Link className="mcqs-content-Link" to="Quizes">
                Quizes
              </Link>
            </div>
            <div className="certi-content-display-btn">
              <Link className="certi-content-Link" to="Certification">
                Certificate
              </Link>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<ArticleContent course={courseData} />} />
            <Route
              path="/Articles"
              element={<ArticleContent course={courseData} />}
            />
            <Route
              path="/videoLectures"
              element={<VideosContent videos={courseData} />}
            />
            <Route path="/Quizes" element={<QuizesContent />} />
            <Route path="/Certification" element={<CourseCertificate />} />
          </Routes>
        </>
      );
    } else {
      return <Loader />;
    }
  } else {
    return <Loader />;
  }
}
