import axios from "axios";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../Loader";

export default function ManageClass() {
  const [MyClassroom, setMyClassroom] = useState({});
  const [StudentInfo, setStudentsInfo] = useState([]);
  const { id } = useParams();
  let navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchClassroom = async () => {
      await axios
        .get("/myClass/" + id)
        .then((response) => {
          setMyClassroom(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchClassroom();
    const fetchdata = async () => {
      await axios
        .get("/allStudents")
        .then((response) => {
          setStudentsInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdata();
  }, [id]);

  // States to handle component changes in page
  const [ParticipantShow, setParticipantShow] = useState(true);
  const [NoticeShow, setNoticeShow] = useState(false);
  const [NotesShow, setNotesShow] = useState(false);
  const [AtandanceShow, setAtandanceShow] = useState(false);

  const handleParticipantShow = () => {
    setParticipantShow(true);
    setNoticeShow(false);
    setNotesShow(false);
    setAtandanceShow(false);
  };

  const handleNoticeShow = () => {
    setParticipantShow(false);
    setNoticeShow(true);
    setNotesShow(false);
    setAtandanceShow(false);
  };

  const handleNotesShow = () => {
    setParticipantShow(false);
    setNoticeShow(false);
    setNotesShow(true);
    setAtandanceShow(false);
  };

  const handleAtandanceShow = () => {
    setParticipantShow(false);
    setNoticeShow(false);
    setNotesShow(false);
    setAtandanceShow(true);
  };

  const AddParticipants = () => {
    const [err, seterr] = useState("");
    const [newParticipant, setParticipant] = useState("");
    const AddNewParticipant = async () => {
      const isSameStudent = StudentInfo.find((i) => i.email == newParticipant);
      if (newParticipant === "") {
        seterr("Select Participant from the List");
      } else {
        const isParticipantAdded = MyClassroom[0].classUsers.find(
          (j) => j == isSameStudent._id
        );

        if (isParticipantAdded) {
          seterr("Participant Already Added");
        } else {
          const UserId = isSameStudent._id;
          const classId = id;
          const res = await fetch("/Add-Participant", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              UserId,
              classId,
            }),
          });

          if (res.status === 200) {
            seterr("Participant Added Succesfully");
            navigate("/instructordashboard/my-classroom");
          } else {
            seterr("Something Went Wrong, Try Later\nError Occured");
          }
        }
      }
    };
    if (MyClassroom[0].classUsers.length < 1) {
      return (
        <>
          <div className="add-participants-container">
            <div className="add-user-Container">
              <div className="library-filter-container">
                <div className="librarySearch">
                  <input
                    list="library-search"
                    name="librarySearch"
                    value={newParticipant}
                    placeholder="What are you looking for ?"
                    onChange={(e) => setParticipant(e.target.value)}
                  />
                  {StudentInfo.length > 0 ? (
                    <datalist id="library-search">
                      {StudentInfo.map((item) => (
                        <option value={item.email} />
                      ))}
                    </datalist>
                  ) : null}

                  <button onClick={AddNewParticipant} type="submit">
                    Add Participant
                  </button>
                </div>
                <br />
                <p className="star">{err}</p>
                <br />
                <h2 style={{ textAlign: "center" }}>
                  No Participants in class{" "}
                </h2>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="add-participants-container">
            <div className="add-user-Container">
              <div className="library-filter-container">
                <div className="librarySearch">
                  <input
                    list="library-search"
                    name="librarySearch"
                    value={newParticipant}
                    placeholder="What are you looking for ?"
                    onChange={(e) => setParticipant(e.target.value)}
                  />
                  {StudentInfo.length > 0 ? (
                    <datalist id="library-search">
                      {StudentInfo.map((item) => (
                        <option value={item.email} />
                      ))}
                    </datalist>
                  ) : null}

                  <button onClick={AddNewParticipant} type="submit">
                    Add Participant
                  </button>
                </div>
                <br />
                <p className="star">{err}</p>
                <div className="my-participant-container"></div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  const gettimestamp = (day) => {
    let today = new Date(day);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yy = today.getFullYear();
    let hh = today.getHours();
    let mi = today.getMinutes();
    let ss = today.getSeconds();
    let time = dd + "/" + mm + "/" + yy + "(" + hh + ":" + mi + ":" + ss + ")";
    return time;
  };
  if (Loading) {
    return <Loader />;
  } else {
    if (MyClassroom) {
      return (
        <>
          <div
            className="my-class-main-container"
            style={{ marginLeft: "4.1rem", paddingTop: "1rem" }}
          >
            <h1>My Classroom</h1>
            <div className="my-class-header">
              <div className="myclass-details">
                <p>
                  <strong>Class Name : </strong>
                  {MyClassroom[0].ClassName}
                </p>{" "}
                <br />
                <p>
                  <strong>Subject : </strong>
                  {MyClassroom[0].Subject}
                </p>{" "}
                <br />
                <p>
                  <strong>Class : </strong> {MyClassroom[0].Class || +"10"}th
                </p>{" "}
                <br />
                <p>
                  <strong>Meeting Id : </strong>
                  {MyClassroom[0].meetingId}
                </p>{" "}
                <br />
                <p>
                  <strong>Created Time : </strong>
                  {gettimestamp(MyClassroom[0].classDatePost)}
                </p>{" "}
                <br />
                <p>
                  <strong>Total Number of Students : </strong>
                  {MyClassroom[0].classUsers.length}
                </p>{" "}
                <br />
                <p>
                  <strong>Class Description : </strong>
                  {MyClassroom[0].ClassDescription}
                </p>{" "}
                <br />
              </div>
            </div>
            <div className="manage-class-container">
              {/* The Linker Page to navigate the components  */}
              <div className="course-content-navbar">
                {/* Buttons to make Notice, text and Notes visible at different time  */}
                <div className="edit-course-container-btnchanger">
                  <button
                    onClick={handleParticipantShow}
                    className={ParticipantShow ? "bt-active" : ""}
                  >
                    Participants
                  </button>
                  <button
                    onClick={handleNoticeShow}
                    className={NoticeShow ? "bt-active" : ""}
                  >
                    Activity
                  </button>
                  <button
                    onClick={handleNotesShow}
                    className={NotesShow ? "bt-active" : ""}
                  >
                    Notes
                  </button>

                  <button
                    onClick={handleAtandanceShow}
                    className={AtandanceShow ? "bt-active" : ""}
                  >
                    Attendance
                  </button>
                </div>
              </div>

              {/* Showing Participant if Participant is Active  */}
              {ParticipantShow && <AddParticipants />}

              {/* Showing Notice if Notice is Active  */}
              {NoticeShow}

              {/* Showing Notes if Notes is Active  */}
              {/* {NotesShow && <ClassNotes />} */}

              {/* Showing Atandance if Atandance is Active  */}
              {AtandanceShow}
            </div>
          </div>
        </>
      );
    }
  }
}
