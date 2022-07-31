import React, { useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddCourses() {

  const [COURSE, SETCOURSE] = useState({
    title: "",
    courseojective: "",
    level: "",
    language: "",
  });

  let navigate = useNavigate();
  const [Instructor, setInstructor] = useState({});
  const [thumbnailImage, setthumbnailImage] = useState("");
  const [thumbnail1, setthumbnail] = useState("");
  const [thumbnailImageData, setthumbnailImageData] = useState();
  const [Description1, setDescription] = useState("");

  useEffect(() => {
    window.scroll(0, 82);
    const fetchdata = async () => {
      await axios
        .get("/aboutInstructor")
        .then((response) => {
          setInstructor(response.data);
     
        })
        .catch((error) => {
          console.log(error);
          // navigate("/login");
        });
      };
      console.log(Instructor);
    fetchdata();
  }, [])

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const handlechange = (e) => {
    SETCOURSE({ ...COURSE, [e.target.name]: e.target.value });
  };

  const submitImage = (image1, imageData) => {
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
            setthumbnail(data.image.image);
          }
        });
    }
  };

  const postData = async () => {
    const { title, courseojective, level, language } = COURSE;
    const thumbnail = thumbnail1;
    const Description = Description1;
    const courseInstructor=Instructor._id
    const res = await fetch("/Instructoraddcourse", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title, courseojective, level, language,Description,thumbnail,courseInstructor
      }),
    });

    if (res.status === 200) {
      navigate("/");
    } else {
      console.log(res);
      window.alert("error occured");
    }
  };

  const submitCourse = async (event) => {
    submitImage(thumbnailImage, thumbnailImageData);

    event.preventDefault();
    console.log(COURSE);
    console.log(Description1);
    console.log(thumbnail1);
    postData();
  };

  return (
    <>
      <div className="add-course-container">
        <div className="add-course-header">
        <Link to="/admin-portal-home-190310554227">
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
                  <span htmlFor="Beginers">Beginers</span>
                  <br />
                  <input
                    type="radio"
                    id="Intermidiate"
                    name="level"
                    value="Intermidiate"
                    onChange={(e) => handlechange(e)}
                  />
                  <span htmlFor="Intermidiate">Intermidiate</span>
                  <br />
                  <input
                    type="radio"
                    id="Advanced"
                    name="level"
                    value="Advanced"
                    onChange={(e) => handlechange(e)}
                  />
                  <span htmlFor="Advanced">Advanced</span>
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
                  <span htmlFor="English">English</span>
                  <br />
                  <input
                    type="radio"
                    id="Hindi"
                    name="language"
                    required
                    value="Hindi"
                    onChange={(e) => handlechange(e)}
                  />
                  <span htmlFor="Hindi">Hindi</span>
                  <br />
                  <input
                    type="radio"
                    id="Hinglish"
                    name="language"
                    required
                    value="Hinglish"
                    onChange={(e) => handlechange(e)}
                  />
                  <span htmlFor="Hinglish">Hinglish</span>
                  <br />
                  <input
                    type="radio"
                    id="other"
                    required
                    name="language"
                    value="other"
                    onChange={(e) => handlechange(e)}
                  />
                  <span htmlFor="other">other</span>
                </label>
              </div>
              <div className="inputField btn">
                <p htmlFor="thumbnailofcourse">Thumbnail Image :</p>
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
                <div className="course-field">
                <button className="course-submit-btn" onClick={submitCourse}>Create Course</button>
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
