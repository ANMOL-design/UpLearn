import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

function InstructorRegister() {
  let navigate = useNavigate();
  const [userimage, setUserImage] = useState("");
  const [IMAGE, setImage] = useState("");
  const [userimageData, setUserImageData] = useState();
  const [Idimage, setIdImage] = useState("");
  const [idimage, setidImage] = useState("");
  const [idimageData, setIdImageData] = useState();
  const [adharimage, setaharImage] = useState("");
  const [adharimageData, setadharImageData] = useState();
  const [aadharimage, setaadharImage] = useState();
  const [values, setValues] = useState({
    Teachername: "",
    email: "",
    password: "",
    cpassword: "",
    mobileno: "",
    subject: "",
    block: "",
    permanentAddress: "",
    temporaryAdd: "",
    school: "",
    city: "",
    state: "",
    pincode: "",
    teacher_id: "",
    aadharCard: "",
  });

  useEffect(() => {
    window.scroll(0, 150);
  }, []);

  const [invalid, setinvalid] = useState("");
  const [formErr, setFormErr] = useState("");

  const submitImage = (image1, imageData, imagevalue) => {
    if (image1 === "") {
      console.log("no image");
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
            console.log(data);
            console.log(imagevalue);
            if (imagevalue == "idimage") {
              setidImage(data.image.image);
            } else if (imagevalue == "AadharcardImage") {
              setImage(data.image.image);
            } else if (imagevalue == "image") {
              setaadharImage(data.image.image);
            }
          }
        });
    }
  };
  useEffect(() => {
    console.log(values);
  });
  const postData = async () => {
    const AadharcardImage = aadharimage;
    const idImage = Idimage;
    const image = IMAGE;
    const {
      Teachername,
      email,
      password,
      cpassword,
      mobileno,
      subject,
      block,
      permanentAddress,
      temporaryAdd,
      school,
      city,
      state,
      pincode,
      teacher_id,
      aadharCard,
    } = values;
    console.log(AadharcardImage + " " + IMAGE + " " + idImage);
    const res = await fetch("/InstructorRegister", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        Teachername,
        email,
        password,
        cpassword,
        mobileno,
        subject,
        block,
        permanentAddress,
        temporaryAdd,
        school,
        city,
        state,
        pincode,
        idImage,
        image,
        teacher_id,
        aadharCard,
        AadharcardImage,
      }),
    });

    if (res.status === 200) {
      navigate("/");
    } else {
      console.log(res);
      window.alert("error occured");
    }
  };

  const handleSubmit = async (event) => {
    submitImage(idimage, idimageData, "idimage");
    submitImage(adharimage, adharimageData, "AadharcardImage");
    submitImage(userimage, userimageData, "image");

    event.preventDefault();
    const submit = handleValidation();
    if (submit) {
      postData();
    }
  };

  //form validation
  const handleValidation = () => {
    if (values.name === "") {
      setFormErr("Name is required");
      window.scroll(0, 200);
      return false;
    } else if (values.email === "") {
      setFormErr("Email is required");
      window.scroll(0, 250);
      return false;
    } else if (values.password === "") {
      setFormErr("Password is required");
      return false;
    } else if (values.cpassword === "") {
      setFormErr("Please Confirm Your Password");
      return false;
    } else if (values.password.length < 8) {
      setFormErr("Password must be atleast 8 character");
      return false;
    } else if (values.password !== values.cpassword) {
      setFormErr("Password and Confirm password should be same");
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      {/* The Container Of Login An instructor In Page  */}
      <div className="instructor">
        <div className="instructorHeader">
          <a href="/logout">
            <HiOutlineLogout className="logoutBtn" style={{ color: "white" }} />
          </a>
        </div>
        <div className="instructorWrapper">
          <div className="instructorForm">
            <form>
              <h3>UpLearn Instructor Registration</h3>
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
                      name="Teachername"
                      placeholder="Your Name"
                      value={values.Teachername}
                      onChange={(e) => handleChange(e)}
                    />
                    <p>{formErr.name}</p>
                  </div>
                  <div className="inputField">
                    <label htmlFor="email">
                      Email<span className="star">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={values.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="mobile">
                      Mobile<span className="star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobileno"
                      placeholder="Your Mobile Number"
                      value={values.mobileno}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="password">
                      Password<span className="star">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Your Password"
                      value={values.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="confirmPassword">
                      Confirm Password<span className="star">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="cpassword"
                      placeholder="Confirm Password"
                      value={values.cpassword}
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
                    <label htmlFor="permanentAddress">
                      Permanent Address<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="permanentAddress"
                      name="permanentAddress"
                      placeholder="Your Address"
                      value={values.permanentAddress}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="temporaryAdd">Temporary Address</label>
                    <input
                      type="text"
                      id="temporaryAdd"
                      name="temporaryAdd"
                      value={values.temporaryAdd}
                      placeholder="Your Address"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="block">Block</label>
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
                      City<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Your City"
                      value={values.city}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="state">
                      State<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Your State"
                      value={values.state}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="pincode">
                      Pincode<span className="star">*</span>
                    </label>
                    <input
                      type="text"
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
                  <div className="inputField">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Your Subject"
                      value={values.subject}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="school">School</label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      placeholder="Your School"
                      value={values.school}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="teacherId">
                      Teacher ID<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="teacherId"
                      name="teacher_id"
                      placeholder="Your Teacher ID"
                      value={values.teacher_id}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField btn">
                    <label htmlFor="idImage">
                      Teacher ID<span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      id="idImage"
                      value={idimage}
                      onChange={(e) => {
                        setIdImage(e.target.value);
                        setIdImageData(e.target.files[0]);
                      }}
                      className="uploadBtn"
                    />
                  </div>
                  <div className="inputField btn">
                    <label htmlFor="image">
                      Teacher Image<span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      value={userimage}
                      onChange={(e) => {
                        setUserImage(e.target.value);
                        setUserImageData(e.target.files[0]);
                      }}
                      className="uploadBtn"
                    />
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
                      type="text"
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
                      value={adharimage}
                      onChange={(e) => {
                        setaharImage(e.target.value);
                        setadharImageData(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="instructorRegisterBtn">
                <button
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
export default InstructorRegister;
