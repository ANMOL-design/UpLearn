import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./Data";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import axios from "axios";
var CryptoJS = require("crypto-js");


export default function StudentDashboard() {
  var x = 0;
  const [selected, setSelected] = useState(0);
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  

  useEffect(() => {
    window.scroll(0,0);
    // Decrypting the User Role
    if(loginDetails.userRole !== ''){
      var bytes = CryptoJS.AES.decrypt(loginDetails.userRole, 'my-secret-key@123');
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
   
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") 
    {
      navigate("/instructordashboard");
    }
    else if(Number(loginDetails.isLoggedIn) && role === "STUDENT")
    {
      navigate("/studentdashboard");
      const fetchdata = async () =>{
        await axios.get("/aboutStudents").then(response => {
          console.log(response.data);
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
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate])

    const SideToggler = () => {
      var e = document.getElementById('dashSlider');
      e.classList.toggle('hiderslider');
    }
  
    return (
      <>
        <div className="studWrapper">
            {/* sidebar */}
            <span className="sidebartoggler " onClick={SideToggler}><FaBars /></span>
            <div className="sidebarMenu hiderslider" id='dashSlider'>
                {SidebarData.map((item, index) => {
                  return (
                    <div
                      className={
                        selected === index
                          ? "sidebarMenuItem act"
                          : "sidebarMenuItem"
                      }
                      key={x++}
                      onClick={() => setSelected(index)}
                    >
                      <item.icon />
                      <span className="sidebarHeading" onClick={SideToggler}>{item.heading}</span>
                    </div>
                  );
                })}
            </div>
            {/* main dashboard */}
            {SidebarData.map((item, index) => {
              return <div key={x++}>{selected === index && <item.path />}</div>;
            })}
        </div>
      </>
    );
}