import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import SunEditor from "suneditor-react";

export default function InstructorEditContent(){
  let navigate = useNavigate();
 
  const {id} =useParams();
  console.log(id);
  const [course, setCourse] = useState({});
  useEffect(() => {
    window.scroll(0, 120);
    const fetchcourse = async () => {
      await axios
        .get("/Instructorcourse/"+id)
        .then((response) => {
          console.log(response.data[0]);
          setCourse(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchcourse();
  
  }, []);
  const [COURSE, SETCOURSE] = useState({
    title: course.title,
    VideoContentTitle : "" 
   
  });
 
  const handlechange = (e) => {
    SETCOURSE({ ...COURSE, [e.target.name]: e.target.value });
  };

  const [Video,setVideo] = useState("");
  const [VideoData,setVideoData] = useState("");
  function validatevideo(e) {
    setVideo(e.target.files[0].name);
    setVideoData(e.target.files[0]);
  }
  const addvideobtn = ()=>{
document.getElementById("video-form-container").style.display="block";
  }
  const closevideomodal = ()=>{
document.getElementById("video-form-container").style.display="none";
  }
  console.log(course.title);
  console.log(COURSE);
    return(
        <>
       <div className="edit-course-container">
         <div className="coursecontent-header">
          <h1>Add Content</h1>
         </div>
        
          <div className="add-course-Input">
          <label htmlFor="contenttitle">Title :</label>
              <input type="text" Value={course.title}  name="title" onChange={(e)=>handlechange(e)} id="contenttitle"/>
              </div>
           <div className="add-content-byn-container">
            <div className="add-video">
              <button onClick={addvideobtn}>Add video Content</button>
            </div>
              <div className="video-form-container" id="video-form-container">
                
                  <button onClick={closevideomodal}>cut</button>
                  <input type="text" value={COURSE.VideoContentTitle} name="VideoContentTitle" onChange={(e)=>{e.handlechange(e)}} id="videoTitle" /> <br />
                  <label htmlFor="courseVideo">
                  Video <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    id="courseVideo"
                    className="courseVideo"
                    // className="bookPdf"
                    accept="video/*"
                    onChange={(e) => {
                      validatevideo(e);
                    }}
                  />
                   <button>Submit</button>
              </div>
           </div>
              
     
       </div>
        </>
    )

}