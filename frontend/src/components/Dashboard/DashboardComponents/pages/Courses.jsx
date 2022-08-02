import React, { useState, useEffect } from "react";
import BoardSelect from "../Courses/BoardSelect";
import ClassSelect from "../Courses/ClassSelect";
import Sidebar from "../Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Courses() {
  let navigate = useNavigate();
  const loginDetails = useSelector((state) => state.userReducers);

  const [userimageData, setuserimageData] = useState({});

  // State to Get Profile Image
  const [profileimg, setprofileimg] = useState("");
  const [values, setvalues] = useState({});

  useEffect(() => {
    window.scroll(0, 80);
    // Check is  Login Or Not
    if (Number(loginDetails.isLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            setvalues(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    }
    // If User is not login redirect to login
    else {
      navigate("/login");
    }
  }, [loginDetails.isLoggedIn, navigate]);

  return (
    <div>
      {/* <div className="studWrapper">
        <Sidebar />
        <BoardSelect />
      </div> */}
      <BoardSelect />
    </div>
  );
}
