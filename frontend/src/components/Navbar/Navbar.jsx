import React from "react";
import { NavLink } from "react-router-dom";
import { FaSistrix, FaArrowRight, FaBars } from "react-icons/fa";
import Logo from "./../../assets/images/logo.png";

const Navbar = () => {
    return( 
        <div className="wrapper">
            <nav>
                <input type="checkbox" id="show-search" />
                <input type="checkbox" id="show-menu" />
                <label htmlFor="show-menu" className="menu-icon"><FaBars /></label>
                <div className="content">
                    <img src={Logo} alt="Logo" className="img_lg" />
                    <div className="logo">
                        <NavLink to="/">UpLearn</NavLink>
                    </div>
                    <ul className="links">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/login">About</NavLink></li>
                    <li>
                        <NavLink to="/" className="desktop-link">Features</NavLink>
                        <input type="checkbox" id="show-features" />
                        <label htmlFor="show-features">Features</label>
                        <ul>
                            <li><NavLink to="/">Drop Menu 1</NavLink></li>
                            <li><NavLink to="/">Drop Menu 2</NavLink></li>
                            <li><NavLink to="/">Drop Menu 3</NavLink></li>
                            <li><NavLink to="/">Drop Menu 4</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to="/" className="desktop-link">Services</NavLink>
                        <input type="checkbox" id="show-services" />
                        <label htmlFor="show-services">Services</label>
                        <ul>
                            <li><NavLink to="/">Drop Menu 1</NavLink></li>
                            <li><NavLink to="/">Drop Menu 2</NavLink></li>
                            <li><NavLink to="/">Drop Menu 3</NavLink></li>
                        <li>
                            <NavLink to="/" className="desktop-link">More Items</NavLink>
                            <input type="checkbox" id="show-items" />
                            <label htmlFor="show-items">More Items</label>
                            <ul>
                                <li><NavLink to="/">Sub Menu 1</NavLink></li>
                                <li><NavLink to="/">Sub Menu 2</NavLink></li>
                                <li><NavLink to="/">Sub Menu 3</NavLink></li>
                            </ul>
                        </li>
                        </ul>
                    </li>
                    <li><NavLink to="/">Feedback</NavLink></li>
                    </ul>
                </div>
                <label htmlFor="show-search" className="search-icon"><FaSistrix /></label>
                <form action="#"  className="search-box">
                    <input type="text" placeholder="Type Something to Search..." required />
                    <button type="button" className="go-icon"><FaArrowRight /></button>
                </form>
            </nav>
        </div>    
    );
}

export default Navbar;