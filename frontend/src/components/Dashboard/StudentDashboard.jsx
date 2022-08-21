import React, { useEffect } from "react";
import {  Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import MainDash from "./DashboardComponents/MainDash";
import Profile from "./DashboardComponents/pages/Profile";
import Courses from "./DashboardComponents/pages/Courses";
import Reports from "./DashboardComponents/pages/Reports";
import Sidebar from "./DashboardComponents/Sidebar";
import StudentClassrooms from "./DashboardComponents/pages/StudentClassrooms";
import { useState } from "react";
import ViewMyClass from "./DashboardComponents/LiveClassrooms/ViewMyClass";

var CryptoJS = require("crypto-js");

export default function StudentDashboard() {
 
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
   const [StudentInfo,setStudentInfo] = useState({})
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
      navigate("/instructordashboard");
    } 
    else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {

      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            setStudentInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } 
    else {
      navigate("/login");
    }
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);


  return (
    <>
      <div className="studWrapper">
          {/* SideBar Present at All Places  */}
          <Sidebar />
          <Routes>
              <Route path="/" element={<MainDash />} /> 
              <Route path="/my-profile" element={<Profile />} /> 
              <Route path="/stud-courses" element={<Courses />} />          
              <Route path="/My-classroom" element={<StudentClassrooms Student={StudentInfo} />} />          
              <Route path="/my-classroom/:id" element={<ViewMyClass Student={StudentInfo} />} />          
              <Route path="/reports" element={<Reports />} />          
          </Routes>
      </div>
    </>
  );
}
