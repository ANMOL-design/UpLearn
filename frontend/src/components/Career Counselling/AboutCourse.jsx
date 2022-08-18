import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AboutCourse() {
  const { id } = useParams();
  const [courseData, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      if (id) {
        await axios
          .get("/admin/getAllCareerbyId/" + id)
          .then((response) => {
            console.log(response.data);
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
  }, [id]);

  return (
    <div>
      <div>{courseData.title}</div>
      <div dangerouslySetInnerHTML={{ __html: courseData.description }}></div>
    </div>
  );
}
