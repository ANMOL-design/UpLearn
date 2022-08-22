import React from "react";
import { Link } from "react-router-dom";
import Svg1 from "../../assets/images/svg1.jpg"

function BelowHome(){

            return(
                <div className="home-head-container">
                <div className="home-quote">
                  <p>
                    The beautiful thing about learning is that nobody can take it away from
                    you
                  </p>
                  <h5>
                    Education is the process of facilitating learning, or the acquisition of
                    knowledge, skills, values, beliefs, and habits. Educational methods
                    include teaching, training, storytelling, discussion and directed
                    research!
                  </h5>
                </div>
                <div className="svg-image">
                  <img src={Svg1} alt="svg" />
                </div>
              </div>

            );
}
export default BelowHome;