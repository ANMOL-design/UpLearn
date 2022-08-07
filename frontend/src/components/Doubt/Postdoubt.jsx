import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import Loader from "../Loader";

var CryptoJS = require("crypto-js");

export default function Postdoubt() {
   
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [User, SetUser] = useState({});
  const [isLoading, setisLoading] = useState(true);

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
    // Check is  Login Or Not
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            SetUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            SetUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
      setisLoading(false);
    }
    // If User is not login redirect to login
    else {
      navigate("/login");
    }
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);


  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="doubt-container">
          hello
        </div>
      </>
    );
  }
}
