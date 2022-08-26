import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import Loader from "./../../assets/images/progressbar.gif";
import axios from "axios";

function VolunteerRegister() {
  let navigate = useNavigate();
  const [adminInfo, setadminInfo] = useState("");
  const adminstatus = useSelector((state) => state.AdminReducers);

  // States to store Images
  const [UserImage, setUserImage] = useState("");
  const [UserImageData, setUserImageData] = useState();

  const [IdImage, setIdImage] = useState("");
  const [IdImageData, setIdImageData] = useState();

  const [AharImage, setAharImage] = useState("");
  const [AdharImageData, setAdharImageData] = useState();

  // Store response of return Image
  var Image = "",
    idresImage = "",
    aadharImage = "";
  // const [Image, setImage] = useState("");
  // const [idresImage, setidresImage] = useState("");
  // const [, setaadharImage] = useState("");

  const [err, seterr] = useState("");
  // State to Store Elements of input field
  const [values, setValues] = useState({
    Volunteername: "",
    Volunteeremail: "",
    block: "",
    ViLL_city: "",
    District: "",
    State: "",
    pincode: "",
    password: "",
    Volunteer: "",
    mobileno: "",
    idImage: "",
    image: "",
    Govt_assign_id: "",
    aadharCard: "",
    AadharcardImage: "",
  });

  useEffect(() => {
    window.scroll(0, 0);
    // Check is Admin Login Or Not
    if (Number(adminstatus.isAdminLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutAdminActive")
          .then((response) => {
            setadminInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/admin-portal-login-190310554227");
          });
      };
      fetchdata();
    }
    // If User is not login redirect to login
    else {
      navigate("/admin-portal-login-190310554227");
    }
  }, [adminstatus.isAdminLoggedIn, navigate]);

  // console.log("Cloud Response", Image, idresImage, aadharImage);

  const submitImage = async (image, imageData, imagevalue) => {
    if (image === "") {
      window.alert("Please Upload an Image.");
    } else {
      const formData = new FormData();
      formData.append("image", imageData);

      fetch(`/upload_image`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            if (imagevalue === "idimage") {
              idresImage = data.image.image;
            } else if (imagevalue === "AadharcardImage") {
              aadharImage = data.image.image;
            } else if (imagevalue === "image") {
              Image = data.image.image;
            }
          }
        });
    }
  };

  const postData = async () => {
    const AadharcardImage = aadharImage;
    const idImage = idresImage;
    const image = Image;

    const {
      Volunteername,
      Volunteeremail,
      block,
      ViLL_city,
      District,
      State,
      pincode,
      mobileno,
      aadharCard,
    } = values;

    const res = await fetch("/VolunteerRegister", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        Volunteername,
        Volunteeremail,
        block,
        ViLL_city,
        District,
        State,
        pincode,
        mobileno,
        aadharCard,
        AadharcardImage,
        idImage,
        image,
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Registration.\nWelcome to  family of UpLearn.");
      navigate("/admin-portal-home-190310554227");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };

  const time = 10000;

  function sendData() {
    setTimeout(function () {
      if (idresImage === "" || aadharImage === "" || Image === "") {
        sendData();
      } else {
        postData();
      }
    }, time);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("myinstBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

      // Send Images to cloud
      await submitImage(IdImage, IdImageData, "idimage");
      await submitImage(AharImage, AdharImageData, "AadharcardImage");
      await submitImage(UserImage, UserImageData, "image");

      // Send Data to Backend after 10 sec
      sendData();
    }
  };

  //form validation
  const handleValidation = () => {
    if (
      !values.Volunteername ||
      !values.Volunteeremail ||
      !values.block ||
      !values.ViLL_city ||
      !values.District ||
      !values.State ||
      !values.pincode ||
      !values.mobileno ||
      !values.aadharCard
    ) {
      seterr("Please Enter all required Fields.");
      return false;
    } else if (values.mobileno.length !== 10) {
      seterr("Mobile Number must be of 10 number or without +91");
      return false;
    } else if (IdImage === "") {
      seterr("Please Upload your ID Card Image.");
      return false;
    } else if (UserImage === "") {
      seterr("Please Upload your Profile Image.");
      return false;
    } else if (AharImage === "") {
      seterr("Please Upload your Aadhar Card Image.");
      return false;
    }
    return true;
  };

  // Function to Set values enter in input field
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    seterr("");
  };

  // Function to Set Image
  function validateTeacherIdImg(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setIdImage(e.target.files[0].name);
      setIdImageData(e.target.files[0]);
    }
  }

  function validateTeacherProImg(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setUserImage(e.target.files[0].name);
      setUserImageData(e.target.files[0]);
    }
  }

  function validateTeacherAadharImg(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setAharImage(e.target.files[0].name);
      setAdharImageData(e.target.files[0]);
    }
  }

  // console.log(values);
  return (
    <>
      {/* The Container Of Login An instructor In Page  */}
      <div className="instructor">
        <div className="instructorHeader">
          <Link to="/admin-portal-home-190310554227">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        <div className="instructorWrapper">
          <div className="instructorForm">
            <form>
              <h3>UpLearn Volunteer Registration</h3>
              <div className="basicDetail">
                <span className="title">
                  Basic Details
                  <hr />
                </span>
                <div className="fields">
                  <div className="inputField">
                    <label htmlFor="name">
                      Name<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="Teachername"
                      name="Volunteername"
                      placeholder="Your Name"
                      value={values.Volunteername}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="email">
                      Email<span className="star">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="Volunteeremail"
                      placeholder="Volunteer Email"
                      value={values.Volunteeremail}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="inputField">
                    <label htmlFor="mobile">
                      Mobile<span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      id="mobile"
                      name="mobileno"
                      placeholder="Your Mobile Number"
                      value={values.mobileno}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="addressDetail">
                <span className="title">
                  Address
                  <hr />
                </span>
                <div className="fields">
                  <div className="inputField">
                    <label htmlFor="block">
                      Block<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="block"
                      name="block"
                      placeholder="Your Block"
                      value={values.block}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="city">
                      Village/City<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="ViLL_city"
                      placeholder="Your City"
                      value={values.ViLL_city}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="city">
                      District<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="districtity"
                      name="District"
                      placeholder="Your City"
                      value={values.District}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="state">
                      State<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="State"
                      name="State"
                      placeholder="Your State"
                      value={values.State}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="pincode">
                      Pincode<span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      name="pincode"
                      placeholder="Pincode"
                      value={values.pincode}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="otherDetail">
                <span className="title">
                  Other <hr />
                </span>
                <div className="fields">
                  <div className="inputField btn">
                    <label htmlFor="idImage">
                      Volunteer ID<span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      id="idImage"
                      accept="image/*"
                      onChange={(e) => {
                        validateTeacherIdImg(e);
                      }}
                      className="uploadBtn"
                    />
                    <p className="uploadphoto">{IdImage}</p>
                  </div>

                  <div className="inputField btn">
                    <label htmlFor="image">
                      Volunteer Image<span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={(e) => {
                        validateTeacherProImg(e);
                      }}
                      className="uploadBtn"
                    />
                    <p className="uploadphoto">{UserImage}</p>
                  </div>
                </div>
              </div>
              <div className="aadhaarDetail">
                <span className="title">
                  Aadhaar Details <hr />
                </span>
                <div className="fields">
                  <div className="inputField">
                    <label htmlFor="aadharCard">
                      Aadhaar Number<span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      id="aadharCard"
                      name="aadharCard"
                      placeholder="Your Aadhar Number"
                      value={values.aadharCard}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField btn">
                    <label htmlFor="aadharCardImage">
                      Aadhaar Card<span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      id="aadharCardImage"
                      className="uploadBtn"
                      accept="image/*"
                      onChange={(e) => {
                        validateTeacherAadharImg(e);
                      }}
                    />
                    <p className="uploadphoto">{AharImage}</p>
                  </div>
                </div>
              </div>

              <div className="instructorRegisterBtn">
                <div style={{ textAlign: "center" }}>
                  <img src={Loader} alt="Loader" id="loader-reg" />
                  <p className="uploadphoto">{err}</p>
                </div>
                <button
                  id="myinstBtn"
                  type="submit"
                  onClick={handleSubmit}
                  className="registerBtn"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default VolunteerRegister;
