import React, { useState, useEffect } from "react";
import BoardSelect from "../Courses/BoardSelect";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Courses() {

  let navigate = useNavigate();
  const loginDetails = useSelector((state) => state.userReducers);
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
      <BoardSelect />
    </div>
  );
}
