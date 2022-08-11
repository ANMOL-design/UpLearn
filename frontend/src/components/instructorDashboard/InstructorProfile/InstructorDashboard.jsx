import React, {useState, useEffect}  from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import InstructorSidebar from "./InstructorSidebar";
import InstructorDashHome from "./InstrutorComponent/InstructorDashHome";
import InstructorAssignTask from "./InstrutorComponent/MyTask/InstructorTasks";

import MyCourses from "./InstrutorComponent/MyCourses/instructorMyCourses";
import AddQuiz from "./InstrutorComponent/MyCourses/addQuiz";
import AddQuestion from "./InstrutorComponent/MyCourses/addQuestion";


var CryptoJS = require("crypto-js");

function InstructorDashboard(){

    const loginDetails = useSelector((state) => state.userReducers);
    let navigate = useNavigate();

    const [instructor, setinstructor] = useState({});

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
                setinstructor(response.data);
              })
              .catch((error) => {
                console.log(error);
                navigate("/login");
              });
          };
          fetchdata();
        } 
        else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
          navigate("/studentdashboard");
        } 
        else {
          navigate("/login");
        }
    }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);


    return(
        <div className="instructor-dashboard">
            {/* SideBar Present at All Places  */}
            <InstructorSidebar />
            <Routes>
                <Route path="/" element={<InstructorDashHome />} /> 
                <Route path="/task-assign" element={<InstructorAssignTask details={instructor} />} /> 
                <Route path="/my-courses" element={<MyCourses details={instructor} />} /> 

                <Route path="/my-courses/edit-content/:id/add_questions/:quiz_id" element={<AddQuestion />} /> 
                <Route path="/my-courses/Edit-content/:id/add_quiz" element={<AddQuiz/>} /> 
                
            </Routes>
        </div>
    )
}

export default InstructorDashboard;