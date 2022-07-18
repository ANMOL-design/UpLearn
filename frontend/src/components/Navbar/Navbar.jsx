import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./../../assets/images/Logo.png";
import { FaAngleDown, FaBars} from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";

function Navbar(){

    const Toggler = () => {
        var element = document.getElementById("toggleNav");
        element.classList.toggle("show-slider");
    }

    return(
        <div className="wrapper" id="navbar">
            <nav>
                <div className="content">
                    {/* The website Logo and Name  */}
                    <div className="logo">
                        <NavLink to="/">
                            <img src={Logo} alt="Logo" className="logo_ig" /> 
                            <span style={{color: "#2b4eff"}}>Up</span>
                            <span>Learn</span>
                        </NavLink>  
                    </div>
                    {/* The category logo  */}
                    <div className="category">
                        <NavLink to="/category">
                            <span><TbGridDots /></span>
                            Category
                        </NavLink>
                    </div>

                    {/* The Website DropDowns  */}
                    <ul className="links" id="toggleNav">
                        {/* Link for the Home Page  */}
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {/* Links and dropdown for the courses  */}
                        <li>
                            <NavLink to="/courses"  className="desktop-link" style={{paddingRight: "0px"}}>Courses</NavLink>
                            <input type="checkbox" id="show-courses" />
                            <label htmlFor="show-courses"><span className="hideNav">Courses</span><FaAngleDown /></label>
                            <ul>
                                <li><NavLink to="/">Courses</NavLink></li>
                                <li><NavLink to="/">Courses List</NavLink></li>
                                <li><NavLink to="/">Courses Details</NavLink></li>
                            </ul>
                        </li>
                        {/* Links and dropdown for the Blogs  */}
                        <li>
                            <NavLink to="/blogs" className="desktop-link" style={{paddingRight: "0px"}}>Blogs</NavLink>
                            <input type="checkbox" id="show-blogs" />
                            <label htmlFor="show-blogs"><span className="hideNav">Blogs</span><FaAngleDown /></label>
                            <ul>
                                <li><NavLink to="/">Blogs</NavLink></li>
                                <li><NavLink to="/">Blogs Details</NavLink></li>
                            </ul>
                        </li>
                        {/* Link and Dropdown for pages  */}
                        <li>
                            <NavLink to="/pages" className="desktop-link" style={{paddingRight: "0px"}}>Pages</NavLink>
                            <input type="checkbox" id="show-pages" />
                            <label htmlFor="show-pages"><span className="hideNav">Pages</span><FaAngleDown /></label>
                            <ul>
                                <li><NavLink to="/">About</NavLink></li>
                                <li><NavLink to="/">Instructor</NavLink></li>
                                <li><NavLink to="/">Event Details</NavLink></li>
                                <li><NavLink to="/">My Dashboard</NavLink></li>
                                <li><NavLink to="/">Sign In</NavLink></li>
                                <li><NavLink to="/">Sign Up</NavLink></li>
                                <li><NavLink to="/">Courses</NavLink></li>
                            </ul>
                        </li>
                        {/* Link for the Contact Page  */}
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </div> 
                <div className="sign_toggler">
                    {/* Button for Login and Sign In Page  */}
                    <div className="sign">
                        <NavLink to="/login"><button type="button">Sign up</button></NavLink>
                    </div>

                    {/* Icon for the Navbar toggle */}
                    <label htmlFor="show-menu" className="menu-icon" onClick={Toggler}><FaBars /></label>            
                </div>   
            </nav>
        </div>   
    )
}

export default Navbar;