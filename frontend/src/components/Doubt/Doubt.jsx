import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { BiUser, BiTime } from "react-icons/bi";
import { HiThumbUp } from "react-icons/hi";
import { RiQuestionAnswerFill } from "react-icons/ri";
import axios from "axios";
import Loader from "../Loader";
import DoubtBanner from "../../assets/images/Ask-a-doubt-landing-banner.png";
var CryptoJS = require("crypto-js");

export default function Doubt() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  // states
  const [User, SetUser] = useState({});
  const [searchtext, setSearchtext] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [dfilter, setDFilter] = useState("");
  const [doubtData, setDoubtData] = useState({
    UserId: "",
    userName: "",
    Title: "",
    Subject: "",
    Description: "",
    Upvotes: [],
    CreatedAt: "",
    comments: [
      {
        userId: "",
        userName: "",
        comment: "",
        CreatedAt: "",
      },
    ],
  });
  const [bdoubtData, setbDoubtData] = useState({
    UserId: "",
    userName: "",
    Title: "",
    Subject: "",
    Description: "",
    Upvotes: [],
    CreatedAt: "",
    comments: [
      {
        userId: "",
        userName: "",
        comment: "",
        CreatedAt: "",
      },
    ],
  });
  // states end

  // useffects start
  useEffect(() => {
    window.scroll(0, 0);
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    // Check is  Login Or Not
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            SetUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            SetUser(response.data);
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

    // For Doubts fetching
    const fetchDoubts = async () => {
      await axios
        .get("/doubts_data")
        .then((response) => {
          setDoubtData(response.data);
          setbDoubtData(response.data);
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchDoubts();
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);
  // useffects end

  const handleask = () => {
    navigate("/post-doubt");
  };

  const handleCardClick = (id) => {
    navigate(`/ask-doubt/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const tempda = bdoubtData.filter((item) => {
      return (
        item.Title.toLowerCase().includes(searchtext.toLowerCase()) ||
        item.Subject.toLowerCase().includes(searchtext.toLowerCase())
      );
    });
    setDoubtData(tempda);
  };

  const handleDFilter = (e) => {
    let tempdaa = bdoubtData;
    if(e.target.value === "latest"){
      tempdaa.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());
    }
    else if(e.target.value === "likes"){
      tempdaa.sort((a, b) => b.Upvotes.length - a.Upvotes.length);
    }
    else{
      tempdaa = bdoubtData;
    }
    setDoubtData(tempdaa);
    setDFilter(e.target.value);
  }

  // main function start
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="doubt-container">
          {/* banner */}
          <div className="Doubt-banner">
            <img src={DoubtBanner} alt="Banner" />
          </div>

          {/* heading */}
          <div className="Doubt-heading">
            <h1>Uplearn Ask Doubt</h1>
            <p>
              Here you can clear your doubt and get the answer from the
              instructors.
            </p>
          </div>

          {/* search bar */}
          <div className="doubt-filter-container">
            <div className="DoubtSearch">
              <input
                list="doubt-search"
                name="DoubtSearch"
                placeholder="What are you looking for ?"
                value={searchtext}
                onChange={(e) => setSearchtext(e.target.value)}
              />
              <button onClick={handleSearch}>
                <i>
                  <MdSearch />
                </i>{" "}
                Search
              </button>
            </div>
          </div>

          {/* ask button */}
          <div className="askbutton">
            <select
              value={dfilter}
              onChange={handleDFilter}
            >
              <option value="">Filter Doubts</option>
              <option value="latest">Latest First</option>
              <option value="likes">Most Likes</option>
            </select>
            <button onClick={handleask}>Ask Your Doubt</button>
          </div>

          {/* main content */}
          <div className="doubt-body">
            <div className="doub-b-head">
              <h1> Doubts </h1>
            </div>
            {doubtData.length > 0 ? (
              doubtData.map((doubt) => {
                return (
                  <div
                    className="doubt-card"
                    key={doubt._id}
                    onClick={() => handleCardClick(doubt._id)}
                  >
                    <div className="doubt-card-header">{doubt.Title}</div>
                    <div className="doubt-card-body">
                      <div className="doubt-card-body-left">
                        Subject - {doubt.Subject}
                      </div>
                      <div className="doubt-card-body-right">
                        <span>
                          <HiThumbUp className="doub-ico" />{" "}
                          {doubt.Upvotes.length}
                        </span>
                        <span>
                          <RiQuestionAnswerFill className="doub-ico" />{" "}
                          {doubt.comments.length}
                        </span>
                      </div>
                    </div>
                    <div className="doubt-card-footer">
                      <div className="doubt-card-footer-left">
                        <span>
                          {" "}
                          <BiUser className="doub-ico" /> {doubt.userName}{" "}
                        </span>
                      </div>
                      <div className="doubt-card-footer-right">
                        <span>
                          {" "}
                          <BiTime className="doub-ico" />
                          {new Date(doubt.CreatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="doubt-card">
                <h1>No Doubts Available</h1>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
