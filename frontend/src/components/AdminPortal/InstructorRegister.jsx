import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

function InstructorRegister() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    subject: "",
    block: "",
    permanentAddress: "",
    school: "",
    city: "",
    state: "",
    pincode: "",
    mobileno: "",
    idImage: "",
    image: "",
    isInstructor: "",
    teacher_id: "",
    aadharCard: "",
    aadharCardImage: "",
  });

  useEffect(() => {
    window.scroll(0, 150);
  }, []);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [copassword, setcopassword] = useState("");

  const [subject, setsubject] = useState("");
  const [block, setblock] = useState("");
  const [permanentAddress, setpermanentAddress] = useState("");
  const [school, setschool] = useState("");

  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [mobileno, setmobileno] = useState("");

  const [idImage, setidImage] = useState("");
  const [image, setimage] = useState("");
  const [isInstructor, setisInstructor] = useState("");
  const [teacher_id, setteacher_id] = useState("");

  const [aadharCard, setaadharCard] = useState("");
  const [aadharCardImage, setaadharCardImage] = useState("");
  const [invalid, setinvalid] = useState("");

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

    // if (submit) {
    //   //Generate the OTP and send to uers
    //   sendotp();
    //   // Get the modal
    //   var modal = document.getElementById("myModal");
    //   // Get the <span> element that closes the modal
    //   var span = document.getElementsByClassName("close")[0];
    //   // Making the Display of Modal Visible to Fill OTP to it
    //   modal.style.display = "block";

    //   // When the user clicks on <span> (x), close the modal
    //   span.onclick = function () {
    //     modal.style.display = "none";
    //   };
    // }
    if (submit) {
      console.log("======");
    }
  };

  //form validation
  const handleValidation = () => {
    if (values.name === "") {
      setname("Name is required");
      window.scroll(0, 200);
      return false;
    } else if (values.email === "") {
      setemail("Email is required");
      window.scroll(0, 250);
      return false;
    } else if (values.password === "") {
      setpassword("Password is required");
      return false;
    } else if (values.cpassword === "") {
      setcopassword("Please Confirm Your Password");
      return false;
    } else if (values.password.length < 8) {
      setinvalid("Password must be atleast 8 character");
      return false;
    } else if (values.password !== values.cpassword) {
      setinvalid("Password and Confirm password should be same");
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setname("");
    setemail("");
    setpassword("");
    setcopassword("");
    setsubject("");
    setblock("");
    setpermanentAddress("");
    setschool("");
    setcity("");
    setstate("");
    setpincode("");
    setmobileno("");
    setidImage("");
    setimage("");
    setisInstructor("");
    setteacher_id("");
    setaadharCard("");
    setaadharCardImage("");
    setinvalid("");
  };

  return (
    <>
      {/* The Container Of Login An instructor In Page  */}
      <div className="instructorin">
        <div className="instructorContainer">
          <div className="instructorWrapper">
            <h2>Register Yourself</h2>

            {/* Starting the Form  */}
            <div className="instructorForm">
              <form>
                <div className="instructorInput">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{name}</p>
                  <label>Email</label>
                  <input
                    type="email "
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="instructorInput">
                  <label>Password</label>
                  <input type="password" />
                  <label>Confirm Password</label>
                  <input type="password" />
                </div>
                <div className="instructorInput">
                  <label>Subject</label>
                  <input type="text" />
                  <label>Block</label>
                  <input type="text" />
                </div>
                <div className="instructorInput">
                  <label>Permanent Address</label>
                  <input type="text" />
                </div>
                <div className="instructorInput">
                  <label>School</label>
                  <input type="text" />
                  <label>City</label>
                  <input type="text" />
                  <label>State</label>
                  <input type="text" />
                </div>
                <div className="instructorInput">
                  <label>Pincode</label>
                  <input type="text" />
                  <label>Mobile No.</label>
                  <input type="text" />
                </div>
                <div className="instructorInput">
                  <label>ID Image</label>
                  <input type="text" />
                  {/* <label>Upload ID</label>
                  <input type="file" className="inputfile " /> */}
                  <input type="file" id="file" />
                  <label for="file" style={{ textAlign: "center" }}>
                    <FiUpload />
                    UploadID
                  </label>
                </div>
                <div className="instructorInput">
                  <label>Teacher ID</label>
                  <input type="text" />
                </div>

                <div className="instructorInput">
                  <label>Aadhar No.</label>
                  <input type="text" />

                  <input type="file" />
                  <label for="file" style={{ textAlign: "center" }}>
                    <FiUpload />
                    Upload Aadhar
                  </label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label for="vehicle1"> Are you a Instructor?</label>
                </div>
                <div style={{ textAlign: "center" }}>
                  <button className="instructorupBtn">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InstructorRegister;
