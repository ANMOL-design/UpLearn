import React from "react";
import { Link } from "react-router-dom";
import BelowHome from "./BelowHome";
// import FeaturesHome from "./FeaturesHome";
import StatsCounter from "./StatsCounter";
import StudentInstructorCard from "./StudentInstructorCard";
import DeliverResults from "./DeliverResults";
import FeaturesHome from "./FeaturesHome";

function Home() {
  // return(
  //     <>
  //         <div className="home-container">
  //             <h1>Home Component</h1>
  //             <Link to='/uplearn-virtual-library'>Library</Link>
  //             <br /><br />
  //             <Link to='/learn-with-fun'>Games</Link>
  //             <br /><br />
  //             <Link to='/studentdashboard'>Student Dashboard</Link>
  //             <br /><br />
  //             <Link to='/instructordashboard'>Instructor Dashboard</Link>
  //         </div>
  //     </>
  // )
  return (
    <>
      <div className="home-container">
        <div className="untitled">
          <div className="untitled__slides">
            <div className="untitled__slide">
              <div className="untitled__slideBg" />
              <Link to="/"></Link>
            </div>
          </div>
          <div className="untitled__slide">
            <Link to="/ask-doubt">
              <div className="untitled__slideBg" />
            </Link>
          </div>
          <div className="untitled__slide">
            <Link to="/Learn-with-fun">
              <div className="untitled__slideBg" />
            </Link>
          </div>
          <div className="untitled__slide">
            <Link to="/Learn-with-fun">
              <div className="untitled__slideBg" />
            </Link>
          </div>
          <div className="untitled__shutters" />
        </div>
      </div>

      <BelowHome />
      <StatsCounter />
      {/* <FeaturesHome /> */}
      <StudentInstructorCard />
      <DeliverResults />
    </>
  );
}

export default Home;
