import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import LibraryHome from "./LibraryBooks";
import LibraryBanner from "./../../assets/images/Librarybanner.jpeg";
import axios from "axios";
import Loader from "../Loader";
var CryptoJS = require("crypto-js");

export default function LibraryPage() {

  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [User,SetUser] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const [Library, SetLibrary] = useState([]);
  const [inputbook, setinputbook] = useState('');

  const [books, setbooks] = useState({
    bookCategory: "",
    bookclass: ""
  });

  const handleChange = (event) => {
    setbooks({ ...books, [event.target.name]: event.target.value });
  };

  // Function to Present the Extra Slect option to filter out Data 
  const BOOKCHOICE = () => {
    if (books.bookCategory === "School") {
      return (
        <>
          <label htmlFor="bookclass">
            <b>Select Class</b><span className="star">*</span>
          </label>
          <select id="bookclass" name="bookclass"  
            value={books.bookclass}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
        </>
      );
    } 
    else if (books.bookCategory === "Exam") {
      return (
        <>
          <label htmlFor="bookclass1">
            <b>Select Exam</b><span className="star">*</span>
          </label>
          <select id="bookclass1" name="bookclass"
            value={books.bookclass}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Exam</option>
            <option value="JEE">JEE</option>
            <option value="NEET">NEET</option>
            <option value="CAT">CAT</option>
            <option value="GATE">GATE</option>
            <option value="UPSC">UPSC</option>
            <option value="OTHER">Other</option>
          </select>
        </>
      );
    }
  };


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

    // For Suggestions in Inputbox 
    const fetchBooks = async () =>{
      await axios.get("/librarybooks").then(response => {
        SetLibrary(response.data);
        setisLoading(false);
        })
        .catch(error => {
          console.log(error);
          navigate("/login");
        });
    }
    fetchBooks();
  }, [loginDetails.isLoggedIn]);


  const SearchTheBooks = () => { 
    console.log('Search by choice')
  }

  const SearchByChoice = () => {
    console.log('Search by choice')
  }

  if(isLoading){
    return(
      <Loader />
    )
  }

  else{
    return (
      <>
      <div className="lib-main-container">
        {/* Banner Image of Library  */}
        <div className="Library-banner">
          <img src={LibraryBanner} alt="Banner" />
        </div>
        {/* Main Content of Library  */}
        <div className="library-container">
          {/* Heading Library  */}
          <div className="library-heading">
            <h1>Uplearn Online Library</h1>
            <p>
              Here you get all NCERT books also Books for preparing Exams Like
              JEE,NEET,CAT,UPSC etc.
            </p>
          </div>
          {/* filter Out Function  */}
          <div className="library-filter-container">
              {/* Input Bar  */}
              <div className="librarySearch">
                <input list="library-search" 
                  name="librarySearch" 
                  placeholder="What are you looking for ?"
                  onChange={(e) => {setinputbook(e.target.value)}}
                />
                {
                  (Library.length > 0) ? 
                    <datalist id="library-search">
                      {Library.map((item) => (
                        <option value={item.bookName} />
                      ))}
                    </datalist>
                  : null
                }
                
                <button type="submit" onClick={SearchTheBooks}>
                    <i><MdSearch /></i> Search
                </button>
              </div>

              <div className="libraryChoice">
                {/* Choices  */}
                <label htmlFor="bookCategory">
                  <b>Select Book</b> <span className="star">*</span>
                </label>

                <input
                  type="radio"
                  id="School"
                  name="bookCategory"
                  value="School"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="School"> For School</label>

                <input
                  type="radio"
                  id="Exam"
                  name="bookCategory"
                  value="Exam"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="Exam"> For Competetive Exam</label>

                <div className="libraryChoice">
                  <BOOKCHOICE />
                  {/* Button to Filter  */}
                  {books.bookCategory ? <button onClick={SearchByChoice}>Filter</button> : null}                  
                </div>
              </div>
          </div>
          {/* Section Show all AvailableBooks  */}
          <div className="library-card-containerr">
              <LibraryHome id={User._id} user={User} input={inputbook} book={books}/>
          </div>
        </div>
      </div>
      </>
    );
  }
}
