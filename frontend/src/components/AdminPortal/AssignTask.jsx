import React, {useState, useEffect} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import Loader from "../Loader";

function AssignSyllbusTask(){

    let navigate = useNavigate();
    const adminstatus = useSelector((state) => state.AdminReducers);

    const { id } = useParams();
    const [teacher, setteacher] = useState([]);
    const [Loading, setLoading] = useState(true);  

    // State for the Input text 
    const [classes, setclasses] = useState('');
    const [subject, setsubject] = useState('');
    const [dob, setdob] = useState('');
    const [board, setboard] = useState('');

    const [name, setname] = useState('');
    const [chapter, setchapter] = useState(0);
    const [description, setdescription] = useState('');

    const [err, seterr] = useState('');

    useEffect(() => {
        window.scroll(0,0);
        // Check is Admin Login Or Not 
        if(Number(adminstatus.isAdminLoggedIn)){
            // call the fetch admin detail function 
            const fetchdata = async () =>{
                await axios.get("/instructordetails/" + id).then(response => {
                    setteacher(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    navigate("/admin-portal-login-190310554227");
                });
              }
            fetchdata();
        }
        // If User is not login redirect to login 
        else{
            navigate("/admin-portal-login-190310554227");
        }
    }, [adminstatus.isAdminLoggedIn, navigate, id]);

    const AssignTaskToInstructor = async () => {
        const TeacherId = id;
        const Subject = subject;
        const Class = classes;
        const DueDate = dob;
        const Board = board;
        const ChapterName = name;
        const ChapterNo = chapter;
        const ChapterDescription = description;

        const res = await fetch("/AssignTaskToInstructor", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
                TeacherId,
                Subject,
                Class,
                DueDate,
                Board,
                ChapterName,
                ChapterNo,
                ChapterDescription
            }),
          });
      
          if (res.status === 200) {
            window.alert("Task Assign Successful.");
            navigate("/admin-portal-home-190310554227");
          } 
          else {
            console.log(res);
            window.alert("Something Went Wrong, Try Later\nError Occured");
          }
    }

    const handleSubmit = () => {
        if (subject === '') {
          seterr("Please select a Subject Name.");
        } 
        else if (classes === '') {
            seterr("Please select a Class.");
        } 
         else if (dob === '') {
          seterr("Please assign Due Date of Task.");
        } 
        else if (board === '') {
          seterr("Please select a Board.");
        } 
        else if (name === '') {
          seterr("Please Enter the Chapter Name.");
        }
        else if (chapter <= 0) {
            seterr("Please provide a valid chapter number.");
        }
        else if (description === '') {
            seterr("Please add description of assigning task.");
        }
        else{
            AssignTaskToInstructor();
        }
      };

    if(Loading){
        return( <Loader /> );
    }

    else{
        return(
            <>
                {/* Main Heading to Return  */}
                <div className="instructorHeader">
                    <Link to="/admin-portal-assign-task-190310554227">
                        <BiArrowBack className="backBtn" style={{ color: "white" }} />
                    </Link>
                </div>
                {/* Showing Instructor Details  */}
                <div>
                    <h1>Assign Task</h1>
                    <div>
                        <p><b>ID : </b>{teacher.teacher_id}</p>
                        <p><b>Name : </b>{teacher.Teachername}</p>
                        <p><b>Email : </b>{teacher.email}</p>
                        <p><b>Mobile : </b>{teacher.mobileno}</p>
                        <p><b>Subject : </b>{teacher.subject}</p>
                    </div>
                </div>
                {/* Asking user for the Details of task  */}
                <div>
                    {/* Select Class  */}
                    <label htmlFor="bookclass">
                        <b>Select Class</b><span className="star">*</span>
                    </label>
                    <select id="bookclass" name="bookclass"  
                        value={classes}
                        onChange={(e) => {setclasses(e.target.value)}}
                    >
                        <option value="">Select class</option>
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                        <option value="4">Class 4</option>
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                    </select>
                    
                    {/* Select Board of Leacture  */}
                    <label htmlFor="bookboard">
                        <b>Select Board</b><span className="star">*</span>
                    </label>
                    <select id="bookboard" name="bookboard"  
                        value={board}
                        onChange={(e) => {setboard(e.target.value)}}
                    >
                        <option value="">Select Board</option>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="HaryanaBoard">Haryana Board</option>
                        <option value="UPBoard">UP Board</option>
                        <option value="RajasthanBoard">Rajasthan Board</option>
                        <option value="PunjabBoard">Punjab Board</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Select Subject of course  */}
                    <label htmlFor="bookclass1">
                        <b>Select Subject</b><span className="star">*</span>
                    </label>
                    <select id="bookclass1" name="bookclass"
                        value={subject}
                        onChange={(e) => {setsubject(e.target.value)}}
                    >
                        <option value="">Select Exam</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="Computer">Computer</option>
                        <option value="History">History</option>
                        <option value="Civics">Civics</option>
                        <option value="Economics">Economics</option>
                        <option value="Accounts">Accounts</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Art">Art</option>
                        <option value="Music">Music</option>
                        <option value="Social Studies">Social Studies</option>
                        <option value="Environmental Science">Environmental Science</option>
                        <option value="Physical Education">Physical Education</option>
                        <option value="Other">Other</option>
                    </select>
                    {/* Select Due Date */}
                    <label htmlFor="dob">Due Date<span className="star">*</span></label>
                    <input
                        type="date"
                        id="dob"
                        name="DOB"
                        value={dob}
                        onChange={(e) => {setdob(e.target.value)}}
                        required
                    />
                    {/* Enter Name of Chapter  */}
                    <label htmlFor="name">Chapter Name<span className="star">*</span></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => {setname(e.target.value)}}
                        required
                    />
                    {/* Enter Chapter No */}
                    <label htmlFor="name">Chapter Number<span className="star">*</span></label>
                    <input
                        type="number"
                        id="chapter"
                        name="chapter"
                        value={chapter}
                        onChange={(e) => {setchapter(e.target.value)}}
                        required
                    />
                    {/* Enter Description of Chapter  */}
                    <label htmlFor="message">Breif Description of Chapter<span className="star">*</span></label>
                    <textarea  className="contactInput-ta"
                        placeholder="Enter breif information about task or content of chapter"
                        name="info" 
                        id="message" 
                        cols="500" 
                        rows="8"   
                        value={description}
                        onChange={(e) => {setdescription(e.target.value)}}                    
                    />
                    <p>{err}</p>
                    <button onClick={handleSubmit}>Assign Task</button>
                </div>
            </>
        )
    }
}

export default AssignSyllbusTask;