import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Avtar from "./../../../assets/images/avtar.png";

export default function Profile() {

  let navigate = useNavigate();
  const [profile, setprofile] = useState({});

  useEffect(() => {
    const fetchdata = async () =>{
        await axios.get("aboutStudents").then(response => {
          setprofile(response.data);
        })
        .catch(error => {
          console.log(error);
          navigate("/login");
        });
    }
    fetchdata();
  }, [])

  console.log(profile);
  
  return(
    <div className="mainDashContainer">
      {/* My Profile Content  */}
      <h2>&nbsp;&nbsp;My Profile</h2>
      <p className="biopara">Set your bio, and other public-facing information.</p>
      
    </div>
  );
}
