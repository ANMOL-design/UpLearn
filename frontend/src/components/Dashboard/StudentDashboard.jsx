import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import { SidebarData } from "./Data";
import { useSelector } from "react-redux";
// import { FaBars } from "react-icons/fa";
import axios from "axios";
import MainDash from "./DashboardComponents/MainDash";
import Profile from "./DashboardComponents/pages/Profile";
import Courses from "./DashboardComponents/pages/Courses";
import Instructor from "./DashboardComponents/pages/Instructor";
import Reports from "./DashboardComponents/pages/Reports";
import Sidebar from "./DashboardComponents/Sidebar";

var CryptoJS = require("crypto-js");

export default function StudentDashboard() {
  // var x = 0;
  // const [selected, setSelected] = useState(0);
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

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
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      navigate("/studentdashboard");
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            console.log(response.data);
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
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);

  // const SideToggler = () => {
  //   var e = document.getElementById("dashSlider");
  //   e.classList.toggle("hiderslider");
  // };

  return (
    <>
      <div className="studWrapper">
        <Sidebar />
        <MainDash />
      </div>
    </>
  );
}
