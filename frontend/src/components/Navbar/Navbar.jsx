import React from "react";
import { NavLink } from "react-router-dom";
import { FaSistrix, FaArrowRight, FaBars } from "react-icons/fa";


const Navbar = () => {
    return( 
        <div className="wrapper">
            <nav>
                <input type="checkbox" id="show-search" />
                <input type="checkbox" id="show-menu" />
                <label htmlFor="show-menu" className="menu-icon"><FaBars /></label>
                <div className="content">
                <div className="logo"><NavLink to="/">UpLearn</NavLink></div>
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
                        <a href="#" className="desktop-link">Services</a>
                        <input type="checkbox" id="show-services" />
                        <label for="show-services">Services</label>
                        <ul>
                        <li><a href="#">Drop Menu 1</a></li>
                        <li><a href="#">Drop Menu 2</a></li>
                        <li><a href="#">Drop Menu 3</a></li>
                        <li>
                            <a href="#" className="desktop-link">More Items</a>
                            <input type="checkbox" id="show-items" />
                            <label for="show-items">More Items</label>
                            <ul>
                            <li><a href="#">Sub Menu 1</a></li>
                            <li><a href="#">Sub Menu 2</a></li>
                            <li><a href="#">Sub Menu 3</a></li>
                            </ul>
                        </li>
                        </ul>
                    </li>
                    <li><a href="#">Feedback</a></li>
                    </ul>
                </div>
                <label for="show-search" className="search-icon"><FaSistrix /></label>
                <form action="#" className="search-box">
                    <input type="text" placeholder="Type Something to Search..." required />
                    <button type="submit" className="go-icon"><FaArrowRight /></button>
                </form>
            </nav>
        </div>    
    );
}

export default Navbar;