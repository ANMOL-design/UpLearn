import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AboutBanner from "../../assets/images/SIH2022-white-logo.png";
import About2img from "../../assets/images/about2img.png"
var CryptoJS = require("crypto-js");

export default function Contact() {

  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  
  const [User,SetUser] = useState({});
  const [invalid, setinvalid] = useState('');
  
  useEffect(() => {
    window.scroll(0, 120);
    // Decrypting the User Role
    if(loginDetails.userRole !== ''){
      var bytes = CryptoJS.AES.decrypt(loginDetails.userRole, 'my-secret-key@123');
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    // Check is  Login Or Not 
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") 
    {
      // call the fetch admin detail function 
      const fetchdata = async () =>{
        await axios.get("/aboutInstructor").then(response => {
          SetUser(response.data);
          })
          .catch(error => {
            console.log(error);
            navigate("/login");
          });
      }
      fetchdata();
    }
    else if((Number(loginDetails.isLoggedIn) && role === "STUDENT")){
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

  return (
    <>
  
        <div>
          <img className='about-banner' src={AboutBanner} alt="bg-img" />
        </div>
        <div className="about-header">
          <h1>About Us</h1>
        </div>
        <div className="parallel-boxes">
          <table>
            <tr>
                <td className="left-td">
                    
                      <h2>What is UpLearn?</h2>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    
                </td><td className="right-td">
                    <img className="about2img" src={About2img} alt='img' height="300px"></img>
                </td>        
            </tr>
          </table>
        </div>
        <div className="lower-parallel-boxes">
        <table>
            <tr>
                <td className="lower-left-td">
                    
                      <h2>Purpose</h2>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    
                </td><td className="lower-right-td">
                    <h2>Scope</h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </td>        
            </tr>
          </table>
        </div>

    </>
  )
}
