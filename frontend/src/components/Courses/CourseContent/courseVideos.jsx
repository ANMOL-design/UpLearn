import { useEffect, useRef, useState } from 'react';
import { BiFullscreen } from 'react-icons/bi';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { GoMute, GoUnmute } from 'react-icons/go';
import useVideoPlayer from "../../hooks/videoplayer";
export default function CourseVideo(props){
let videodata;
let video=[];
if(props){
videodata=props.course.courseVideoContent;
 if(videodata){
    video = videodata.find((i)=>i._id===props.id)
    console.log(video);
 }
}

 const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen,
  } = useVideoPlayer(videoElement);
 let i=0;
     const [timing,settiming]=useState({
        currentmin:0,
        currentsec:0,
        durationmin:0,
        durationsec:0
     })
   useEffect(()=>{
    const currentmin= Math.floor(playerState.currentVideo/60);
    const currentsec= Math.floor(playerState.currentVideo%60);
    const durationmin= Math.floor(playerState.videDuration/60)
    const durationsec= Math.floor(playerState.videDuration%60)
    settiming({...timing,currentmin,currentsec,durationmin,durationsec})
},[playerState])
console.log(playerState);
    return(
       <>
      <div className="video-wrapper" >
        <video
          src={video.VideoLecture}
          ref={videoElement}
        //   poster={props.course.thumbnail}
          onTimeUpdate={handleOnTimeUpdate}
        />
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <i className="bx bx-play"><AiFillPlayCircle/></i>
              ) : (
                <i className="bx bx-pause"><AiFillPauseCircle/></i>
              )}
            </button>
          </div>
          <div className="video-time">
            {timing.currentmin+":"+timing.currentsec+"/"+timing.durationmin+":"+timing.durationsec}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
         
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <i className="bx bxs-volume-full"><GoUnmute/></i>
            ) : (
              <i className="bx bxs-volume-mute"><GoMute/></i>
            )}
          </button>
          <button className="full-btn" onClick={toggleFullscreen}>
            <i><BiFullscreen/></i>
          </button>
        </div>
      </div>              
       </>
    )
}