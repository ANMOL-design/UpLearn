import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Document, Page } from 'react-pdf';
var CryptoJS = require("crypto-js");
export default function LibraryPreview() {
  const loginDetails = useSelector((state) => state.userReducers);
  const {id} = useParams();
  const navigate = useNavigate();
  const [User, SetUser] = useState({});
  const [myBook,setmyBook] = useState({})
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
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
    <Document file={myBook.BookPdf} onLoadSuccess={onDocumentLoadSuccess}>
        
      </Document>
   <iframe src={myBook.BookPdf} width="100%" height="800px" style={{border:"none"}} allowFullScreen>
</iframe>
    
{/* <div style="position:absolute;right:50px;top:0px;width:27%">
  <h1>Supercharge your PDFs!</h1>
  <b>FlowPaper lite</b> is a compact version of the widely used and popular FlowPaper PDF flipbook viewer. Its free to use and an iframe is all you need! Just change its src attribute and point the last part to a PDF you want to display, like so: <pre>&lt;iframe src="http://flipbook.flowpaper.com/[URL to PDF file]"&gt;</pre>
  <br/><br/>
  For more information FlowPaper please see <a href="https://flowpaper.com" target="_new">https://flowpaper.com</a>
</div> */}

    </>
  )
}
