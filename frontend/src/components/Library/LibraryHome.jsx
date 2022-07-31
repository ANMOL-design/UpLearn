import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSearch,MdLibraryAdd } from "react-icons/md";
import LibraryHome from "./LibraryBooks";
export default function LibraryPage() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [Library, SetLibrary] = useState([]);
  const [BOOKS, setBOOks] = useState({
    bookCategory: "",
  });
  const handleChange = (event) => {
    setBOOks({ ...BOOKS, [event.target.name]: event.target.value });
  };
  const BOOKCHOICE = () => {
    if (BOOKS.bookCategory === "School") {
      return (
        <>
          <label htmlFor="bookclass">
            Select Class<span className="star">*</span>
          </label>
          <select id="bookclass" name="bookclass">
            <option disabled value="">
              Select class:
            </option>
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
    } else if (BOOKS.bookCategory === "Exam") {
      return (
        <>
          <label htmlFor="bookclass1">
            Select Exam<span className="star">*</span>
          </label>
          <select
            id="bookclass1"
            name="bookclass"
            value={BOOKS.bookclass}
            onChange={(e) => handleChange(e)}
          >
            <option value="" disabled>
              Select Exam:
            </option>
            <option value="Jee">Jee</option>
            <option value="Neet">Neet</option>
            <option value="Cat">Cat</option>
            <option value="Gate">Gate</option>
            <option value="Upsc">Upsc</option>
            <option value="Other">Other</option>
          </select>
        </>
      );
    }
  };

  useEffect(() => {
    window.scroll(0, 120);
    // Check is  Login Or Not
    if (Number(loginDetails.isLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/librarybooks")
          .then((response) => {
            SetLibrary(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    }
    // If User is not login redirect to login
    else {
      navigate("/login");
    }
  }, [loginDetails.isLoggedIn]);
  return (
    <>
    <div className="lib-main-container">
      <div className="Library-banner"></div>
      <div className="library-container">
        <div className="library-heading">
          <h1>Uplearn Online Library</h1>
          <p>
            Here you get all Ncert books also Books for preparing Exams Like
            Jee,Neet,Cat,Upsc etc.
          </p>
        </div>
        <div className="library-filter-container">
          <div className="library-search-bar">
            <input list="library-search" name="librarySearch" />
            <datalist id="library-search">
              {Library.map((item) => (
                <option value={item.bookName} />
              ))}
            </datalist>
            <button type="submit">
              <MdSearch />
            </button>
            <label htmlFor="bookCategory">
              Choose <span className="star">*</span>
            </label>{" "}
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
            <button>Filter</button>
          </div>
        </div>

        <div className="library-card-containerr">
            <LibraryHome/>
        </div>
      </div>
      </div>
    </>
  );
}
