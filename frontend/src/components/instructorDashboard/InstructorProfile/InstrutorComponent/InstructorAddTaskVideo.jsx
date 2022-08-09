import React, {useState, useEffect} from "react";
import { useParams ,useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Loader from "../../../Loader";
import axios from 'axios';

function InstructorAddTaskVideo(){

    const { id , teacher} = useParams();
    let navigate = useNavigate();

    const [content, setcontent] = useState('');
    const [assignTask, setassignTask] = useState({});
    const [Loading, setLoading] = useState(true);
    const [instructor, setinstructor] = useState({});

    const [LectureTitle, setLectureTitle] = useState('');

    useEffect(() => {
        window.scroll(0, 0);

        const fetchlogin = async () => {
            await axios
              .get("/aboutInstructor")
              .then((response) => {
                setinstructor(response.data);
              })
              .catch((error) => {
                console.log(error);
                navigate("/login");
              });
        };
        fetchlogin();

        const fetchdata = async () => {
            await axios
              .get("/singleassigntaskinfo/" + id)
              .then((response) => {
                setassignTask(response.data);
                setcontent(response.data[0].Draft)
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
        };
        fetchdata();
    }, [id, navigate]);


    const handleEditorChange = (content) => {
        setcontent(content); 
    }

    const SaveAsDraft = async () => {

        const res =  await fetch("/saveassigntaskasdeaft" ,{
            method : "POST",
            headers : { 
                "content-Type" : "application/json"
            },
            body : JSON.stringify({
                id, content
            })
        } );
        
        if(res.status === 200){
            window.alert('Data Save as Draft Successfully');
            navigate("/");
        }
        else{
            console.log(res);
            window.alert('Internal Server Error');
        }
    }

    const SubmitMyTask = async () => {

        if(LectureTitle === ''){
            window.alert('Please Enter a valid chapter title.')
        }
        else if(content === ''){
            window.alert('Please Enter content to added Chapter.')
        }
        else{
            const LectureNo = assignTask[0].ChapterNo;
            const Title = LectureTitle;
            const LectureContent = content;

            const res =  await fetch("/Instructoraddlecturedetails/" + id ,{
                method : "POST",
                headers : { 
                    "content-Type" : "application/json"
                },
                body : JSON.stringify({
                    LectureNo , Title ,LectureContent
                })
            } );
            
            if(res.status === 200){
                window.alert('Data Submit Successfully');
                navigate("/");
            }
            else{
                console.log(res)
                window.alert('Internal Server Error, Try Later');
            }
        }
    }

    if(assignTask){
        const e = document.getElementsByClassName('sun-editor-editable')[0];
        if(e){
            e.innerHTML = content;
        }
    } 
    
    console.log(assignTask)

    if(Loading){
        return(
            <Loader />
        );
    }

    else{  
        return(
            <div className="addcoursebyinstructor">
                <h1>Add Course Video</h1>

                <SunEditor
                    style={{margin:"2rem"}}
                    onChange={handleEditorChange}
                    showToolbar={true}
                    setOptions={{
                        buttonList: [
                        [
                            'undo', 'redo','font', 'fontSize', 'formatBlock', 'align', 'list',
                            'paragraphStyle', 'blockquote', 'bold', 'underline', 'italic',  
                            'subscript', 'superscript', 'strike',
                            'fontColor', 'hiliteColor', 'textStyle',
                            'removeFormat', 'outdent', 'indent',
                            'horizontalRule',  'lineHeight',
                            'table', 'link', 'image', 'audio', 'showBlocks', 'codeView',
                            'preview', 'print', 'fullScreen'
                        ]
                        ]
                    }}
                />

                <div className="makedivision">
                    <form>
                        {/* The Email Input  */}
                        <div className="signInput">
                        <label htmlFor="title">Chapter Title</label><br /> 
                        <input
                            type="text"
                            id="title"
                            placeholder="Add heading title of the chapter"
                            name="title"
                            value={LectureTitle}
                            onChange={ (e) => {setLectureTitle(e.target.value)}}
                        />
                        </div>
                    </form>
                </div>

                <div className="submitassigntask">
                    <button onClick={SaveAsDraft}>Save as Draft</button>
                    <button onClick={SubmitMyTask}>Submit Task</button>
                </div>

                <hr />
                <p  className="assignedtaskpreviewdefine"><b>Task Description</b></p>
                {assignTask ? 
                    <div className="assignedtaskpreview">
                        <p className="asstskdecp">{assignTask[0].ChapterDescription} Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eaque velit qui. Rerum dolores earum commodi expedita officia necessitatibus excepturi magni aliquid eos iure sed quaerat, a dolorum placeat est?</p>

                        {/* More Details of Task  */}
                        <div className="assignedtaskpreview_inner">
                            <p><b>Chapter No : </b><br />{assignTask[0].ChapterNo}</p>
                            <p><b>Chapter Name : </b><br />{assignTask[0].ChapterName}</p>
                            <p><b>Subject : </b><br />{assignTask[0].Subject}</p>
                            <p><b>Board : </b><br />{assignTask[0].Board}</p>
                            <p><b>Class : </b><br />{assignTask[0].Class}</p>
                            <p><b>Due Date : </b><br />{assignTask[0].DueDate}</p>
                        </div>
                        
                    </div>
                    : null
                }
            </div>
        ) 

    }
}

export default InstructorAddTaskVideo;