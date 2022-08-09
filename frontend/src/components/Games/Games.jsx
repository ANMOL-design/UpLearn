import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import data from "./GamesCards.json";
import axios from "axios";

var CryptoJS = require("crypto-js");

function Games() {
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
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            console.log();
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            console.log();
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

  return (
<<<<<<< HEAD
    <div>
      {/* Banner Of the Games Page  */}
=======
    <>
      {/* Banner Of the Admin Page  */}
>>>>>>> c76c334adbf818607c89e5234b8ba048e5157dc6
      <div className="games-banner"></div>
      {/* Main  Games Section  */}
      <div className="games-header">
        <h1>Games</h1>
      </div>
      {/* Cards Of The Game Page  */}
      <div className="container-game">
          {data.map((item) => {
            return (
              <div className="card-game" key={item.id}>
                <div className="image-game">
                  <img src={item.image} alt="game" />
                </div>

                <div className="content-game">
                  <h3>{item.heading}</h3>
                  <p>{item.desc}</p>
                  <Link to={item.Link}>
                    <button>Play Now</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Games;
