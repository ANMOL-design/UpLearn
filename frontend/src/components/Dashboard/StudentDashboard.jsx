import React, { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
// import { Link } from "react-router-dom";

import { SidebarData } from "./Data";
import MainDash from "./DashboardComponents/MainDash";
import Login from "../Login/Login";

export default function StudentDashboard() {
  const { state, dispatch } = useContext(UserContext);
  const [selected, setSelected] = useState(0);
  if(state.loggedIn==0){
    return(
      <>
        <Login/>
        </>
        );
  }
  else if(window.localStorage.getItem("Role")==="INSTRUCTOR"){
    return(
      <>
      <Login/>
      </>
      );
  }
  else{
  return (
    <>
      <div className="studDashContainer">
        <div className="studWrapper">
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
                    {/* <Link to={item.path}>{item.heading}</Link> */}
                    <span>{item.heading}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <MainDash />
          </div>
        </div>
      </div>
    </>
  );
            }
}
