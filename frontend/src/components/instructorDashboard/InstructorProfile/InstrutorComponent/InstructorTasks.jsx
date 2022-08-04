import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Loader from "../../../Loader";
import axios from 'axios';

function InstructorAssignTask(props){

    const [assignTask, setassignTask] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        window.scroll(0, 0);
        const fetchdata = async () => {
            await axios
              .get("/assigntaskdetails/" + props.details._id)
              .then((response) => {
                setassignTask(response.data);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
        };
        fetchdata();
    }, [props.details._id]);

    console.log(props.details, assignTask);

    if(Loading){
        return(
            <Loader />
        );
    }

    else{
        return(
            <div style={{marginLeft: '7rem'}}>
                {assignTask ? 
                 <div>
                    <h1>Task Assigned</h1>
                    {assignTask.map( (item) => {
                        return(
                            <div key={item._id}>
                                <p>Chapter No: {item.ChapterNo}</p>
                                <p>Chapter Name: {item.ChapterName}</p>
                                <p>Chapter Description: {item.ChapterDescription}</p>
                                <p>Class No: {item.Class}</p>
                                <p>Board: {item.Board}</p>
                                <p>Subject: {item.Subject}</p>
                                <p>Due Date : {item.DueDate}</p>
                                <Link to={'add-lecture-data/' + item._id}><button>Add Content</button></Link>
                            </div>
                        )
                    })}
                 </div>
                 :
                 <div>
                    NO Pending task
                </div>
                }
            </div>
        )
    }
}

export default InstructorAssignTask;