import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function InstructorRegister() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
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
    idImage: "",
    image: "",
    isInstructor: "",
    teacher_id: "",
    aadharCard: "",
    aadharCardImage: "",
  });

  useEffect(() => {
    window.scroll(0, 80);
  }, []);

  const [invalid, setinvalid] = useState("");
  const [formErr, setFormErr] = useState("");

  //   const postData = async () => {
  //     const name = values.name;
  //     const email = values.email;
  //     const password = values.password;
  //     const cpassword = values.confirmPassword;

  //     const res = await fetch("/register", {
  //       method: "POST",
  //       headers: {
  //         "content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         password,
  //         cpassword,
  //       }),
  //     });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      console.log("======");
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
          <Link to="/admin-portal-home-190310554227">
            <BiArrowBack className="logoutBtn" style={{ color: "white" }} />
          </Link>
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
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={values.name}
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
                      value={values.idImage}
                      onChange={(e) => handleChange(e)}
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
                      value={values.aadharCardImage}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="instructorRegisterBtn">
                <button type="submit" className="registerBtn">
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
