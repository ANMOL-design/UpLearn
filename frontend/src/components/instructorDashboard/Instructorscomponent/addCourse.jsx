import React, { useState } from "react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import katex from "katex";
export default function AddCourses() {
  const [COURSE, SETCOURSE] = useState({
    title: "",
    courseojective: "",
    level:"",
 
  });
  const [thumbnailImage, setthumbnailImage] = useState("");
  const [thumbnailImageData, setthumbnailImageData] = useState();
  const handleEditorChange = (content) => {
    console.log(content);
  };
  const handlechange = (e) => {
    SETCOURSE({ ...COURSE, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="add-course-container">
        <div className="add-course-header">
          <h2 className="add-course-heading">Add Course</h2>
        </div>
        <div className="add-course-body">
          <div className="add-course-form-container">
            <div className="course-field">
              <label htmlFor="courseTitle">Title :</label>
              <input
                type="text"
                name="title"
                id="courseTitle"
                onChange={(e) => handlechange(e)}
              />
            </div>
            <div className="course-field">
              <label htmlFor="Description">Description :</label>
              <SunEditor
                // setContents="My contents"
                onChange={handleEditorChange}
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
            <div className="course-field">
              <label htmlFor="language">Language of course :</label>
              <input
                type="text"
                name="title"
                id="courseTitle"
                onChange={(e) => handlechange(e)}
              />
            </div>
            <div className="course-field">
              <label htmlFor="courseojective">
                What will students learn in your course?{" "}
              </label>
              <br />
              <textarea
                name="courseojective"
                id="courseojective"
                onChange={(e) => handlechange(e)}
              ></textarea>
            </div>
            <div className="course-field">
              <label htmlFor="">
                Level of Course : <br />
                <input
                  type="radio"
                  id="anyone"
                  name="level"
                  value="Anyone"
                  onChange={(e) => handlechange(e)}
                />
                <label for="anyone">Anyone</label>
                <br />
                <input
                  type="radio"
                  id="Beginers"
                  name="level"
                  value="Beginers"
                  onChange={(e) => handlechange(e)}
                />
                <label for="Beginers">Beginers</label>
                <br />
                <input
                  type="radio"
                  id="Intermidiate"
                  name="level"
                  value="Intermidiate"
                  onChange={(e) => handlechange(e)}
                />
                <label for="Intermidiate">Intermidiate</label>
                <br />
                <input
                  type="radio"
                  id="Advanced"
                  name="level"
                  value="Advanced"
                  onChange={(e) => handlechange(e)}
                />
                <label for="Advanced">Advanced</label>
              </label>
            </div>
            <div className="course-field">
            <label htmlFor="thumbnailofcourse">
                      Thumbnail Image :
                    </label>
                    <input
                      type="file"
                      id="idImage"
                      value={thumbnailImage}
                      onChange={(e) => {
                        setthumbnailImage(e.target.value);
                        setthumbnailImageData(e.target.files[0]);
                      }}
                    />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
