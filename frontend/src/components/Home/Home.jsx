import React from "react";
import { Link } from "react-router-dom";

function Home(){
    return(
        <>
            <div className="home-container">
                <h1>Home Component</h1>
                <Link to='/uplearn-virtual-library'>Library</Link>
                <br /><br />
                <Link to='/play-games'>Games</Link>
            </div>
        </>
    )
}

export default Home;