import React from "react";
import { FaCalendar, FaLaptop, FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

function DeliverResults(){

    return(

        <div className="deliver-outer-container">
            <div className="deliver-container-first">
                    <h1 className="deliver-header">What do we deliver?</h1>
                    <br/>
                    <p className="deliver-para">Check the latest work, schedules, classes,books and your favorite web technologies and techniques </p>
            </div>
            <div className="deliver-container-second">
            <div className="deliver-data">
                    <div className="deliver-icon">
                    <FaCalendar/>
                    </div>
                    <div className="deliver-icon-content">  
                    <span className="deliver-subheading">Learn on schedules</span>
                    <br/>
                    <p className="deliver-subpara">Your study schedule should not just be about studying! Plan a schedule of balanced activities</p> 
                    </div>
                </div>
                <div className="deliver-data">
                    <div className="deliver-icon">
                    <FaQuestion/>
                    </div>
                    <div className="deliver-icon-content">  
                    <span className="deliver-subheading">Get Answers to your Doubts</span>
                    <br/>
                    <p className="deliver-subpara">Your study schedule should not just be about studying! Plan a schedule of balanced activities</p>
                    </div> 
                </div>
                <div className="deliver-data">
                    <div className="deliver-icon">
                    <FaLaptop/>
                    </div>
                    <div className="deliver-icon-content">   
                     <span className="deliver-subheading">Learn latest Technolgy</span>
                     <br/>
                     <p className="deliver-subpara">Your study schedule should not just be about studying! Plan a schedule of balanced activities</p> 
                    </div>  
                </div>
            </div>

        </div>


    );


}

export default DeliverResults;