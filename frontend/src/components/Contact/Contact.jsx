import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Contact() {
  const [User,SetUser] = useState({})
  useEffect(() => {
    const fetchdata = async () =>{
        const {data} = await axios.get("aboutStudents");
        SetUser(data)
    }
    fetchdata();
  }, [])
  console.log(User);
  return (
   <div>
    <div className="contact">
        <div className="contactContainer">
          <div className="contactWrapper">
    <div className="contactForm">
              <table cellSpacing={"30px"}>
                <tr>
                    <td width={"350px"}>
                    <form>
                <h1 className='contacthead'>Quick Contact</h1><br/>
                <h3 className='contact-subhead'>We're here to Help You</h3><br/>
              <div className="contactInput">
                  <label htmlFor="name">Full name</label>
                  <input
                    type="text"
                    id="fname"
                    placeholder="Full Name"
                    name="email"
                    value={User.name}
                  />
                </div>

                {/* The Email Input  */}
                <div className="contactInput">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                   value={User.email}
                  />
                </div>
                {/* Phone Number */}
                <div className="contactInput">
                  <label htmlFor="Phone No.">Phone no.</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone number"
                    name="tel"
                  />
                </div>
                {/*Message*/}

                <div className="contactInput">
                  <label htmlFor="Message">Message</label>
                  <textarea  className="contactInput"
                  placeholder="Message"
                  name="message" 
                  id="message" 
                  cols="60" 
                  rows="6"
                  line-height= "50px"
                  padding="0 15px"
                  font-size= "15px"
                  background= "#E8F0FE"
                  color= "$black"
                  outline= "none"
                  border-radius= "8px"
                  border= "none"
                  />
                </div>
                
                             
                {/* The Submit Button  */}
                <div>
                  <button type="button" className="submitBtn" >
                    Submit
                  </button>
                </div>
              </form>
                    </td>
                    <td className='left-td' >
                    <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"/>
                    <div className="left-side">
                        <div className="address details">
                        <i className="fas fa-map-marker-alt" />
                        <div className="topic">Address</div>
                        <div className="text-one">JMIT, Radaur</div>
                        <div className="text-two">Yamunanagar, Haryana</div>
                        </div>
                        <div className="phone details">
                        <i className="fas fa-phone-alt" />
                        <div className="topic">Phone</div>
                        <div className="text-one">+91 9876512345</div>
                        <div className="text-two">+91 9876543210</div>
                        </div>
                        <div className="email details">
                        <i className="fas fa-envelope" />
                        <div className="topic">Email</div>
                        <div className="text-one">uplearn@gmail.com</div>
                        <div className="text-two">info.uplearn@gmail.com</div>
                        </div>
                        </div>
                    </td>
                    </tr>
              </table>
            </div>
          </div>
      </div>
      </div>
      </div>
  

  )
}
