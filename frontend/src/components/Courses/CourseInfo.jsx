import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import avtar from "../../assets/images/avtar.png";
import { GrLinkNext } from "react-icons/gr";
var CryptoJS = require("crypto-js");
export default function CourseInfo(){
    let navigate = useNavigate();
    let {id} = useParams();
    console.log(id);
    const [courseData, setCourseData] = useState({});
    const loginDetails = useSelector((state) => state.userReducers);
    const [InstructorInfo, setInstructorInfo] = useState([]);
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
     
     let Instructor = InstructorInfo.find((i)=>i._id==courseData.courseInstructor);
    let instructorImage = avtar;
    let InstructorName = "Instructor"
    if(Instructor){
        instructorImage=Instructor.image;
        InstructorName=Instructor.Teachername;
    }
    let courseDescription ="";
    courseDescription = courseData.Description
    if(courseDescription){

        document.getElementById("course-info-description-content").innerHTML = courseDescription;
    }
    return(
        <>
       <div className="course-info-main-container">
        <div className="course-info-header">
        <div className="course-info-banner-container">
            <div className="banner-left">
                <span className="course-info-category">
                    {courseData.courseCategory}
                </span>
                <span className="course-info-category-2">
                    {courseData.level}
                </span>
                <h1>{courseData.title}</h1>
                <p>{courseData.courseojective}</p>
                
                        <div className="InstructorDetails">
                            <div className="instructo-info-container">
                                <img src={instructorImage} alt="" />
                                <span>{InstructorName}</span>
                            </div>
                            <div className="card-rating">
                          <StarRatings
                            rating={2.403}
                            starDimension="20px"
                            starEmptyColor="grey"
                            starRatedColor="#2b4eff"
                            starSpacing="3px"
                          />
                           <span>2.4</span>
                           </div>
                          </div>
                    <div className="enroll-course-btn">
                        <button>Enroll <GrLinkNext /></button>
                    </div>
            </div>
           
            <div className="banner-right">
            <img className="course-info-banner-image" src={courseData.thumbnail} alt="" />
            </div>
        </div>
        
        </div>
        <div className="course-info-Description-container">
            <h1>Course Overview</h1>
        <div className="course-info-Description"> 
            <div id="course-info-description-content" className="course-info-description-content">

            </div>
            <div className="course-other-detail-card">
                <h3>Free</h3>
                <ul>
                    <li>Course Level &nbsp;&nbsp;&nbsp;&nbsp;: {courseData.level}</li>
                    <hr />
                    <li>Video Lectures : </li>
                    <hr />
                    <li>Video Lectures : </li>
                    <hr />
                    <li>Quizes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 0</li>
                    <hr />
                    <li>Language &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {courseData.language}</li>
                    <hr />
                </ul>
            </div>
            </div>
        </div>
       </div>
        </>
    )
  
}