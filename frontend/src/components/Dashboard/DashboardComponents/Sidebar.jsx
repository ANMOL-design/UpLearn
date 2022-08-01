import React, { useState } from "react";
import { FaTh, FaBars, FaChalkboardTeacher } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiSpreadsheet } from "react-icons/bi";
import { GoReport } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/studentdashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <CgProfile />,
    },
    {
      path: "/stud-courses",
      name: "Courses",
      icon: <BiSpreadsheet />,
    },
    {
      path: "/instructor",
      name: "Instructor",
      icon: <FaChalkboardTeacher />,
    },
    {
      path: "/reports",
      name: "Reports",
      icon: <GoReport />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <MdLogout />,
    },
  ];
  return (
    <div className="container">
      <div
       
       
      
        style={{ width: isOpen ? "200px" : "50px" }}
        className="stud_sidebar "
      >
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            UpLearn
          </h1>
          <div style={{ marginLeft: isOpen ? "35px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      {/* <main>{children}</main> */}
    </div>
  );
};

export default Sidebar;
