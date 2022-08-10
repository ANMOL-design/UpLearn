import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
var CryptoJS = require("crypto-js");
export default function AddQuiz() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  const { id } = useParams();
  const [Instructor, setInstructor] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [Quiz, setQuiz] = useState({
    QuizeName: "",
    QuizDifficulty: "",
    marksPerQuestion: 0,
    QuestionsofqQuiz: [
      {
        question: "",
        options: [
          {
            option: "",
          },
        ],
        correctOption: "",
      },
    ],
  });
  const handlechange = (e) => {
    setQuiz({ ...Quiz, [e.target.name]: e.target.value });
  };
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
  const [err, seterr] = useState("");
  const handlevalidation = () => {
    if (!Quiz.QuizeName || !Quiz.QuizDifficulty || !Quiz.marksPerQuestion) {
      seterr("Please Enter All Fields");
      return false;
    } else if (Quiz.marksPerQuestion <= 0 || Quiz.marksPerQuestion > 5) {
      seterr("please choose Marks per Question Between 1 to 5");
      return false;
    } else {
      return true;
    }
  };
  const postData = async () => {
    const CourseId=id;
    const { QuizeName, QuizDifficulty, marksPerQuestion } = Quiz;
    const res = await fetch("/createQuiz", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
       CourseId, QuizeName, QuizDifficulty, marksPerQuestion 
      }),
    });

    if (res.status === 200) {
      navigate("/instructorDashboard/my_courses/Edit_content/"+id);
    } else {
      console.log(res);
      window.alert("error occured");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handlevalidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addquiz-btn").disabled = true;
      postData();
    }
  };
  return (
    <>
      <div
        className="add-quiz-main-container"
        style={{ margin: "0px 100px", padding: "20px 10px" }}
      >
        <Link to={"/instructorDashboard/my_courses/Edit_content/" + id}>
          back
        </Link>
        <div className="add-quiz-form">
          <div className="add-course-Input">
            <label htmlFor="QuizeName">
              Name of Quiz <span className="star">*</span>
            </label>{" "}
            <br />
            <input
              type="text"
              value={Quiz.QuizeName}
              name="QuizeName"
              placeholder="Name of the test"
              id="QuizeName"
              onChange={(e) => handlechange(e)}
            />
          </div>
          <div className="add-course-radio">
            <label htmlFor="">
              Difficulty of Test : <br />
              <input
                type="radio"
                id="Beginers"
                name="QuizDifficulty"
                value="Easy"
                onChange={(e) => handlechange(e)}
              />
              <label htmlFor="Beginers">Easy</label>
              <br />
              <input
                type="radio"
                id="Intermidiate"
                name="QuizDifficulty"
                value="Medium"
                onChange={(e) => handlechange(e)}
              />
              <label htmlFor="Intermidiate">Medium</label>
              <br />
              <input
                type="radio"
                id="Advanced"
                name="QuizDifficulty"
                value="Hard"
                onChange={(e) => handlechange(e)}
              />
              <label htmlFor="Advanced">Hard</label>
            </label>
          </div>
          <div className="add-course-Input">
            <label htmlFor="marksPerQuestion">
              Marks Per Question <span className="star">*</span>
            </label>
            <input
              type="Number"
              value={Quiz.marksPerQuestion}
              name="marksPerQuestion"
              placeholder="please enter marks Greater than or equal to 1"
              id="marksPerQuestion"
              onChange={(e) => handlechange(e)}
            />
          </div>
          <p className="star">{err}</p>
          <div className="submit-btn">
            <input
              type="submit"
              id="addquiz-btn"
              className="addBtn"
              onClick={handleSubmit}
              value="Create Quiz"
            />
          </div>
        </div>
      </div>
    </>
  );
}
