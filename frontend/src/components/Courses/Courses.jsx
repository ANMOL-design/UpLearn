import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import data from "./CoursesCards.json";
import { AiFillStar} from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
 

function Courses(){
    useEffect(() => {
        window.scroll(0,0);
    }, [])
    return(
        <>
            {/* Banner Of the Courses  */}
            <div className="course-banner">
                
            </div>
            <div className="course-heading">
            <h1>Available Courses</h1>
            </div>
            {/* Cards Of The Course Page  */}
            <div className="course-cards-container" data-aos="fade-in">
                {data.map( (item) => {
                    return(
                       <div className="course-card-inner" key={item.id}>
                            <img src={item.image} alt="Product" />
                            <h3>{item.heading}</h3>
                            <h5>Instracutor: {item.instructor}</h5>
                            <p className="course-duration"> <AiFillClockCircle></AiFillClockCircle>{item.duration}hr</p>
                            <div><p className="course-price-free"  >Free</p></div>
                            <AiFillStar ></AiFillStar>
                            <Link to={item.Link}><button>{item.name}</button></Link>
                       </div>
                    )
                })}
          </div>
        </>
    );
}

export default Courses;