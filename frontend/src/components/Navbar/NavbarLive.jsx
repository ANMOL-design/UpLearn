import React from "react";
import Logo from "./../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

function NavbarLive(){
    return(
        <>
            <div className="wrapper">
            <nav>
                <div className="content">
                    <img src={Logo} alt="Logo" className="img_lg" />
                    <div className="logo">
                        <NavLink to="/nav">UpLearn</NavLink>
                    </div>
                </div>
                <div className="sign">
                    <NavLink to="/login"><button type="button">Login</button></NavLink>
                    <NavLink to="/register"><button type="button">Register</button></NavLink>
                </div>
            </nav>
        </div>   
        </>
    );
}

export default NavbarLive;