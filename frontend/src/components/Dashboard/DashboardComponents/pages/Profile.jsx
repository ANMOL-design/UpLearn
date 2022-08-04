import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avtar from "../../../../assets/images/avtar.png";
import { FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Profile() {
  let navigate = useNavigate();
  const loginDetails = useSelector((state) => state.userReducers);

  const [userimageData, setuserimageData] = useState({});

  // State to Get Profile Image
  const [profileimg, setprofileimg] = useState("");
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

  const updatateImage = async () => {
    if (profileimg === "") {
      window.alert("Please Select a valid image");
    } else {
      document.getElementById("makeUploadDisable").disabled = true;
      const formData = new FormData();
      formData.append("image", userimageData);

      fetch("/upload_image", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data.image.image);
            const _id = values._id;
            const Image = data.image.image;

            fetch("/updateImg", {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify({
                Image,
                _id,
              }),
            }).then((res) => {
              if (res.status === 200) {
                window.alert("Image Updated Succesfully");
                navigate("/");
              } else {
                console.log(res);
                window.alert("error occured");
              }
            });
          }
        });
    }
  };

  function validateProfileImgSize(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setprofileimg(e.target.files[0].name);
      setuserimageData(e.target.files[0]);
    }
  }

  return (
    <>
      {/* Div contain Image and profile data */}
        <div className="mainDashContainer">
          {/* My Profile Content  */}
          <h2>&nbsp;&nbsp;My Profile</h2>
          <p>
            &nbsp;&nbsp;&nbsp;Set your bio, and other public-facing information.
          </p>
          <p></p>
          <div className="DashProfileImage">
            {/* The Image with Upload Icon  */}
            <div className="ImageUploaderContainer">
              <img
                src={values.Image ? values.Image : Avtar}
                alt="Avtar"
                className="Profileimage"
              />
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
                  onChange={(e) => {
                    validateProfileImgSize(e);
                  }}
                />
              </div>
              <div id="addProfileImagename" style={{ textAlign: "center" }}>
                {profileimg ? profileimg : "Profile Image"} <br />
                {!profileimg ? null : (
                  <button onClick={updatateImage} id="makeUploadDisable">
                    Upload Image
                  </button>
                )}
              </div>
            </div>
            {/* Present prefiled details */}
            <div className="DetailsContainer">
              <h1>{values.name}</h1>
              <p>{values.email}</p>
              <p>
                {values.mobileno ? (
                  "+91-" + values.mobileno
                ) : (
                  <span>
                    <b>Phone No : </b>&nbsp;N/A
                  </span>
                )}
              </p>
              <p>
                <b>Date Of Birth : </b>{" "}
                {values.DOB ? values.DOB : <span>&nbsp;N/A</span>}{" "}
              </p>
              <p>
                <b>Gender : </b>{" "}
                {values.Gender ? values.Gender : <span>&nbsp;N/A</span>}{" "}
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
                    {values.School ? values.School : <span>&nbsp;N/A</span>}
                  </p>
                  <p>
                    <b>Board : </b>
                    {values.Board ? values.Board : <span>&nbsp;N/A</span>}
                  </p>
                  <p>
                    <b>Class : </b>
                    {values.classes ? values.classes : <span>&nbsp;N/A</span>}
                  </p>
                </div>
              </div>
              {/* Present Schooling and class Details  */}
              <div className="DetailsContainer">
                <h2>Address</h2>
                <p style={{ margin: "2px 0.9rem" }}>
                  {values.PermanentAddress ? values.PermanentAddress : ""}
                </p>
                <div className="AddressContainer">
                  <p>
                    <b>State : </b>
                    {values.State ? values.State : <span>&nbsp;N/A</span>}
                  </p>
                  <p>
                    <b>City : </b>
                    {values.City ? values.City : <span>&nbsp;N/A</span>}
                  </p>
                  <p>
                    <b>Pincode : </b>
                    {values.Pincode ? values.Pincode : <span>&nbsp;N/A</span>}
                  </p>
                </div>
              </div>
            </div>
            {/* Bio of The User  */}
            <div className="DetailsContainer aboutpro">
              <h2>About Me</h2>
              <p>
                {values.BIO
                  ? values.BIO
                  : "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."}
              </p>
            </div>

            <div className="DashProfileButton">
              <Link to="/update-student-profile">
                <button>Edit Profile</button>
              </Link>
              <Link to="/change-student-password">
                <button>Change Password</button>
              </Link>
            </div>
          </div>
      </div>
    </>
  );
}
