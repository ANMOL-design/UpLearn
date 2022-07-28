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
  const [profileimg, setprofileimg] = useState('');
  const [values, setvalues] = useState({
        firstName: '',
        MiddleName: '',
        LastName: '',
        classes: '',
        Board: '',
        PermanentAddress: '',
        School: '',
        City: '',
        State: '',
        Pincode: '',
        mobileno: '',
        Gender: '',
        DOB: '',
        BIO: ''
  });

  useEffect(() => {
    window.scroll(0, 82);
    const fetchdata = async () => {
      await axios
        .get("aboutStudents")
        .then((response) => {
          setprofile(response.data);
          setprofileImg(response.data.Image)
          setId(response.data._id);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
      };
    fetchdata();
  }, [])
  const updatateImage = async () => {
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
            console.log(data.image.image);
            setImage(data.image.image);
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
              if (res.status === 200) {
                window.alert("image updated succesfully")
               } else {
                 console.log(res);
                 window.alert("error occured");
               }
            })
        
            
          }
        });
    }
     
  };
  
  console.log(profile);
  console.log(profileImg)
  console.log(values);

  
  

  const postUpdateProfileData = async () => {

    const _id = profile._id;
    const firstName = values.firstName || profile.firstName;
    const LastName = (values.MiddleName + ' ' + values.LastName) || profile.LastName;
    const classes = Number(values.classes || profile.classes);
    const Board = values.Board || profile.Board;
    const PermanentAddress = values.PermanentAddress || profile.PermanentAddress;
    const School = values.School || profile.School;
    const City = values.City || profile.City;
    const State = values.State || profile.State;
    const Pincode = values.Pincode || profile.Pincode;
    const mobileno = values.mobileno || profile.mobileno;
    const Gender = values.Gender || profile.Gender;
    const DOB = values.DOB || profile.DOB;
    const BIO = values.BIO || profile.BIO;
 
     const res =  await fetch("/updateUserProfile" ,{
         method : "POST",
         headers : { 
             "content-Type" : "application/json"
         },
         body : JSON.stringify({
            _id,
            firstName,
            LastName,
            classes,
            Board,
            PermanentAddress,
            School,
            City,
            State,
            Pincode,
            mobileno,
            Gender,
            DOB,
            BIO
         })
     } );
     
     if(res.status === 200){
        window.alert("Profile Update Successfully");
        // Get the modal
        var modal = document.getElementById("myProfileEditModal");
        modal.style.display = "none";
        navigate("/");
     }
     else{
         console.log(res)
         window.alert("Invalid Request | Internal Server Error");
     }
  }

  const handleChange = (event) => {
    setvalues({ ...values, [event.target.name]: event.target.value });
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
              <img src={profileImg||Avtar} alt="Avtar" className="Profileimage" />
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
            {/* Bio of The User  */}
            <div className="DetailsContainer aboutpro">
                  <h2>About Me</h2>
                  <p>{profile.BIO ? profile.BIO : "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."}</p>
            </div>
                
            <div className="DashProfileButton">
              <button onClick={EditUserProfile}>Edit Profile</button>
              <Link to='/change-password'><button>Change Password</button></Link>
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
                    <label htmlFor="firstname">First Name</label><br />
                    <input
                      type="text"
                      id="firstname"
                      placeholder="John"
                      name="firstName"
                      value={values.firstName}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  {/* Middle name of User  */}
                  <div className="signInput">
                    <label htmlFor="middlename">Middle Name</label><br />
                    <input
                      type="text"
                      id="middlename"
                      placeholder="Smidth"
                      name="MiddleName"
                      value={values.MiddleName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {/* Last name of User  */}
                  <div className="signInput">
                    <label htmlFor="lastname">Last Name</label><br />
                    <input
                      type="text"
                      id="lastname"
                      placeholder="Doe"
                      name="LastName"
                      value={values.LastName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {/* Mobile No of User  */}
                  <div className="signInput">
                    <label htmlFor="mobileno">Phone No.</label><br />
                    <input
                      type="number"
                      id="mobileno"
                      placeholder="8046151300"
                      name="mobileno"
                      min={0}
                      max={999999999}
                      maxLength={10}
                      value={values.mobileno}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  {/* Date of birth of User  */}
                    <div className="signInput">
                      <label htmlFor="dob">Date Of Birth</label><br />
                      <input
                        type="date"
                        id="dob"
                        name="DOB"
                        value={values.DOB}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  {/* Gender of User  */}
                    <div className="signInput">
                      <label htmlFor="gender">Gender</label><br />
                      <select id="gender" name="Gender" value={values.Gender}
                        onChange={(e) => handleChange(e)}>
                        <option value="" defaultValue>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
              </div>
              {/* Address of User  */}
              <h2>Address Details</h2>
              <div className="modal-input-container">
                  {/* Permanent Address of User  */}
                  <div className="signInput" style={{width: "100%"}}>
                    <label htmlFor="address">Permanent Address</label><br />
                    <input
                      type="text"
                      id="address"
                      placeholder="11/6, Shanti Chamber, Pusa Road Chowk, Karol Bagh"
                      name="PermanentAddress"
                      style={{width: "100%"}}
                      value={values.PermanentAddress}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  {/* State of User  */}
                  <div className="signInput">
                    <label htmlFor="state">State</label><br />
                    <select id="state" name="State" value={values.State}
                      onChange={(e) => handleChange(e)}>
                      <option value="" defaultValue>Select Your State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                      <option value="Daman and Diu">Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  {/* City of User  */}
                  <div className="signInput">
                    <label htmlFor="city">City</label><br />
                    <input
                      type="text"
                      id="city"
                      placeholder=""
                      name="City"   
                      value={values.City}
                      onChange={(e) => handleChange(e)}         
                      required
                    />
                  </div>
                  {/* Pincode of User  */}
                  <div className="signInput">
                    <label htmlFor="pincode">Pincode</label><br />
                    <input
                      type="number"
                      id="pincode"
                      name="Pincode"
                      value={values.Pincode}
                      onChange={(e) => handleChange(e)}
                      min={0}
                      required
                    />
                  </div>
              </div>
              {/* Schooling Details of User  */}
              <h2>Schooling Details</h2>
              <div className="modal-input-container">
                  {/* School Address of User  */}
                  <div className="signInput" style={{width: "100%"}}>
                    <label htmlFor="school">School Name</label><br />
                    <input
                      type="text"
                      id="school"
                      placeholder="Govt. Modal Senior Secondary School"
                      name="School"
                      style={{width: "100%"}}
                      value={values.School}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  {/* Board of User  */}
                  <div className="signInput">
                    <label htmlFor="board">Board Name</label><br />
                    <input
                      type="text"
                      id="board"
                      placeholder="CBSE"
                      name="Board"
                      value={(values.Board).toUpperCase()}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {/* class name of User  */}
                  <div className="signInput">
                    <label htmlFor="class">Class</label><br />
                    <select id="class" name="classes" value={values.classes}
                      onChange={(e) => handleChange(e)}>
                      <option value="" defaultValue>Select Your Class</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>
                  {/* Enrollment no of User  */}
                  <div className="signInput">
                    <label htmlFor="rollno">Enrollment No.</label><br />
                    <input
                      type="number"
                      id="rollno"
                      placeholder=""
                      name="rollno"
                      min={0}
                    />
                  </div>
              </div>
              {/* About of User  */}
              <h2>About Me</h2>
              <div className="modal-input-container">
                <div className="signInput">
                  <label htmlFor="Message">Tell us about yourself</label><br />
                  <textarea  className="contactInput-ta"
                      placeholder="Message"
                      name="BIO" 
                      id="message" 
                      cols="500" 
                      rows="20"   
                      value={values.BIO}
                      onChange={(e) => handleChange(e)}                      
                  />
                </div>
              </div>
              <div className="modal-input-container">
                  <button onClick={postUpdateProfileData}>Update Profile</button>
                  <Link to='privacypolicy'>Terms &amp; Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* End Of Modal  */}
    </>
  );
}