import React from "react";
import { Link } from "react-router-dom";

function Home(){
    return(
        <>
            <div className="home-container">
                <h1>Home Component</h1>
                <Link to='/uplearn-virtual-library'>Library</Link>
                <br /><br />
                <Link to='/learn-with-fun'>Games</Link>
                <br /><br />
                <Link to='/studentdashboard'>Student Dashboard</Link>
                <br /><br />
                <Link to='/instructordashboard'>Instructor Dashboard</Link>
            </div>
        </>
    )
}

export default Home;