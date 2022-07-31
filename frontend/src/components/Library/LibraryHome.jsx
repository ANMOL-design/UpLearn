import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import LibraryHome from "./LibraryBooks";
import LibraryBanner from "./../../assets/images/Librarybanner.jpeg";
import axios from "axios";
var CryptoJS = require("crypto-js");

export default function LibraryPage() {

  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [User,SetUser] = useState({});

  const [Library, SetLibrary] = useState({});
  const [books, setbooks] = useState({
    bookCategory: "",
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
            Select Class<span className="star">*</span>
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
            Select Exam<span className="star">*</span>
          </label>
          <select id="bookclass1" name="bookclass"
            value={books.bookclass}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Exam</option>
            <option value="JEE">Jee</option>
            <option value="NEET">Neet</option>
            <option value="CAT">Cat</option>
            <option value="GATE">Gate</option>
            <option value="UPSC">Upsc</option>
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
        console.log(response.data)
        SetLibrary(response.data);
        console.log(books, Library, User)
        })
        .catch(error => {
          console.log(error);
          navigate("/login");
        });
    }
    fetchBooks();
  }, [loginDetails.isLoggedIn]);

  console.log(books, Library, User)


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
          <div className="library-search-bar">
            {/* Input Bar  */}
            <input list="library-search" name="librarySearch" />
            {
              // (Library) ? 
              //   <datalist id="library-search">
              //     {/* {Library.map((item) => (
              //       <option value={item.bookName} />
              //     ))} */}
              //   </datalist>
              // : null
            }
            
            <button type="submit">
              <MdSearch />
            </button>

            {/* Choices  */}
            <label htmlFor="bookCategory">
              Choose <span className="star">*</span>
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

            <BOOKCHOICE />
            {/* Button to Filter  */}
            <button>Filter</button>
          </div>
        </div>
        {/* Section Show all AvailableBooks  */}
        <div className="library-card-containerr">
            <LibraryHome/>
        </div>
      </div>
    </div>
    </>
  );
}
