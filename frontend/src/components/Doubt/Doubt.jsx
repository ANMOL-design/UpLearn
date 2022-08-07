import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import Loader from "../Loader";
import DoubtBanner from "../../assets/images/Ask-a-doubt-landing-banner.png";
var CryptoJS = require("crypto-js");

export default function Doubt() {
   
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
const handleask=()=>{
    navigate("/post-doubt");


}

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="doubt-container">
          <div className="Doubt-banner">
            <img src={DoubtBanner} alt="Banner" />
          </div>
          <div className="Doubt-heading">
            <h1>Uplearn Online Library</h1>
            <p>
              Here you get all NCERT books also Books for preparing Exams Like
              JEE,NEET,CAT,UPSC etc.
            </p>
          </div>
          <div className="doubt-filter-container">
            <div className="DoubtSearch">
              <input
                list="doubt-search"
                name="DoubtSearch"
                placeholder="What are you looking for ?"
              />
              <button type="submit">
                <i>
                  <MdSearch />
                </i>{" "}
                Search
              </button>
            </div>
          </div>
          <div className="askbutton">
            <button onClick={handleask} >Ask Your Doubt</button>
          </div>
        </div>
      </>
    );
  }
}
