import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import Loader from "../../../../../../Loader";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

function EditMyArticleTask() {
  const { id, teacher, course } = useParams();
//   console.log(id, teacher, course);
  let navigate = useNavigate();

  const [content, setcontent] = useState("");
  const [precontent, setprecontent] = useState("");
  const [assignTask, setassignTask] = useState({});
  const [Loading, setLoading] = useState(true);
  const [instructor, setinstructor] = useState({});

  const [LectureTitle, setLectureTitle] = useState("");

  useEffect(() => {
    window.scroll(0, 0);

    const fetchlogin = async () => {
      await axios
        .get("/aboutInstructor")
        .then((response) => {
          setinstructor(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchlogin();

    const fetchdata = async () => {
      await axios
        .get("/singleassigntaskinfo/" + course)
        .then((response) => {
          setassignTask(response.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdata();
  }, [id, navigate]);

  // Find the Article to be edit
  useEffect(() => {
    if (assignTask) {
      if (assignTask.ChapterContent) {
        // console.log(assignTask.ChapterContent);
        const Lectcontent = assignTask.ChapterContent.find((obj) => {
          return obj._id === id;
        });
        setprecontent(Lectcontent.LectureContent);
        setLectureTitle(Lectcontent.LectureTitle)
      }
    }
  }, [assignTask]);

  const handleEditorChange = (content) => {
    setcontent(content);
  };

//   console.log(assignTask, content);

  const SubmitMyTask = async () => {
    if (LectureTitle === "") {
      window.alert("Please Enter a valid chapter title.");
    } else if (content === "") {
      window.alert("Please Enter content to added Chapter.");
    } else {
      const LectureNo = assignTask.ChapterNo;
      const Title = LectureTitle;
      const LectureContent = content;

      const res = await fetch("/Instructoraddlecturedetails/" + id, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          LectureNo,
          Title,
          LectureContent,
        }),
      });

      if (res.status === 200) {
        window.alert("Data Submit Successfully");
        navigate("/instructordashboard/task-assign");
      } else {
        console.log(res);
        window.alert("Internal Server Error, Try Later");
      }
    }
  };
  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="add-course-container">
          {/* This Link Heading to return back  */}
          <div className="add-course-header">
            <Link to="/instructordashboard/task-assign">
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>
          {/* Form To Start Taking Task Details  */}
          <div className="add-course-body">
            <div className="add-course-form-container">
              <h1>Add Course Content</h1>
              {/* Chapter Title  */}
              <div className="makedivision">
                <form>
                  {/* The Email Input  */}
                  <div className="signInput">
                    <label htmlFor="title">
                      Chapter Title :<span className="star"> *</span>
                    </label>
                    <br />
                    <input
                      type="text"
                      id="title"
                      placeholder="Add heading title of the chapter"
                      name="title"
                      value={LectureTitle}
                      onChange={(e) => {
                        setLectureTitle(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>

              {/* Enter Description Of task  */}
              <label htmlFor="Description">
                {" "}
                Chapter Description :<span className="star"> *</span>
              </label>
              <SunEditor
                onChange={handleEditorChange}
                required
                showToolbar={true}
                placeholder="Please type lecture content here..."
                setOptions={{
                  buttonList: [
                    [
                      "undo",
                      "redo",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "align",
                      "list",
                      "paragraphStyle",
                      "blockquote",
                      "bold",
                      "underline",
                      "italic",
                      "subscript",
                      "superscript",
                      "strike",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                      "removeFormat",
                      "outdent",
                      "indent",
                      "horizontalRule",
                      "lineHeight",
                      "table",
                      "link",
                      "image",
                      "audio",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "fullScreen",
                    ],
                  ],
                }}
              />
              {/* Submit Task  */}
              <div className="submitassigntask">
                <button onClick={SubmitMyTask}>Submit Task</button>
              </div>

              {/* Show the Previous Text  */}
              <br />
              <hr />
              <br />
              <h1>Previous Work</h1>
              <div dangerouslySetInnerHTML={{ __html: precontent }}></div>

              {/* The Task description  */}
              <hr />
              <p className="assignedtaskpreviewdefine">
                <b>Task Description</b>
              </p>
              {assignTask ? (
                <div className="assignedtaskpreview">
                  <p className="asstskdecp">{assignTask.ChapterDescription}</p>

                  {/* More Details of Task  */}
                  <div className="assignedtaskpreview_inner">
                    <p>
                      <b>Chapter No : </b>
                      <br />
                      {assignTask.ChapterNo}
                    </p>
                    <p>
                      <b>Chapter Name : </b>
                      <br />
                      {assignTask.ChapterName}
                    </p>
                    <p>
                      <b>Subject : </b>
                      <br />
                      {assignTask.Subject}
                    </p>
                    <p>
                      <b>Board : </b>
                      <br />
                      {assignTask.Board}
                    </p>
                    <p>
                      <b>Class : </b>
                      <br />
                      {assignTask.Class}
                    </p>
                    <p>
                      <b>Due Date : </b>
                      <br />
                      {assignTask.DueDate}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditMyArticleTask;
