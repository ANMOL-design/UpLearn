import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
var CryptoJS = require("crypto-js");
export default function LibraryPreview() {
  const loginDetails = useSelector((state) => state.userReducers);
  const {id} = useParams();
  const navigate = useNavigate();
  const [User, SetUser] = useState({});
  const [myBook,setmyBook] = useState({})

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
       
      const fetchBook = async () =>{
  
               await axios.get("/previewLibary/"+id).then(response=>{
                setmyBook(response.data)
              
               }).catch((err)=>{
                console.log(err);
               })
             
         
      }
      fetchBook();
      console.log(myBook);

  }, [id] || [loginDetails.isLoggedIn]);

  console.log(myBook);
  return(
    <>
   
   <iframe src={myBook.BookPdf} width="100%" height="800px" style={{border:"none"}} allowFullScreen>
</iframe>
    </>
  )
}
