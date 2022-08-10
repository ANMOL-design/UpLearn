import React, { useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../assets/images/progressbar.gif";
var CryptoJS = require("crypto-js");
export default function AddCourses() {
  const loginDetails = useSelector((state) => state.userReducers);
  const [COURSE, SETCOURSE] = useState({
    title: "",
    courseojective: "",
    level: "",
    language: "",
    courseCategory:""
  });

  let navigate = useNavigate();
  const [Instructor, setInstructor] = useState({});
  const [thumbnailImage, setthumbnailImage] = useState("");
  const [thumbnail1, setthumbnail] = useState("");
  const [thumbnailImageData, setthumbnailImageData] = useState();
  const [Description1, setDescription] = useState("");
  const [err, seterr] = useState("");
  let thumbnai_Image ='';
  useEffect(() => {
    window.scroll(0, 60);
    // Decrypting the User Role
    if(loginDetails.userRole !== ''){
      var bytes = CryptoJS.AES.decrypt(loginDetails.userRole, 'my-secret-key@123');
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    // Check is  Login Or Not 
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") 
    {
      // call the fetch admin detail function 
      const fetchdata = async () =>{
        await axios.get("/aboutInstructor").then(response => {
          setInstructor(response.data);
          })
          .catch(error => {
            console.log(error);
            navigate("/login");
          });
      }
      fetchdata();
    }
    
    else{
      navigate("/login");
    }

  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);
 
  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const handlechange = (e) => {
    SETCOURSE({ ...COURSE, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    if (
      !COURSE.title ||
      !COURSE.courseojective ||
      !COURSE.language||
      !COURSE.level||
      !Description1||
      !thumbnailImage||
      !COURSE.courseCategory
    ) {
      seterr("Please Enter all required Fields.");
      return false;
    } else if (thumbnailImage === "") {
      seterr("Please Upload Thumbnail Image.");
      return false;
    } 
    return true;
  };
  const submitImage = async (image, imageData) => {
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
            thumbnai_Image = data.image.image;
            
          }
        });
    }
  };
  const postData = async () => {
    const { title, courseojective, level, language ,courseCategory} = COURSE;
    const thumbnail = thumbnai_Image;
    const Description = Description1;
    const courseInstructor=Instructor._id
    const res = await fetch("/Instructoraddcourse", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title, courseojective, level, language,Description,thumbnail,courseInstructor,courseCategory
      }),
    });

    if (res.status === 200) {
      navigate("/instructordashboard");
    } else {
      console.log(res);
      window.alert("error occured");
    }
  };
  const time = 10000;
  function sendData () {
    setTimeout(function () {
    if(thumbnai_Image==""){
       sendData();
    }
    else{
    postData();
    }
  }, time);
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addBookBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

      // Send Images to cloud
      await submitImage(thumbnailImage, thumbnailImageData);

      // Send Data to Backend after 10 sec
      
        sendData();
    }
  };
  

  return (
    <>
      <div className="add-course-container">
        <div className="add-course-header">
        <Link to="/instructordashboard/my-courses">
            <button className="backBtn" style={{ color: "white" }} >Back</button>
          </Link>
        </div>
        <form action="">
          <div className="add-course-body">
            <div className="add-course-form-container">
            <h2 className="add-course-heading">Add Course</h2>
              <div className="add-course-Input">
                <label htmlFor="courseTitle">Title :</label>
                <input
                  type="text"
                  name="title"
                  required
                  id="courseTitle"
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="add-course-Input">
                <label htmlFor="Description">Description :</label>
                <SunEditor
                  // setContents="My contents"
                  onChange={handleEditorChange}
                  required
                  showToolbar={true}
                  setOptions={{
                    buttonList: [
                      [
                        "undo",
                        "redo",
                        "font",
                        "fontSize",
                        "formatBlock",
                        "paragraphStyle",
                        "blockquote",
                        "bold",
                        "underline",
                        "italic",
                        "subscript",
                        "superscript",
                        "hiliteColor",
                        "textStyle",
                        "align",
                        "horizontalRule",
                        "list",
                        "lineHeight",
                        "image",
                        // "math",
                        // ,
                        // You must add the 'katex' library at options to use the 'math' plugin.
                        /** 'imageGallery', */ // You must add the "imageGalleryUrl".
                        "fullScreen",
                        "showBlocks",
                        "codeView",
                        "preview",
                        "print",
                        "save",
                        "template",
                      ],
                    ],
                  }}
                />
              </div>
              <div className="add-course-Input">
                <label htmlFor="courseojective">
                  What will students learn in your course?{" "}
                </label>
                <br />
                <textarea
                  name="courseojective"
                  id="courseojective"
                  required
                  onChange={(e) => handlechange(e)}
                ></textarea>
              </div>
              <div className="add-course-radio">
                <label htmlFor="">
                  Level of Course : <br />
                  <input
                    type="radio"
                    id="Beginers"
                    name="level"
                    value="Beginers"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="Beginers">Beginers</label>
                  <br />
                  <input
                    type="radio"
                    id="Intermidiate"
                    name="level"
                    value="Intermidiate"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="Intermidiate">Intermidiate</label>
                  <br />
                  <input
                    type="radio"
                    id="Advanced"
                    name="level"
                    value="Advanced"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="Advanced">Advanced</label>
                </label>
              </div>
              <div className="add-course-radio">
                <label htmlFor="">
                  Language of Course : <br />
                  <input
                    type="radio"
                    id="English"
                    required
                    name="language"
                    value="English"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="English">English</label>
                  <br />
                  <input
                    type="radio"
                    id="Hindi"
                    name="language"
                    required
                    value="Hindi"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="Hindi">Hindi</label>
                  <br />
                  <input
                    type="radio"
                    id="Hinglish"
                    name="language"
                    required
                    value="Hinglish"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="Hinglish">Hinglish</label>
                  <br />
                  <input
                    type="radio"
                    id="other"
                    required
                    name="language"
                    value="other"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="other">other</label>
                </label>
              </div>
              <div className="inputField btn">
              <div className="inputFiel">
              <label htmlFor="courseCategory">
                  Select Category<span className="star">*</span>
              </label> <br />
              <select id="courseCategorys" name="courseCategory" value={COURSE.courseCategory} onChange={(e) => handlechange(e)}>
                <option  disabled   value="">Select Category:</option>
                <option  onChange={(e) => handlechange(e)} value="Art/Design">Art/Design</option>
                <option  onChange={(e) => handlechange(e)} value="Communication/Speech">Communication/Speech</option>
                <option  onChange={(e) => handlechange(e)} value="Computer Science">Computer Science</option>
                <option  onChange={(e) => handlechange(e)} value="Music">Music</option>
                <option  onChange={(e) => handlechange(e)} value="Photography">Photography</option>
                <option  onChange={(e) => handlechange(e)} value="Personality Developmant">Personality Developmant</option>
                <option  onChange={(e) => handlechange(e)} value="Foreign Languages">Foreign Languages</option>
                <option  onChange={(e) => handlechange(e)} value="Business Management">Business Management</option>
                <option  onChange={(e) => handlechange(e)} value="Other">Other</option>
          
              </select>
              </div>
              <br />
                <label htmlFor="thumbnailofcourse">Thumbnail Image :</label> <br />
                <input
                  type="file"
                  required
                  id="idImage"
                  className="add-course-uploadBtn"
                  value={thumbnailImage}
                  onChange={(e) => {
                    setthumbnailImage(e.target.value);
                    setthumbnailImageData(e.target.files[0]);
                  }}
                />
                  <span className="uploadphoto">{thumbnailImage}</span>
                <div className="course-field">
                <div>
                  <img src={Loader} alt="Loader" id="loader-reg" />
                
                  <p className="uploadphoto">{err}</p>
                </div>
                <div className="submit-btn">
                  <input
                    type="submit"
                    id="addBookBtn"
                    className="addBtn"
                    onClick={handleSubmit}
                    value="Add Book"
                  />
                </div>
              </div>
              </div>
            </div>
            <div className="add-course-footer">
              
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
