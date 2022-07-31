import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "./CoursesCards.json";
import { AiFillStar, AiOutlineRadiusSetting} from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
var CryptoJS = require("crypto-js");

function Courses(){
    const [courseData,setCourseData] = useState([])
    const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
    useEffect(() => {
        window.scroll(0,0);
        // Decrypting the User Role
        if(loginDetails.userRole !== ''){
          var bytes = CryptoJS.AES.decrypt(loginDetails.userRole, 'my-secret-key@123');
          var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
       
        if(Number(loginDetails.isLoggedIn) && role === "STUDENT")
        {
         
          const fetchdata = async () =>{
            await axios.get("/CoursesUplearn").then(response => {
              setCourseData(response.data)
            })
            .catch(error => {
                console.log(error);
                navigate("/login");
            });
          }
          fetchdata();
        }
        else{
          navigate("/login");
        }
      }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate])
    return(
        <>
            {/* Banner Of the Courses  */}
            <div className="course-banner">
                
            </div>
            <div className="course-heading">
            <h1>Available Courses</h1>
            </div>
            {/* Cards Of The Course Page  */}
            <div className="course-cards-container" data-aos="fade-in">
                {courseData.map( (item) => {
                    return(
                       <div className="course-card-inner" key={item._id}>
                            <img src={item.thumbnail} alt="Product" />
                            <h3>{item.title}</h3>
                            <h5>Instracutor: {item.courseInstructor}</h5>
                            {/* <p className="course-duration"> <AiFillClockCircle></AiFillClockCircle>{item.duration}hr</p> */}
                            <div><p className="course-price-free"  >Free</p></div>
                            <AiFillStar ></AiFillStar>
                            {/* <Link to={item.Link}><button>{item.name}</button></Link> */}
                       </div>
                    )
                })}
          </div>
        </>
    );
}

export default Courses;