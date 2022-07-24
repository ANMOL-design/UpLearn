import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./Data";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";

export default function StudentDashboard() {
  var x = 0;
  const [selected, setSelected] = useState(0);
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  useEffect(() => {
    window.scroll(0,0);
    if (loginDetails.isLoggedIn !== true && loginDetails.userRole !== "SDTTE UN ") 
    {
      navigate("/login");
    } 
  }, [])
  
    return (
      <>
        <div className="studWrapper">
            {/* sidebar */}
            <div className="sidebarMenu">
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
                      <span className="sidebarHeading" >{item.heading}</span>
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