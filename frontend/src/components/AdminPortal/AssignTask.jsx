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
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');

    console.log(id, teacher);

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
    }, [adminstatus.isAdminLoggedIn, navigate]);

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
                </div>
            </>
        )
    }
}

export default AssignSyllbusTask;