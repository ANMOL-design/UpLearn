import React from "react";
import Logo from "./../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { RiChatSmileFill } from "react-icons/ri";
import { TiCog } from "react-icons/ti";
import { SiGoogleclassroom } from "react-icons/si";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdCategory } from "react-icons/md";


const InstructorSidebar = () => {
   
    const togglerSiderbar = () =>{
        const e = document.getElementById('instructorSidebar');
        e.classList.toggle('sidebarhider');
    }
    return(
        <>
            {/* Toggler to hide sidebar on small Screen  */}
            <div className="sidebar_toggler" onClick={togglerSiderbar}>
                <i><GiHamburgerMenu /></i>
            </div>
            <div className="sidebar sidebarhider" id="instructorSidebar">
                {/* Toggler closer to hide the navbar  */}
                <div className="sidebar_toggler_close" onClick={togglerSiderbar}>
                    <i>&times;</i>
                </div>
                {/* Logo  */}
                <div className="logo-details">
                    <Link className="link_name" to="/">
                        <img src={Logo} alt="Logo" />
                    </Link>
                </div>
                {/* Links of the Sidebar  */}
                <ul className="nav-links">
                    {/* Dashboard Home  */}
                    <li> 
                        <i><IoGrid /></i>
                        <ul className="sub-menu">
                            <li>
                                <Link className="link_name" to="/instructordashboard">Home</Link>
                            </li>
                        </ul>
                    </li>
                    {/* Dashboard Category  */}
                    <li>
                        <i><MdCategory /></i>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Category</a></li>
                            <li><Link to="task-assign">My Task</Link></li>
                            <li><Link to="My_courses">My Courses</Link></li>
                            <li><Link to="queries-solved">Answers Doubts</Link></li>
                        </ul>
                    </li>
                    {/* Request and Followers  */}
                    <li>
                        <i><RiChatSmileFill /></i>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Social</a></li>
                            <li><Link to="requests">Requests</Link></li>
                            <li><Link to="followers">Followers</Link></li>
                        </ul>
                    </li>
                    {/* ClassRoom Icon  */}
                    <li>
                        <i><SiGoogleclassroom /></i>
                        <ul className="sub-menu">
                            <li><Link className="link_name" to="my-classroom">My Classroom</Link></li>
                        </ul>
                    </li>
                    {/* Settings  */}
                    <li>
                        <i><TiCog /></i> 
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Settings</a></li>
                            <li><Link to="my-profile">My Profile</Link></li>
                            <li><Link to="edit-profile">Edit Profile</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default InstructorSidebar;