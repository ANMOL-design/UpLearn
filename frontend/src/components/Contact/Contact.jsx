import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import contactPage from "../../assets/images/contactPage.jpg"
export default function Contact() {

  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  
  const [User,SetUser] = useState({});

  
  useEffect(() => {
    window.scroll(0,0);
    // Check is  Login Or Not 
    if(loginDetails.isLoggedIn=true){
        // call the fetch admin detail function 
        const fetchdata = async () =>{
            await axios.get("/aboutStudents").then(response => {
              SetUser(response.data);
              })
              .catch(error => {
                console.log(error);
                navigate("/login");
              });
        }
        fetchdata();
    }
    // If User is not login redirect to login 
    else{
        navigate("/login");
    }
}, [loginDetails.isLoggedIn])

// set State for fields
const [contact,setContact] = useState({
  phoneNo:"",message:""
})

let name , value; 
// Handle input Value
const  handleInput = async (e)=>{
    name = e.target.name;
    value = e.target.value;
    setContact({...contact , [name]:value})
}
  const postData =async (e)=>{
      e.preventDefault();
      const {phoneNo,message} = contact;
      const name = User.name;
      const email = User.email
      const res =  await fetch("/contactus" ,{
          method : "POST",
          headers : { 
              "content-Type" : "application/json"
          },
          body : JSON.stringify({
              name,email,phoneNo,message
          })
  });

 

  if(res.status === 201){
      window.alert("Your query is succesfully registered our expert team will reply you soon.");
      navigate('/', { replace: true });
  }
  else {
      window.alert("Error occured , try again")
  }
}


  return (
    <>
      <div className="contact">
        <div className="contactContainer">
          <div className="contactWrapper">
            <div className="contactForm">
              <table >
                <tr className='row-container'>
                  <td className='contactct-form' width={"500px"}>
                    <form>
                <h1 className='contacthead'>Quick Contact</h1><br/>
                <h3 className='contact-subhead'>We're here to Help You</h3><br/>
              <div className="contactInput">
                  <label htmlFor="name">Full name</label>
                  <input
                    type="text"
                    id="fname"
                    placeholder="Full Name"
                    name="name"
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
                    name="phoneNo"
                    value={contact.phoneNo} 
                    onChange={handleInput}
                  />
                </div>
                {/*Message*/}

                <div className="contactInput">
                  <label htmlFor="Message">Message</label>
                  <textarea  className="contactInput-ta"
                  placeholder="Message"
                  name="message" 
                  id="message" 
                  cols="45" 
                  rows="6"
                  value={contact.subject}
                   onChange={handleInput}
                  />
                </div>
                
                             
                {/* The Submit Button  */}
                <div>
                  <button type="button" onClick={postData} className="submitBtn" >
                    Submit
                  </button>
                </div>
              </form>
                    </td>
                    <td className='left-td' >
                      <img className="contact-img" src={contactPage}/>
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
                        <div className="text-one">uplearnforsih@gmail.com</div>
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
    </>
  )
}
