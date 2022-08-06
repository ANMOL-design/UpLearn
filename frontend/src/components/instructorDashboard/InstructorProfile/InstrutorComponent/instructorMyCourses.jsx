import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NotFoundImg from "../../../../assets/images/not-found.webp";
import AddCourses from "../../Instructorscomponent/addCourse";
import { FaEdit } from 'react-icons/fa';
var CryptoJS = require("crypto-js");
export default function MyCourses() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [Instructor, setInstructor] = useState({});
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    window.scroll(0, 120);
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    // Check is  Login Or Not
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            setInstructor(response.data);
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
    const fetchcourse = async () => {
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
    fetchcourse();
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);

  const AddCoursecontent = () => {
    const my_courses = courseData.filter(
      (e) => e.courseInstructor === Instructor._id
    );
    if (my_courses.length < 1) {
      return (
        <>
          <div className="addcourse-main-container">
            <div className="no-found-container">
              <img src={NotFoundImg} alt="" />
              <h1>Not Any Course Added By You</h1>
              <Link to="add_new_course" className="btn-add-new-course btn">
                Add New Course
              </Link>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="addcourse-main-container">
            <div className="my-courses-container">
              <div className="my-courses-header">
                <h2>My Courses</h2>
              </div>
              <div className="add-new-course-container">
                <Link to="add_new_course" className="btn-add-new-course-2">
                  Add New Course
                </Link>
              </div>
            </div>
            <hr style={{ marginTop: "10px" }} />
            <div className="add-content-card-container">
              {my_courses.map((item) => (
                <>
                  <div className="add-content-card">
                    <div className="add-content-card-img-container">
                        <img src={item.thumbnail} alt="" />
                    </div>
                    <div className="add-content-card-body">
                       <h2>{item.title}</h2>
                       <p><strong>Categoty : </strong>{item.courseCategory}</p>
                       <Link className="edit-content-link" to={"Edit_Content/"+item._id}><button> Edit/Manage <FaEdit/></button></Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <AddCoursecontent />
    </>
  );
}
