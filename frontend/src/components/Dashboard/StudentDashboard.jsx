import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./Data";
import MainDash from "./DashboardComponents/MainDash";
import { useSelector } from "react-redux";

export default function StudentDashboard() {
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
        <div className="studDashContainer">
          <div className="studWrapper">
            {/* sidebar */}
            <div className="sidebar">
              <div className="sidebarMenu">
                {SidebarData.map((item, index) => {
                  return (
                    <div
                      className={
                        selected === index
                          ? "sidebarMenuItem act"
                          : "sidebarMenuItem"
                      }
                      key={index}
                      onClick={() => setSelected(index)}
                    >
                      <item.icon />
                      <span>{item.heading}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* main dashboard */}
            <div className="mainDash">
              {SidebarData.map((item, index) => {
                return <div>{selected === index && <item.path />}</div>;
              })}
              {/* <MainDash /> */}
            </div>
          </div>
        </div>
      </>
    );
}