import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import PlayVideo from "./TaskSubVideo";
import Loader from "../../../../../Loader";

export default function VideosContent(props) {
  let VideoContent = props.videos;

  const [curentVideo, setCurrentVideo] = useState(VideoContent.ChapterVideo[0]);

  const [active, setactive] = useState({});

  const toggleActive = (index) => {
    setactive({ [index]: !active[index] });
  };

  const playcurrentvideo = (item, index) => {
    setCurrentVideo(item);
    toggleActive(index);
  };

  const DeleteTaskVideo = () => {
    if (window.confirm("Press a button!") === true) {
      console.log("Delete Video");
    } else {
      console.log("Cancel Video Delete");
    }
  };

  if (VideoContent.ChapterVideo) {
    if (VideoContent.ChapterVideo.length > 0) {
      return (
        <>
          <div className="video-content-container">
            <ul>
              {/* The Heading To Toggle the Video Content  */}
              <li>
                <h3 className="heading-toggler-video">
                  {VideoContent.ChapterName}
                </h3>
              </li>

              {/* Show the Name of Videos  */}
              {VideoContent.ChapterVideo.map((item, index) => (
                <div className="video-list-container" key={index}>
                  <li
                    onClick={() => playcurrentvideo(item, index)}
                    className={
                      active[index]
                        ? "video-content-display-list my-active-video"
                        : "video-content-display-list"
                    }
                  >
                    <span onClick={DeleteTaskVideo}>
                      <MdDelete />
                    </span>
                    {item.LectureVideoTitle}
                  </li>
                </div>
              ))}
            </ul>

            {/* Set the Video And Play it  */}
            <div className="video-display-container">
              <PlayVideo course={VideoContent} id={curentVideo._id} />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="not-available-incourse">
          <h1>Not Video Available</h1>
        </div>
      );
    }
  } else {
    return <Loader />;
  }
}
