import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import RegisterStudent from "./RegisterStudent";

export default function VolunteersDashBoard (){
    const [articleShow, setarticleShow] = useState(true);
    const [videoShow, setvideoShow] = useState(false);
    const [quizShow, setquizShow] = useState(false);
    const [CertificateShow, setCertificateShow] = useState(false);
    const handleArticleShow = () => {
        setarticleShow(true);
        setvideoShow(false);
        setquizShow(false);
        setCertificateShow(false);
      };
    
      const handleVideoShow = () => {
        setarticleShow(false);
        setvideoShow(true);
        setquizShow(false);
        setCertificateShow(false);
      };
    
      const handleQuizShow = () => {
        setarticleShow(false);
        setvideoShow(false);
        setquizShow(true);
        setCertificateShow(false);
      };
    
      const handleCertificateShow = () => {
        setarticleShow(false);
        setvideoShow(false);
        setquizShow(false);
        setCertificateShow(true);
      };
      return (
        <>
          {/* This Link Heading to return back  */}
          <div className="add-course-header">
            <Link to="/courses">
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>
          {/* The Linker Page to navigate the components  */}
          <div className="course-content-navbar">
            {/* <h1>{courseData.title}</h1> */}
            {/* Buttons to make video, text and quiz visible at different time  */}
            <div className="edit-course-container-btnchanger">
              <button
                onClick={handleArticleShow}
                className={articleShow ? "bt-active" : ""}
              >
               Register Student
              </button>
              <button
                onClick={handleVideoShow}
                className={videoShow ? "bt-active" : ""}
              >
                View Participants
              </button>
              {/* <button
                onClick={handleQuizShow}
                className={quizShow ? "bt-active" : ""}
              >
                Quiz
              </button>

              <button
                onClick={handleCertificateShow}
                className={CertificateShow ? "bt-active" : ""}
              >
                Certificate
              </button> */}
            </div>
          </div>

          {/* Showing Article if Article is Active  */}
          {articleShow && <RegisterStudent/>}

          {/* Showing Video if Video is Active  */}
          {videoShow}

          {/* Showing Quiz if Quiz is Active  */}
          {quizShow}

          {/* Showing Certificate if Certificate is Active  */}
          {CertificateShow}
        </>
      );
}