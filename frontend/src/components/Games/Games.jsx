import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "./GamesCards.json";
import axios from 'axios';
import { useSelector } from "react-redux";

function Games(){

    let navigate = useNavigate();
    const [adminInfo, setadminInfo] = useState('');
    const adminstatus = useSelector((state) => state.AdminReducers);

    useEffect(() => {
        window.scroll(0,0);
        // Check is Admin Login Or Not 
        if(Number(adminstatus.isAdminLoggedIn)){
            // call the fetch admin detail function 
            const fetchdata = async () =>{
                await axios.get("/").then(response => {
                    setadminInfo(response.data);
                  })
                  .catch(error => {
                    console.log(error);
                    navigate("/");
                  });
            }
            fetchdata();
        }
        // If User is not login redirect to login 
        else{
            navigate("/");
        }
    }, [adminstatus.isAdminLoggedIn, navigate])

    console.log(adminInfo)

    return(
        <div>
            {/* Banner Of the Admin Page  */}
            <div className="games-banner">
            </div>
            <div className="games-header"><h1>Games</h1></div>
            {/* Cards Of The Game Page  */}
          <div className="body-games">
          <div className="container-game">
          {data.map( (item) => {
            return(
            <div className="card-game" key={item.id}>
                <div className="image-game">
                <img src={item.image} alt="game-img" />
                </div>
                <div className="content-game">
                <h3>{item.heading}</h3>
                <p>{item.desc}</p>
                <Link to={item.Link}><button>Play Now</button></Link>
                </div>
            </div>)
            })}
            </div>
            </div>

        </div>
    );
}

export default Games;