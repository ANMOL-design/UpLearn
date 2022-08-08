import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import ArticleContent from "./CourseContent/Articles";
import QuizesContent from "./CourseContent/Quizes";
import VideosContent from "./CourseContent/Video";
var CryptoJS = require("crypto-js");
export default function CourseContent(){
    let navigate = useNavigate();
    let {id} = useParams();
    console.log(id);
    const [courseData, setCourseData] = useState({});
    const loginDetails = useSelector((state) => state.userReducers);
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
  
      if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
        const fetchdata = async () => {
          await axios
            .get("/Instructorcourse/"+id)
            .then((response) => {
              setCourseData(response.data[0]);
            })
            .catch((error) => {
              console.log(error);
              navigate("/login");
            });
        };
        fetchdata();
        const fetchUser= async () => {
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
        fetchUser();
      } else {
        navigate("/login");
      }
      
    }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);
    let isEnrolled = "";
   
   
    if (User.CousesEnrolled) {
      isEnrolled = User.CousesEnrolled.find(
        (i) => i.CourseId == courseData._id
      );
      if (isEnrolled) {
        return (
            <>
          <div  className="course-content-navbar">
            <div className="article-content-display-btn">
               <Link id="article-content-Link" className="article-content-Link"  to="Articles">Articles</Link>
            </div>
            <div className="Video-content-display-btn">
            <Link className="video-content-Link"  to="videoLectures">Video Lectures</Link>
            </div>
            <div className="mcqs-content-display-btn">
            <Link className="mcqs-content-Link" to="Quizes">Quizes</Link>
            </div>
          </div>
          <Routes>
          <Route path="/" element={<ArticleContent course={courseData}   />} /> 
          <Route path="/Articles" element={<ArticleContent course={courseData}   />} /> 
          <Route path="/videoLectures" element={<VideosContent />} /> 
          <Route path="/Quizes" element={<QuizesContent />} />  
      </Routes>
      </>
        );
      } else {
          return(
            <Loader/>
          )
      }
    } else {
        return(
            <Loader/>
          )
    }
}