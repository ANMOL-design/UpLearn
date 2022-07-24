import React, {useState} from "react";
import Logo from "./../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { BsTwitter, BsYoutube, BsFacebook } from "react-icons/bs";

function Footer(){

    const [user, setuser] = useState("");
   
    // Function to validate email 
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    // Adding Data to Backend
    const postData = async ( e_success, e_fail) => {
        
        const email = user;
         const res =  await fetch("/SubscriberRegister" ,{
             method : "POST",
             headers : { 
                 "content-Type" : "application/json"
             },
             body : JSON.stringify({
                 email
             })
         } );
         
         if(res.status === 200){
            e_success.style.display = 'block';
            e_fail.style.display = 'none';
         }
         else if(res.status === 422){
                e_success.style.display = 'none';
                e_fail.style.display = 'block';
                e_fail.innerHTML= 'Already Subscribed';
         }
         else{
                e_success.style.display = 'none';
                e_fail.style.display = 'block';
                e_fail.innerHTML= 'Internal Server Error, Try Again!';
         }
     }
     
    const handleSubscribe = () => {
        const email = validateEmail(user); // Validate the Email
        const e_success = document.getElementById('foo-success'); // get Element by ID
        const e_fail = document.getElementById('foo-fail'); // get Element by ID
   
        // Send Email if email exist
        if(email){
           
            const login = localStorage.getItem("isLoggedIn");
            const student = localStorage.getItem("Work");
            if( login && student === 'SDTTE UN '){
                // Make the API CALL Here 
                postData(e_success,e_fail);           
            }
            else if( login && student === 'TCREH AE '){
                e_success.style.display = 'none';
                e_fail.style.display = 'block';
                e_fail.innerHTML= 'Subscription Is For Students Only';
            }
            else{
                e_success.style.display = 'none';
                e_fail.style.display = 'block';
                e_fail.innerHTML= 'Please Login First to Subscribe UpLearn';
            }
        }
        // Dont Send Email if email exist
        else{
            e_success.style.display = 'none';
            e_fail.style.display = 'block';
            e_fail.innerHTML= 'Please Enter A Valid Email ID';
        }
    }
    return(
        <>
            <div className="foo">
                <div className="foo-container">
                    {/* The container 1 contain site Link  */}
                    <div className="foo-brand">
                        <div>
                            <img src={Logo} alt="Logo" className="logo_ig" /> 
                            <h1>UpLearn</h1>
                        </div>
                        <p>Great lesson ideas and lesson plans for ESL teachers! 
                            Educators can customize lesson plans to best.
                        </p>
                        <span>
                            <a href="google.com" rel="nofollow" to="_blank"><BsFacebook /></a>
                            <a href="google.com" rel="nofollow" to="_blank"><BsTwitter /></a> 
                            <a href="google.com" rel="nofollow" to="_blank"><BsYoutube /></a> 
                        </span>
                    </div>
                    {/* The container 2 contain site Link  */}
                    <div className="foo-feature">
                        <h2>Features</h2>
                        <Link to="/">About</Link>
                        <Link to="/">Courses</Link>
                        <Link to="/">Events</Link>
                        <Link to="/">Instructor</Link>
                        <Link to="/">Career</Link>
                        <Link to="/">Become a Teacher</Link>
                        <Link to="/">Contact</Link>
                    </div>
                    {/* The container 3 contain site Link  */}
                    <div  className="foo-platform">
                        <h2>Platform</h2>
                        <Link to="/">Ask Doubts</Link>
                        <Link to="/">Library</Link>
                        <Link to="/">Courses</Link>
                        <Link to="/">News &amp; Blogs</Link>
                        <Link to="/">FAQs</Link>
                        <Link to="/">Tutorials</Link>
                    </div>
                    {/* The container 3 contain site Link  */}
                    <div  className="foo-Subscribe">
                        <h2>Subscribe</h2>
                        <div>
                            <input type="email" 
                                name="subscribe" 
                                id="subscribe" 
                                placeholder="Your email address" 
                                onChange={(e) => {setuser(e.target.value)}}
                            />
                            <span onClick={handleSubscribe}><FiArrowRight /></span>
                        </div>
                        <span id="foo-success">"Successful Subscribe To UpLearn"</span>
                        <span id="foo-fail"></span>
                        <span>Get the latest news and updates right at your inbox.</span>
                    </div>
                </div>
            </div>
            {/* Footer Bottom  */}
            <div className="foo-bottom">
                <p>© 2022 UpLearn, All Rights Reserved. Design By JM_ClashWithCode</p>
            </div>
        </>
    )
}

export default Footer;