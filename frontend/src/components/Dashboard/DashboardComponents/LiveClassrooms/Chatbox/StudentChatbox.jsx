import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
var CryptoJS = require("crypto-js");
export default function StudentChatbox(props) {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  const [MyMessage,setMessage] = useState("");
  const [MyClassrooms, setMyClassrooms] = useState({});
  const [userData, setUserData] = useState({});
  const [userrole, setuserrole] = useState("");
  const [Loading, setLoading] = useState(true);
  useEffect(() => {

    if(props){
      setMyClassrooms(props.MyClassroom);
      setLoading(false)
    }
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            setUserData(response.data);
            setuserrole("INSTRUCTOR");
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
      
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      const fetcstudenthdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            setUserData(response.data);
            setuserrole("STUDENT");
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetcstudenthdata();
    }
  }, [props, Loading,loginDetails.userRole]);
  console.log(MyClassrooms);
 const postmessage = async()=>{
  let classId = MyClassrooms._id;
  let message = MyMessage;
  let senderId = userData._id;
  let senderName = userData.name
  console.log(classId);
  const res = await fetch("/sendmessagebystudent", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      classId,message,senderId,senderName
      ,
    }),
  });

  if (res.status === 200) {
    setLoading(true);
    setMessage("")
  } else {
  }
 }
 console.log(userData);
  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          {/* <Message />
          <Message own={true} />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message /> */}
        </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="write something..."
            value={MyMessage}
            onChange={(e)=>{setMessage(e.target.value)}}
          ></textarea>
          <button className="chatSubmitButton" onClick={postmessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
