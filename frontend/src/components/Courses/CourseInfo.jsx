import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import avtar from "../../assets/images/avtar.png";
import { GrLinkNext } from "react-icons/gr";
var CryptoJS = require("crypto-js");
export default function CourseInfo() {
  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  const [courseData, setCourseData] = useState({});
  const loginDetails = useSelector((state) => state.userReducers);
  const [InstructorInfo, setInstructorInfo] = useState([]);
  const [User, setUser] = useState({});
  const [courserating, setcourseRating] = useState(0);


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
          .get("/Instructorcourse/" + id)
          .then((response) => {
            setCourseData(response.data[0]);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
      const fetchUser = async () => {
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

  let Instructor = InstructorInfo.find(
    (i) => i._id == courseData.courseInstructor
  );
  let instructorImage = avtar;
  let InstructorName = "Instructor";
  if (Instructor) {
    instructorImage = Instructor.image;
    InstructorName = Instructor.Teachername;
  }
  let courseDescription = "";
  courseDescription = courseData.Description;
  let NoOfVideos = 0;
  let NoOfArticles = 0;
  if (courseData.courseVideoContent && courseData.courseArticles) {
    NoOfVideos = courseData.courseVideoContent.length;
    NoOfArticles = courseData.courseArticles.length;
  }
  if (courseDescription) {
    document.getElementById("course-info-description-content").innerHTML =
      courseDescription;
  }
  const EnrollCourse = async () => {
    const userId = User._id;
    const CourseId = courseData._id;
    const nameOfCourse = courseData.title;
    const res = await fetch("/EnrolledCourse", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        CourseId,
        nameOfCourse,
      }),
    });

    if (res.status === 200) {
      navigate("/studentdashboard");
    } else {
      console.log(res);
      window.alert("error occured");
    }
  };

  const CheckEnrolled = () => {
    let isEnrolled = "";
    if (User.CousesEnrolled) {
      isEnrolled = User.CousesEnrolled.find(
        (i) => i.CourseId == courseData._id
      );
      if (isEnrolled) {
        return (
          <Link to={"/mycourses/startLearning/" + id}>
            <button>Start Learning</button>
          </Link>
        );
      } else {
        return (
          <button onClick={EnrollCourse}>
            Enroll <GrLinkNext />
          </button>
        );
      }
    } else {
      return (
        <button onClick={EnrollCourse}>
          Enroll <GrLinkNext />
        </button>
      );
    }
  };
  
  const CourseReview = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [err, seterr] = useState("");
    let courseId = courseData._id;
    let UserId = User._id;
    let totalRating=0
    if(courseData){
      if (courseData.Rating) {
        if(courseData.Rating.length>0){
        courseData.Rating.map((item)=>{
          totalRating += item.rating;
        })
        totalRating /= (courseData.Rating.length);
        totalRating =  Math.round(totalRating * 10) / 10
          setcourseRating(totalRating)
      }
      }
    }
    const handleRating = (rate) => {
      setRating(rate);
      // other logic
    };
    const sendReview = async () => {
      if (rating < 1) {
        seterr("please give any Rating Between 1-5");
      } else if (!review) {
        seterr("please giveany Review to the course");
      } else {
        let isRating = [];
        if (courseData.Rating) {
        
          isRating = courseData.Rating.find((i) => i.rateBy == User._id);
          if (isRating) {
            seterr("Already Rating to Course");
          } else {
            const res = await fetch("/CourseRating", {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify({
                courseId,
                UserId,
                rating,
                review,
              }),
            });

            if (res.status === 200) {
              seterr("Thankyou for Rating .\nRating Succesfull!");
              navigate("/courses")
            } else {
              console.log(res);
              window.alert("error occured");
            }
          }
        } else {
          const res = await fetch("/CourseRating", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId,
              UserId,
              rating,
              review,
            }),
          });

          if (res.status === 200) {
            seterr("Thankyou for Rating .\nRating Succesfull!");
          } else {
            console.log(res);
            window.alert("error occured");
          }
        }
      }
    };
    let isEnrolled = "";
    if (User.CousesEnrolled) {
      isEnrolled = User.CousesEnrolled.find(
        (i) => i.CourseId == courseData._id
      );
      if (isEnrolled) {
        return (
          <div className="course-review">
            <h2>Review this Course</h2>
            <StarRatings
              rating={rating}
              starRatedColor="#2b4eff"
              changeRating={handleRating}
              numberOfStars={5}
              starHoverColor="#2b4eff"
              name="rating"
              starDimension="24px"
            />
            <div className="add-course-Input">
              <label htmlFor="course Review">Review :</label>
              <input
                type="text"
                name="couseReview"
                required
                placeholder="Enter Your Reviews About Course"
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div className="enroll-course-btn">
              <p className="star">{err}</p>
              <button onClick={sendReview}>Send Review</button>
            </div>
          </div>
        );
      } else {
        return <></>;
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="course-info-main-container">
        <div className="course-info-header">
          <div className="course-info-banner-container">
            <div className="banner-left">
              <span className="course-info-category">
                {courseData.courseCategory}
              </span>
              <span className="course-info-category-2">{courseData.level}</span>
              <h1>{courseData.title}</h1>
              <p>{courseData.courseojective}</p>

              <div className="InstructorDetails">
                <div className="instructo-info-container">
                  <img src={instructorImage} alt="" />
                  <span>{InstructorName}</span>
                </div>
                <div className="card-rating">
                  <StarRatings
                    rating={courserating}
                    starDimension="20px"
                    starEmptyColor="grey"
                    starRatedColor="#2b4eff"
                    starSpacing="3px"
                  />
                  <span>{courserating}</span>
                </div>
              </div>
              <div className="enroll-course-btn">
                <CheckEnrolled />
              </div>
            </div>

            <div className="banner-right">
              <img
                className="course-info-banner-image"
                src={courseData.thumbnail}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="course-info-Description-container">
          <h1>Course Overview</h1>
          <div className="course-info-Description">
            <div
              id="course-info-description-content"
              className="course-info-description-content"
            ></div>
            <div className="course-other-detail-card">
              <h3>Free</h3>
              <ul>
                <li>
                  Course Level &nbsp;&nbsp;&nbsp;&nbsp;: {courseData.level}
                </li>
                <hr />
                <li>Video Lectures : {NoOfVideos} </li>
                <hr />
                <li>
                  Articles&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                  {NoOfArticles}{" "}
                </li>
                <hr />
                <li>
                  Quizes
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  0
                </li>
                <hr />
                <li>
                  Language
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                  {courseData.language}
                </li>
                <hr />
              </ul>
            </div>
          </div>
        </div>
        <div className="courses-review-container">
          <CourseReview />
        </div>
      </div>
    </>
  );
}
