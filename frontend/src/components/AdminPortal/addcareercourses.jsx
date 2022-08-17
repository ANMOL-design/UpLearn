import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="container-fluid">
        <div className="uploadpost-container">
          <h1
            style={{ fontSize: "3rem", color: "#77bc3f" }}
            className="m-2 text-decoration-underline text-center mt-4"
          >
            Upload Blog Post
          </h1>

          <div className="form-container">
            <form method="POST">
              {/* Blog Title  */}
              <label htmlFor="title">Title :</label> <br />
              <input
                type="text"
                placeholder="Enter Blog Title ..."
                name="courseTitle"
                value={CAREERDETAILS.courseTitle}
                onChange={(e) => handleChange(e)}
                id="title"
              />{" "}
              <br />
              {/* Blog Category  */}
              <label htmlFor="category">Category :</label>
              <br />
              <select
                id="subject"
                name="courseCategory"
                value={CAREERDETAILS.courseCategory}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select</option>
                <option value="after-10">After 10th</option>
                <option value="after-12">After 12th</option>
                <option value="exams">Exams</option>
              </select>
              {CAREERDETAILS.courseCategory === "after-10" && (
                <>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select</option>
                    <option value="after-10">course 1</option>
                    <option value="after-12">course 2</option>
                    <option value="exams">course 3</option>
                  </select>
                </>
              )}
              {CAREERDETAILS.courseCategory === "after-12" && (
                <>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select</option>
                    <option value="after10">After 10th</option>
                    <option value="after12">After 12th</option>
                    <option value="examssds">Exams</option>
                  </select>
                </>
              )}
              {CAREERDETAILS.courseCategory === "exams" && (
                <>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select</option>
                    <option value="aftersds-10">exam 1</option>
                    <option value="aftersadsa-12">exam 2</option>
                    <option value="examsdsfd">Exams</option>
                  </select>
                </>
              )}
              {/* Blog Text  */}
              <label htmlFor="description">Description :</label>
              {/* <div className="description"  onChange={quillcontent}   name="description"    theme="snow"/> */}
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
              <input
                id="post-btn"
                onClick={(e) => postData(e)}
                type="submit"
                value="Add Post"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Uploadpage;
