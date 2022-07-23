import React, {useState} from "react";
import Logo from "./../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { BsTwitter, BsYoutube, BsFacebook } from "react-icons/bs";
import { useSelector } from "react-redux";

function Footer(){

    const [user, setuser] = useState('');
    const loginDetails = useSelector((state) => state.userReducers);
    console.log(loginDetails)
    // Function to validate email 
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const handleSubscribe = () => {
        const email = validateEmail(user); // Validate the Email

        const e_success = document.getElementById('foo-success'); // get Element by ID
        const e_fail = document.getElementById('foo-fail'); // get Element by ID

        // Send Email if email exist
        if(email){
            if( loginDetails.isLoggedIn === 'true' && loginDetails.userRole === 'SDTTE UN '){
                // Make the API CALL Here 
                console.log('Success')

                e_success.style.display = 'block';
                e_fail.style.display = 'none';
            }
        }
        // Dont Send Email if email exist
        else{
            e_success.style.display = 'none';
            e_fail.style.display = 'block';
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
                            <input type="text" 
                                name="subscribe" 
                                id="subscribe" 
                                placeholder="Your email address" 
                                onChange={(e) => {setuser(e.target.value)}}
                            />
                            <span onClick={handleSubscribe}><FiArrowRight /></span>
                        </div>
                        <span id="foo-success">"Successful Subscribe To UpLearn"</span>
                        <span id="foo-fail">"Something went wrong" <br />(Note: Teachers can't Subscribe)</span>
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