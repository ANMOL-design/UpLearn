import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Avtar from "./../../../assets/images/avtar.png";
import { FaUpload } from "react-icons/fa";

export default function Profile() {
  let navigate = useNavigate();
  const [profile, setprofile] = useState({});
  const [profileImg, setprofileImg] = useState("");
  const [userimage, setUserImage] = useState("");
  const [image1, setImage] = useState("");
  const [Id, setId] = useState("");
  const [userimageData, setUserImageData] = useState();
  // State to Get Profile Image
  const [profileimg, setprofileimg] = useState("");
   
  useEffect(() => {
    window.scroll(0, 82);
    const fetchdata = async () => {
      await axios
        .get("aboutStudents")
        .then((response) => {
          setprofile(response.data);
          setprofileImg(profile.Image)
          setId(response.data._id);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
      };
    fetchdata();
  }, []);
console.log(profile);
  const updatateImage =  async() => {
    if (userimage === "") {
      console.log("no image");
    } else {
      const formData = new FormData();
      formData.append("image", userimageData);
      fetch(`/upload_image`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setImage(data.image.image)
             if(image1 !=""){
              console.log(image1);
            fetch("/updateImg", {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify({
                image1,
                Id
              }),
            }).then((res)=>{
              if(res.status===200){
                window.alert("image Updated")
              }
              else{
                window.alert("error")
              }
            })
          }
          }
        });
    }
    
    
  };
  

  
  

  function validateProfileImgSize(e) {
    console.log(e);
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setprofileimg(e.target.files[0].name);
    }
  }

  const EditUserProfile = () => {
    console.log("open modal");
    // Get the modal
    var modal = document.getElementById("myProfileEditModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // Making the Display of Modal Visible to Fill OTP to it
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
  };
  return (
    <>
      <div className="mainDashContainer">
        {/* Div contain Image and profile data */}
        <div className="DashProfileContainer">
          {/* My Profile Content  */}
          <h2>&nbsp;&nbsp;My Profile</h2>
          <p>
            &nbsp;&nbsp;&nbsp;Set your bio, and other public-facing information.
          </p>
          <p></p>
          <div className="DashProfileImage">
            {/* The Image with Upload Icon  */}
            <div className="ImageUploaderContainer">
              <img src={profileImg} alt="Avtar" className="Profileimage" />
              {/* Making the overlay uploader  */}
              <div className="overlay">
                <label htmlFor="myprofileimg">
                  &nbsp;
                  <FaUpload />
                  <br />
                  Upload
                </label>
                <input
                  type="file"
                  name="avtar"
                  accept="image/*"
                  id="myprofileimg"
                  value={userimage}
                  onChange={(e) => {
                    validateProfileImgSize(e)
                    setUserImage(e.target.value);
                    setUserImageData(e.target.files[0]);
                  }}
               
                />
              </div>
              <div id="addProfileImagename" style={{ textAlign: "center" }}>
                {profileimg ? profileimg : "Profile Image"} <br />
                {!profileimg ? null : (
                  <button onClick={updatateImage}>Upload Image</button>
                )}
              </div>
            </div>
            {/* Present prefiled details */}
            <div className="DetailsContainer">
              <h1>{profile.name}</h1>
              <p>{profile.email}</p>
              <p>
                {profile.mobileno ? (
                  "+91-" + profile.mobileno
                ) : (
                  <span>
                    <b>Phone No : </b>&nbsp;N/A
                  </span>
                )}
              </p>
              <p>
                <b>Date Of Birth : </b>{" "}
                {profile.DOB ? profile.DOB : <span>&nbsp;N/A</span>}{" "}
              </p>
              <p>
                <b>Gender : </b>{" "}
                {profile.Gender ? profile.Gender : <span>&nbsp;N/A</span>}{" "}
              </p>
            </div>
            {/* Making the Second Schholing and Address div  */}
            <div className="SA_container">
              {/* Present Schooling and class Details  */}
              <div className="DetailsContainer">
                <h2>Schooling</h2>
                <div className="SchoolingContainer">
                  <p>
                    <b>School : </b>
                    {profile.School ? profile.School : <span>&nbsp;N/A</span>}
                  </p>
                  <p>
                    <b>Board : </b>
                    {profile.Board ? profile.Board : <span>&nbsp;N/A</span>}
                  </p>
                  <p>
                    <b>Class : </b>
                    {profile.classes ? profile.classes : <span>&nbsp;N/A</span>}
                  </p>
                </div>
              </div>
              {/* Present Schooling and class Details  */}
              <div className="DetailsContainer">
                <h2>Address</h2>
                <p style={{ margin: "2px 0.9rem" }}>
                  {profile.PermanentAddress ? profile.PermanentAddress : ""}
                </p>
                <div className="AddressContainer">
                  <p>
                    <b>State : </b>
                    {profile.State ? profile.State : <span>&nbsp;N/A</span>}
                  </p>
                  <p>
                    <b>City : </b>
                    {profile.City ? profile.City : <span>&nbsp;N/A</span>}
                  </p>
                  <p>
                    <b>Pincode : </b>
                    {profile.Pincode ? profile.Pincode : <span>&nbsp;N/A</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Bio of The User  */}
          <div className="DetailsContainer aboutpro">
            <h2>About Me</h2>
            <p>
              {profile.BIO
                ? profile.BIO
                : "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."}
            </p>
          </div>

          <div className="DashProfileButton">
            <button onClick={EditUserProfile}>Edit Profile</button>
            <button>Change Password</button>
          </div>
        </div>
      </div>
      {/* Created a Modal to Wdit User Profile */}
      <div>
        {/*  The Modal  */}
        <div id="myProfileEditModal" className="modal">
          {/* Modal content */}
          <div className="modal-profile">
            <span className="close close_profile">&times;</span>
            <div>
              <h1>My Profile</h1>
              <h2>Personal Details</h2>
              <div className="modal-input-container">
                {/* First name of User  */}
                <div className="signInput">
                  <label htmlFor="firstname">First Name</label>
                  <br />
                  <input
                    type="text"
                    id="firstname"
                    placeholder="John"
                    name="firstname"
                    required
                  />
                </div>
                {/* Last name of User  */}
                <div className="signInput">
                  <label htmlFor="lastname">Last Name</label>
                  <br />
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Doe"
                    name="lastname"
                  />
                </div>
                {/* Mobile No of User  */}
                <div className="signInput">
                  <label htmlFor="mobileno">Phone No.</label>
                  <br />
                  <input
                    type="number"
                    id="mobileno"
                    placeholder="8046151300"
                    name="mobileno"
                    min={0}
                    max={999999999}
                    maxLength={10}
                    required
                  />
                </div>
                {/* Date of birth of User  */}
                <div className="signInput">
                  <label htmlFor="dob">Date Of Birth</label>
                  <br />
                  <input type="date" id="dob" name="dob" required />
                </div>
                {/* Gender of User  */}
                <div className="signInput">
                  <label htmlFor="gender">Gender</label>
                  <br />
                  <select id="gender" name="gender">
                    <option value="" defaultValue>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <p className="invalid"></p>
              <button>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
      {/* End Of Modal  */}
    </>
  );
}
