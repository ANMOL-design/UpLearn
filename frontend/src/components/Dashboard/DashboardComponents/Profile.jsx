import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Avtar from "./../../../assets/images/avtar.png";
import { FaUpload } from "react-icons/fa";


export default function Profile() {

  let navigate = useNavigate();
  const [profile, setprofile] = useState({});

  // State to Get Profile Image
  const [profileimg, setprofileimg] = useState('');

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

  console.log(profile, profileimg);

  const updateProfileImage = () => {
    console.log('Update Image');
  }

  function validateProfileImgSize(e) {
    console.log(e)
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert('File size exceeds 2 MB');
    } else {
      setprofileimg(e.target.files[0].name);
    }
  }
  
  return(
    <>
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
                    <input type="file" name="avtar" accept="image/*" id="myprofileimg" onChange={validateProfileImgSize}/>
                  </div>
                  <div id='addProfileImagename' style={{textAlign: 'center'}}>
                      {profileimg ? profileimg : 'Profile Image'} <br/>   
                      {!profileimg ? 
                          null : 
                          <button onClick={updateProfileImage}>Upload Image</button>
                      }
                  </div>
                </div>
                {/* Present prefiled details */}
                <div className="DetailsContainer">
                    <h1>{profile.name}</h1>
                    <p>{profile.email}</p>
                    <p>{profile.mobileno ? '+91-' + profile.mobileno : <span><b>Phone No : </b>&nbsp;N/A</span>}</p>
                    <p><b>Date Of Birth : </b> {profile.DOB ?  profile.DOB : <span>&nbsp;N/A</span>} </p>
                    <p><b>Gender : </b> {profile.Gender ?  profile.Gender : <span>&nbsp;N/A</span>} </p>
                </div>
                {/* Making the Second Schholing and Address div  */}
                <div className="SA_container">
                    {/* Present Schooling and class Details  */}
                    <div className="DetailsContainer">
                      <h2>Schooling</h2>
                      <div className="SchoolingContainer">
                        <p><b>School : </b>{profile.School ? profile.School : <span>&nbsp;N/A</span>}</p>
                        <p><b>Board : </b>{profile.Board ? profile.Board : <span>&nbsp;N/A</span>}</p>
                        <p><b>Class : </b>{profile.classes ? profile.classes : <span>&nbsp;N/A</span>}</p>
                      </div>
                    </div>
                    {/* Present Schooling and class Details  */}
                    <div className="DetailsContainer">
                      <h2>Address</h2>
                      <p style={{margin: "2px 0.9rem"}}>{profile.PermanentAddress ? profile.PermanentAddress : ''}</p>
                      <div className="AddressContainer">
                        <p><b>State : </b>{profile.State ? profile.State : <span>&nbsp;N/A</span>}</p>
                        <p><b>City : </b>{profile.City ? profile.City : <span>&nbsp;N/A</span>}</p>
                        <p><b>Pincode : </b>{profile.Pincode ? profile.Pincode : <span>&nbsp;N/A</span>}</p>
                      </div>
                    </div>
                </div>
            </div>         
            {/* Bio of The User  */}
            <div className="DetailsContainer aboutpro">
                  <h2>About Me</h2>
                  <p>{profile.BIO ? profile.BIO : "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."}</p>
            </div>
                
            <div className="DashProfileButton">
              <button>Edit Profile</button>
              <button>Change Password</button>
            </div>
        </div>
      </div>
      {/* Created a Modal to Wdit User Profile */}
      <div>
        {/*  The Modal  */}
        <div id="myModal" className="modal">

          {/* Modal content */}
          <div className="modal-content">
            <span className="close">&times;</span>
            <div>
              <h2>Verification Code</h2>
              <p>Please enter the verification code send <br /> to <b></b></p>
              <div className="signInput">
                  <label htmlFor="verifyotp">Enter OTP</label>
                  <input
                    type="password"
                    id="verifyotp"
                    placeholder="Verify OTP"
                    name="verifyotp"
                    
                   
                  />
                </div>
              <p className="invalid"></p>
              <button >Submit</button>
            </div>
          </div>
        </div>
      </div>
      {/* End Of Modal  */}
    </>    
  );
}
