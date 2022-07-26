import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Avtar from "./../../../assets/images/avtar.png";
import { FaUpload } from "react-icons/fa";


export default function Profile() {

  let navigate = useNavigate();
  const [profile, setprofile] = useState({});

  useEffect(() => {
    window.scroll(0, 82);
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
      {/* Div contain Image and profile data */}
      <div className="DashProfileContainer">
          {/* My Profile Content  */}
          <h2>&nbsp;&nbsp;My Profile</h2>
          <p>&nbsp;&nbsp;&nbsp;Set your bio, and other public-facing information.</p>
          <p></p>
          <div className="DashProfileImage">
              {/* The Image with Upload Icon  */}
              <div className="ImageUploaderContainer">
                <img src={Avtar} alt="Avtar" className="Profileimage"/>
                {/* Making the overlay uploader  */}
                <div className="overlay">
                  <label htmlFor="myprofileimg">&nbsp;<FaUpload /><br />Upload</label>
                  <input type="file" name="avtar" id="myprofileimg" />
                </div>
                <div id='addProfileImagename' style={{textAlign: 'center'}}>Profile Image</div>
              </div>
              {/* Present prefiled details */}
              <div className="PredefinedDetailsContainer">
                  <h1>{profile.name}</h1>
                  <p>{profile.email}</p>
                  <p><b>Phone No. : </b>{profile.mobileno ? '+91-' + profile.mobileno : "  ..................."}</p>
                  <p><b>Date Of Birth : </b> {profile.DOB ?  profile.DOB : "   ..................."} </p>
                  <p><b>Gender : </b> {profile.Gender ?  profile.Gender : "   ..................."} </p>
              </div>
              {/* Present Schooling and class Details  */}
              <div className="PredefinedDetailsContainer">
                <h2>Schooling</h2>
                <p><b>School : </b>{profile.School ? profile.School : "  ..................."}</p>
                <p><b>Board : </b>{profile.Board ? profile.Board : "  ..................."}</p>
                <p><b>Class : </b>{profile.classes ? profile.classes : "  ..................."}</p>
              </div>
               {/* Present Schooling and class Details  */}
               <div className="PredefinedDetailsContainer">
                <h2>Address</h2>
                <p><b>State : </b>{profile.State ? profile.State : "  ..................."}</p>
                <p><b>City : </b>{profile.City ? profile.City : "  ..................."}</p>
                <p><b>Pincode : </b>{profile.Pincode ? profile.Pincode : "  ..................."}</p>
              </div>
              {/* Bio of The User  */}
              <div className="PredefinedDetailsContainer health">
                <h2>About Me</h2>
                <p>{profile.BIO ? profile.BIO : " ..................."}</p>
              </div>
          </div>
          <div className="DashProfileButton">
            <button>Edit Profile</button>
            <button>Change Password</button>
          </div>
      </div>
    </div>
  );
}
