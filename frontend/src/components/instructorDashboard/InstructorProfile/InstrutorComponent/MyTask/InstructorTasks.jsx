import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../../Loader";
import axios from "axios";
import { MdOndemandVideo, MdTextFields, MdQuiz } from "react-icons/md";

function InstructorAssignTask(props) {
  const [assignTask, setassignTask] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState({});

  useEffect(() => {
    window.scroll(0, 0);
    const fetchdata = async () => {
      await axios
        .get("/assigntaskdetails/" + props.details._id)
        .then((response) => {
          setassignTask(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdata();
  }, [props.details._id]);

  const toggleHide = (index) => {
    setHidden({ [index]: !hidden[index] });
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <div className="PendingtaskConainer">
        <h1>Pending Tasks</h1>
        {assignTask ? (
          <div className="pendingtaskinnercontainer">
            {assignTask.map((item, index) => {
              return (
                <div key={item._id} className="pendingtaskmaininnercontainer">
                  {/* Showing the due date of Pending Task  */}
                  <div className="pendingtaskduedate">
                    Due Date : &nbsp;{item.DueDate}
                  </div>
                  {/* Show the description of Task  */}
                  <div className="pendingtasktitle">
                    <p>{index + 1}.</p>
                    <p className="pendingdecription">
                      {item.ChapterDescription} Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Quisquam incidunt illo earum
                      autem! Possimus ex accusamus dolorum reiciendis, tempora
                      inventore praesentium ipsam obcaecati sequi quibusdam?
                      Obcaecati eos quo ducimus ullam.
                    </p>
                    <button onClick={(e) => toggleHide(index)}>
                      {hidden[index] ? "-" : "+"}
                    </button>
                  </div>
                  {/* Show the Add Content Section of Pending Task  */}
                  {hidden[index] && (
                    <div className="pendingtasktogglercontainer">
                      <div className="innerbodyoftogglercontainer">
                        <Link
                          to={
                            "/task-assign/add-lecture-video/" +
                            item._id +
                            "/" +
                            props.details._id
                          }
                        >
                          {/* Block to add Video Content  */}
                          <div>
                            <MdOndemandVideo />
                            <h3>Videos Lectures</h3>
                            <p>
                              Create a rich learning experiences with the help
                              of video lectures.
                            </p>
                          </div>
                        </Link>
                      </div>
                      <div className="innerbodyoftogglercontainer">
                        <Link
                          to={
                            "/task-assign/add-lecture-data/" +
                            item._id +
                            "/" +
                            props.details._id
                          }
                        >
                          {/* Block to add Text Content  */}
                          <div>
                            <MdTextFields />
                            <h3>Theory Content</h3>
                            <p>
                              Create a rich learning experiences with the help
                              of theory notes.
                            </p>
                          </div>
                        </Link>
                      </div>
                      <div className="innerbodyoftogglercontainer">
                        <Link
                          to={
                            "/task-assign/add-lecture-quiz/" +
                            item._id +
                            "/" +
                            props.details._id
                          }
                        >
                          {/* Block to add MdQuiz Content  */}
                          <div>
                            <MdQuiz />
                            <h3>Practice test</h3>
                            <p>
                              Help students prepare for certification exams by
                              providing practice question.
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                  {/* Show the Submit Task  */}
                  {hidden[index] && (
                    <div className="submitpendingtask">
                      <Link to="/">
                        <button>Preview Task</button>
                      </Link>
                      <button className="btn-success">Submit for Review</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="nopendingtask">No Pending task</div>
        )}
      </div>
    );
  }
}

export default InstructorAssignTask;
