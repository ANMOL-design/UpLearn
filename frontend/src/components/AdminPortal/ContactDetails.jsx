import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import Loader from "../Loader";

export default function ContactDetails() {
  let navigate = useNavigate();
  const adminstatus = useSelector((state) => state.AdminReducers);

  const [openModal, setOpenModal] = useState(false);
  const [contactDetails, setcontactDetails] = useState([]);
  const [InfoBackup, setInfoBackup] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [values, setValues] = useState({
    name: "",
    mail: "",
    subject: "",
    body: "",
  });

  useEffect(() => {
    window.scroll(0, 0);
    // Check is Admin Login Or Not
    if (Number(adminstatus.isAdminLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/contactResult")
          .then((response) => {
            setcontactDetails(response.data);
            setInfoBackup(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            // navigate("/admin-portal-login-190310554227");
          });
      };
      fetchdata();
    }

    // If User is not login redirect to login
    else {
      navigate("/admin-portal-login-190310554227");
    }
  }, [adminstatus.isAdminLoggedIn, navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const name = values.name;
    const mail = values.mail;
    const subject = values.subject;
    const body = values.body;

    const res = await fetch("/sendReply", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        mail,
        subject,
        body,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      window.alert("Your mail is succesfully sent.");
    } else {
      window.alert("Error occured , try again");
    }
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        {" "}
        {/* Main Heading to Return  */}
        <div className="instructorHeader">
          <Link to="/admin-portal-home-190310554227">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        <div className="contact-heading">
          <h1>Contact Details</h1>
        </div>
        <table className="contactDetailTable">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Query</th>
              <th>Time</th>
              <th>Send reply</th>
            </tr>
          </thead>
          <tbody>
            {contactDetails.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNo}</td>
                <td>{item.message}</td>
                <td>{item.time}</td>
                <td>
                  <button
                    type="button"
                    className="replyBtn"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    Reply
                  </button>
                  {openModal && (
                    <div className="sendReplyModal" id={item._id}>
                      <div className="sendReplyModal-content">
                        <div className="sendReplyModal-header">
                          <h2 className="modal-title" id="exampleModalLabel">
                            Send Reply
                          </h2>
                          <button
                            type="button"
                            className="close"
                            onClick={() => {
                              setOpenModal(false);
                            }}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div className="sendReplyModal-body">
                          <form method="post">
                            Name:<br></br>
                            <input
                              type="text"
                              list={item.name}
                              name="name"
                              value={values.name}
                              onChange={(e) => handleChange(e)}
                            />
                            <br></br>
                            <datalist id={item.name}>
                              <option value={item.name}>{item.name}</option>
                            </datalist>
                            E-mail:<br></br>
                            <input
                              type="text"
                              list={item.email}
                              name="mail"
                              value={values.email}
                              onChange={(e) => handleChange(e)}
                            />
                            <br></br>
                            <datalist id={item.email}>
                              <option value={item.email}>{item.email}</option>
                            </datalist>
                            Subject:<br></br>
                            <input
                              type="text"
                              list={item.subject}
                              name="subject"
                              value={values.subject}
                              onChange={(e) => handleChange(e)}
                            />
                            <br></br>
                            <datalist id={item.subject}>
                              <option value={item.subject}>
                                {item.subject}
                              </option>
                            </datalist>
                            Body:<br></br>
                            <textarea
                              rows={3}
                              cols={25}
                              type="text"
                              name="body"
                              size="50"
                              value={values.body}
                              onChange={(e) => handleChange(e)}
                            />
                            <br></br>
                            <div className="modal-footer">
                              <button type="submit" onClick={postData}>
                                Send Reply
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
