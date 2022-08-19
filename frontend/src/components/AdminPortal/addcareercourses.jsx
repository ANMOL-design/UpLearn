import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";


const Uploadpage = () => {
  const [description, setDescription] = useState("");
  const [CAREERDETAILS, setCAREERDETAILS] = useState({
    courseTitle: "",
    courseCategory: "",
    courseSubCategory: "",
  });
  const navigate = useNavigate();

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const postData = async (e) => {
    e.preventDefault();

    const res = await fetch("/admin/postCareerDetails", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title: CAREERDETAILS.courseTitle,
        category: CAREERDETAILS.courseCategory,
        subcategory: CAREERDETAILS.courseSubCategory,
        description: description,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 201) {
      window.alert("Your blog is added.");
      navigate("/", { replace: true });
    } else {
      window.alert("Error occured , try again");
    }
  };

  const handleChange = (event) => {
    setCAREERDETAILS({
      ...CAREERDETAILS,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="addcareercourses">
      <div className="career-course-header">
            <Link to="/admin-portal-home-190310554227">
              <button className="backBtn" style={{ color: "white" }}>
                Back
              </button>
            </Link>
          </div>
        <div className="career-upload-body">
          <div className="career-form-container">
            <form method="POST">
              {/* Blog Title  */}
              <h1 className="career-course-heading">Add Careers</h1>
              <div className="career-course-Input">
              <label htmlFor="title">Title :</label> <br />
              <input
                type="text"
                placeholder="Enter Title"
                name="courseTitle"
                value={CAREERDETAILS.courseTitle}
                onChange={(e) => handleChange(e)}
                id="title"
              />{" "}
              </div>
              
              {/* Blog Category  */}
              <div className="career-course-Input">
              <label htmlFor="category">Category :</label>
              
              <select
                id="subject"
                name="courseCategory"
                value={CAREERDETAILS.courseCategory}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select Category</option>
                <option value="after-10">After 10th</option>
                <option value="after-12">After 12th</option>
                <option value="exams">Exams</option>
              </select>
              </div>
              {CAREERDETAILS.courseCategory === "after-10" && (
                
                <div className="career-course-Input">
              <label htmlFor="category">Sub-Category :</label>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select Sub-Category</option>
                    <option value="class-11-12">Class 11th-12th</option>
                    <option value="diploma-courses">Diploma Courses</option>
                    <option value="paramedial-courses">
                      Paramedical Courses
                    </option>
                  </select>
                  </div>
                
              )}
              {CAREERDETAILS.courseCategory === "after-12" && (
                <div className="career-course-Input">
                <label htmlFor="category">Sub-Category :</label>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select Sub-Category</option>
                    <option value="engineering">Engineering</option>
                    <option value="medical-health-care">
                      Medical & Health Care
                    </option>
                    <option value="commerce">Commerce</option>
                    <option value="diploma-in-engineering">
                      Diploma in Engineering
                    </option>
                  </select>
                </div>
              )}
              {CAREERDETAILS.courseCategory === "exams" && (
                <div className="career-course-Input">
                <label htmlFor="category">Sub-Category :</label>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select Sub-Category</option>
                    <option value="aftersds-10">exam 1</option>
                    <option value="aftersadsa-12">exam 2</option>
                    <option value="examsdsfd">Exams</option>
                  </select>
                </div>
                
              )}
              {/* Blog Text  */}
              <div className="career-course-Input">
              <label htmlFor="description">Description :</label>
              
              <SunEditor
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
              <div className="career-submit-btn">
              <input
                id="post-btn"
                onClick={(e) => postData(e)}
                className="addBtn"
                type="submit"
                value="Submit"
              />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Uploadpage;
