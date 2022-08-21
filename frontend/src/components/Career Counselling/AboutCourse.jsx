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
        <h2>{courseData.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: courseData.description }}></div>
      </div>
    );
  }
}
