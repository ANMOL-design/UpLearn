import { useEffect, useRef, useState } from 'react';
import { MdVideoLibrary } from 'react-icons/md';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { GoMute, GoUnmute } from 'react-icons/go';
import useVideoPlayer from "../../hooks/videoplayer";
import Loader from '../../Loader';
import CourseVideo from './courseVideos';
export default function VideosContent(props){
  let VideoContent="";
   VideoContent = props.videos;
    console.log(VideoContent);
 let i=0;
 const videoElement = useRef(null);

const [curentVideo,setCurrentVideo] = useState(VideoContent.courseVideoContent[0]);
  const playcurrentvideo =(item)=>{
    setCurrentVideo(item)
  }
  console.log(curentVideo);
  if(VideoContent){
    if(VideoContent.courseVideoContent.length>0){
    return(
      <>
      <div className="video-content-container" id="video-content-container">
       <ul >
           {VideoContent.courseVideoContent.map((item=>(
               <>
               <div className='video-list-container'>  
               {console.log(item)}
               <li onClick={()=>playcurrentvideo(item)} id={'video-content-display'+item._id} className="video-content-display-list">{"1."+ ++i +" "+item.VideoContentTitle} <span><MdVideoLibrary/></span></li>
               </div>
              
                 </>
           )))}
       </ul>
            <div className="video-display-container" id={"video-display-container"+curentVideo._id}>
                <CourseVideo course={VideoContent} id={curentVideo._id}/>
               </div>
      </div>
      </>
  
    
    )
           }
           else{
            return(
             <h1>No Video Added</h1>
            )
           }
           }
           else{
            return(
              <Loader/>
            )
           }
}