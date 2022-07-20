import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import data from "./AdminCards.json";

function AdminHome(){
    useEffect(() => {
        window.scroll(0,0);
    }, [])
    return(
        <>
            {/* Banner Of the Admin Page  */}
            <div className="admin-banner">
                <h1>Admin Portal</h1>
                <p>
                    With hundreds of academic resources, quizzes, tests, video lectures and more, pertaining 
                    to educational boards pan India, UpLearn offers a first-of-its-kind platform that brings together 
                    a community of learners and instructors in the pursuit of quality education, right at their fingertips!
                </p>
            </div>
            {/* Cards Of The Admin Page  */}
            <div className="admin-cards-container" data-aos="fade-in">
                {data.map( (item) => {
                    return(
                       <div className="admin-card-inner" key={item.id}>
                            <img src={item.image} alt="Product" />
                            <h3>{item.heading}</h3>
                            <p>{item.title}</p>
                            <Link to={item.Link}><button>{item.name}</button></Link>
                       </div>
                    )
                })}
          </div>
        </>
    );
}

export default AdminHome;