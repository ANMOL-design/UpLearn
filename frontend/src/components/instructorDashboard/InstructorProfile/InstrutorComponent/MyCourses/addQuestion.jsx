import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
var CryptoJS = require("crypto-js");
export default function AddQuestion() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  const { id, quiz_id } = useParams();
  console.log(quiz_id);
  const [Instructor, setInstructor] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [Question, setQuestion] = useState(
    [
      {
        question: "",
         options: [""],
        correctOption: "",
        MarksPerquestion:0,
      },
    ],
  );
  //   const handlechange = (e) => {
  //     setQuiz({ ...Quiz, [e.target.name]: e.target.value });
  //   };
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
 console.log(Question);
  let i = 0;
 
    const postData = async () => {
      const CourseId=id;
      const Question1 =Question;
      const quizId = quiz_id;
      Question.map(async(item)=>{
        console.log(item);
        let question=item.question;
        let options =item.options;
        let correctOption=item.correctOption;
        let  MarksPerquestion=item.MarksPerquestion;
      const res = await fetch("/addQuestionToQuiz", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
        CourseId,question,options,correctOption,quizId,MarksPerquestion
        }),
      });
  
      if (res.status === 200) {
        console.log("question Added");
      } else {
        console.log(res);
        window.alert("error occured");
      }
    })
    }
    const handleSubmit =()=>{
      postData()
  }
  return (
    <>
    <form>
      <div className="add-question-main-container" style={{marginLeft:"7rem"}}>
        <h2>Add Questions in Quiz</h2>
        <p className="star"><strong>Note :</strong> Please Select any Correct option from checkbox</p>
        {Question.map((item, index) => (
          <>
        <div className="add-question-card-container">
          <div className="addQuiz-Input">
            <label >
          {index+1}. Question : 
            </label> <br />
            <input type="text"
            required
            placeholder="Enter your Question"
             onChange={(e) => {
              const temp =[...Question
            ]
           temp[index].question=e.target.value;
            setQuestion(temp)
             }} 
            value={item.question} />
            </div> <br />
            <label htmlFor="">Marks Obtained by Question :</label> <br />
            <input type="text" className="addQuiz-Input-option" placeholder="Enter Options" required value={Question[index].MarksPerquestion} onChange={(e)=>{
                const marks_temp = [...Question];
                marks_temp[index].MarksPerquestion = e.target.value;
                setQuestion(marks_temp)
               }} /> <br />
            {item.options.map((option,ind)=>(
              <>
            <div >
            <label >
            Options : 
            </label> <br />
           
          
            
          
               <input type="text" className="addQuiz-Input-option" placeholder="Enter Options" required value={option} onChange={(e)=>{
                const opt_temp = [...Question];
                opt_temp[index].options[ind] = e.target.value;
                setQuestion(opt_temp)
               }} />
               <input type="radio" className="addQuiz-Input-options-select" placeholder="pleasechoose Correct Option" required value={ind+1} name={"correctoption"+index} id={ind+1} onChange={(e)=>{
            let tempor = [...Question]
            tempor[index].correctOption = ind+1;
            setQuestion(tempor)
                      }} />
              </div>
              </>
            ))}
             <div >
            <button className="add-quiz-btn" onClick={(e)=>{
          const temp =[...Question]
          temp[index].options.push(
            ""
          )
          setQuestion(temp)
        }}>Add option </button><br />
         
        </div>

 
           </div>
          </>
           
           ))}
        <button className="add-quiz-btn" onClick={(e)=>{
          const temp =[...Question]
          temp.push({
            question: "",
             options: [""],
            correctOption: "",
          },)
          setQuestion(temp)
        }}>Add more Questions </button>
        <br />
        </div>
       <input type="submit" className="submit-quiz-btn" onClick={handleSubmit} value="Add Quiz in Course" />
      </form>
    </>
  );
}
