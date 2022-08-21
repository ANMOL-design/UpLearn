import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import axios from "axios";

export default function AboutCourse() {
  const { id } = useParams();

  const [courseData, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchdata = async () => {
      if (id) {
        await axios
          .get("/admin/getCareerbyId/" + id)
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            // navigate("/login");
          });
      }
    };
    fetchdata();
    window.scroll(0, 0);
  }, []);
  if (IsLoading) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className="articleDisplaycontainer" style={{margin:"0.55rem 0 0 0",border:"4px solid #aaaa" }}>
        <h1 style={{color: "blue",marginLeft:"40%",fontSize:"3rem"}}>{courseData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: courseData.description }}></div>
      </div>
      </div>
    );
  }
}
