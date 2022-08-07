import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import SunEditor from "suneditor-react";
import Loader from "../../../../assets/images/progressbar.gif";
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
    VideoContentTitle : "" ,
    ArticleTitle:""
   
  });
  const [Description,setDescription] = useState("");
  const handleEditorChange = (content) => {
    setDescription(content);
  };
  const handleChange = (e) => {
    SETCOURSE({ ...COURSE, [e.target.name]: e.target.value });
  };
  const [err, seterr] = useState("");
  const [Video,setVideo] = useState("");
  const [VideoData,setVideoData] = useState("");
  let course_video ="";
  function validatevideo(e) {
    setVideo(e.target.files[0].name);
    setVideoData(e.target.files[0]);
  }
  const addvideobtn = ()=>{
document.getElementById("video-form-container").style.display="block";
document.getElementById("article-modal-container").style.display="none";
  }
  const addAticleBtn = ()=>{
document.getElementById("article-modal-container").style.display="block";
document.getElementById("video-form-container").style.display="none";
  }
  const closevideomodal = ()=>{
document.getElementById("video-form-container").style.display="none";
  }
  const closeArticleModal = ()=>{
document.getElementById("article-modal-container").style.display="none";
  }
  console.log(course.title);
  console.log(COURSE);
  const handleVideoValidation = () => {
    if (
     !COURSE.VideoContentTitle ||
     !Video
    ) 
    {
      seterr("Please Enter all required Fields.");
      return false;
    } 
    else if (Video === "") {
      seterr("Please Upload Video.");
      return false;
    } 
    return true;
  };
  const handleArticleValidation= () => {
    if (
     !COURSE.ArticleTitle ||
     !Description
    ) 
    {
      seterr("Please Enter all required Fields.");
      return false;
    } 
    
    return true;
  };
  const submitVideo = async (image, imageData) => {

    if (image === "") {
      window.alert("Please Upload an Image.");
    } 
    else {
      const formData = new FormData();
      formData.append("image", imageData);

      fetch(`/upload_image`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } 
          else {
           
             course_video = data.image.image;
          }
          
        });
    }
  };
  const postVideo = async () => {
    const VideoLecture = course_video;
    const {VideoContentTitle} = COURSE;
    console.log(VideoLecture);
    const Id = id;
    console.log(Id);
    console.log(VideoContentTitle);
    const res = await fetch("/addVideoToCourse", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
       VideoLecture,VideoContentTitle,Id
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Lecture Added to Course");
      navigate("/instructordashboard/My_courses");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };
  const postArticle = async () => {
    const ArticleContent = Description;
    const {ArticleTitle} = COURSE;
    const Id = id;
    const res = await fetch("/addArticleToCourse", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
       ArticleTitle,ArticleContent,Id
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Lecture Added to Course");
      navigate("/instructordashboard/My_courses");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };

  const time = 10000;
  function sendVideo () {
    setTimeout(function () {
    if(course_video==''){
       sendVideo();
    }
    else{
    postVideo();
    }
  }, time);
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleVideoValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addVideoBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

      // Send video cloud
      await submitVideo(Video,VideoData);

      // Send Data to Backend after 10 sec
      sendVideo();
    }
  };

  function sendArticle () {
    setTimeout(function () {
    if(Description==''){
       sendArticle();
    }
    else{
    postArticle();
    }
  }, 3000);
}
  const handleArticleSubmit= async (event) => {
    event.preventDefault();
    const submit = handleArticleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addArtiCleBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";



      // Send Data to Backend after 10 sec
      sendArticle();
    }
  };
    return(
        <>
       <div className="edit-course-container">
         <div className="coursecontent-header">
          <h1>Add Content</h1>
         </div>
        
          <div className="add-course-Input">
          <label htmlFor="contenttitle">Title :</label>
              <input type="text" Value={course.title}  name="title" onChange={(e)=>handleChange(e)} id="contenttitle"/>
              </div>
           <div className="add-content-byn-container">
            <div className="add-video">
              <button onClick={addvideobtn}>Add video Content</button>
            </div>
              <div className="video-form-container" id="video-form-container">
                
                  <button onClick={closevideomodal}>cut</button>
                  <input type="text"   Value={COURSE.VideoContentTitle} name="VideoContentTitle" onChange={(e)=>handleChange(e)}  /> <br />
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
                   <div>
                  <img src={Loader} alt="Loader" id="loader-reg" />
                  <p className="uploadphoto">{err}</p>
                </div>
                <div className="submit-btn">
                  <input
                    type="submit"
                    id="addVideoBtn"
                    className="addBtn"
                    onClick={handleSubmit}
                    value="Add Lecture"
                  />
                </div>
              </div>
           </div>
              <div className="add-text-content-container">
                  <button className="add-article-btn"  onClick={addAticleBtn}>Add Articles</button>
              </div>
            <div className="article-modal-container" id="article-modal-container">
               <button onClick={closeArticleModal}>cut</button>
                 <div className="add-course-Input">
                  <label htmlFor="ArticleTitle">Article Title</label>
                  <input type="text" Value={COURSE.ArticleTitle}  name="ArticleTitle" onChange={(e)=>handleChange(e)} id="ArticleTitle"/>
                 </div>
                 <div className="add-course-Input">
                <label htmlFor="Description">Description :</label>
                <SunEditor
                  // setContents="My contents"
                  onChange={handleEditorChange}
                  required
                  showToolbar={true}
                  setOptions={{
                    buttonList: [
                      [
                        "undo",
                        "redo",
                        "font",
                        "fontSize",
                        "formatBlock",
                        "paragraphStyle",
                        "blockquote",
                        "bold",
                        "underline",
                        "italic",
                        "subscript",
                        "superscript",
                        "hiliteColor",
                        "textStyle",
                        "align",
                        "table",
                        "horizontalRule",
                        "list",
                        "lineHeight",
                        "image",
                        // "math",
                        // ,
                        // You must add the 'katex' library at options to use the 'math' plugin.
                        /** 'imageGallery', */ // You must add the "imageGalleryUrl".
                        // "fullScreen",
                        // "showBlocks",
                        // "codeView",
                        // "preview",
                        // "print",
                        // "save",
                        // "template",
                      ],
                    ],
                  }}
                />
              </div>
              <img src={Loader} alt="Loader" id="loader-reg" />
                  <p className="uploadphoto">{err}</p>
              <input
                    type="submit"
                    id="addArtiCleBtn"
                    className="addBtn"
                    onClick={handleArticleSubmit}
                    value="Add Article"
                  />
                   
            </div>
       </div>
        </>
    )

}