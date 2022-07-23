import React from "react";

import { useState } from "react";
// import { Link } from "react-router-dom";

import { SidebarData } from "./Data";
import MainDash from "./DashboardComponents/MainDash";

export default function StudentDashboard() {
  const [selected, setSelected] = useState(0);

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
                    {/* <Link to={item.path}>{item.heading}</Link> */}
                    <span>{item.heading}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* main dashboard */}
          <div className="mainDash">
            <MainDash />
          </div>
        </div>
      </div>
    </>
  );
}
