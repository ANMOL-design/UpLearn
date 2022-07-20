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
                <p>A community of lifelong learners, responsible global citizens, and champions of our own success.
                    A learning community dedicated to building respectful and responsible citizens and empowering all learners.
                    Being involved in education dedicatedly is a good meditation for years.
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