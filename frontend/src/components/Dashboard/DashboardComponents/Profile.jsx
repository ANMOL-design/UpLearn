import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Profile() {

  useEffect(() => {
    const fetchdata = async () =>{
        const {data} = await axios.get("aboutStudents");
        console.log(data);
    }
    fetchdata();
  }, [])
  
  return(
    <div className="mainDashContainer">
      {/* My Profile Content  */}
      <h2>&nbsp;&nbsp;My Profile</h2>
      <p className="biopara">Set your bio, and other public-facing information.</p>
      {/* Starting the main Profile Area  */}
      <div>
          {/* Image of the Profile  */}
          <div>
              {/* Avtar Image  */}
              <div>
                  <img src="" alt="avatar" />
              </div>
              {/* Avtar name, email and number  */}
              <div>
                <h4>User Name : <span>Anmol Garg</span></h4>
                <h4>Email ID : <span>anmolgarg263@gmail.com</span></h4>
                <h4>Mobile Number : <span>7988956183</span></h4>
              </div>
          </div>
          {/* Adding Additional Information */}
          <div>
              <h4>Gender : <span>Male</span></h4>
              <h4>Date Of Birth : <span>27/10/2001</span></h4>
              <h4>Address : <span>156, Saraswati gali, Mustafabad</span></h4>
              <h4>State : <span>Haryana</span></h4>
              <h4>City : <span>Yamuna Nagar</span></h4>
              <h4>Pincode : <span>133103</span></h4>
              <h4>School : <span>G.B.S</span></h4>
              <h4>Board : <span>C.B.S.E</span></h4>
              <h4>Class : <span>+2</span></h4>
          </div>
      </div>
    </div>
  );
}
