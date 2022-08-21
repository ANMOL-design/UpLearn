// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"

// export default function ViewMyClass(props){
//      const {id} = useParams();
//      const [StudentInfo,setStudentInfo] = useState([]);
//      const [MyClassroom,setMyClassrooms] = useState([]);
//      useEffect(() => {
//        if(props.Student){
//          if(props.Student.MyClassrooms){
//           setStudentInfo(props.Student)
//          const MyClass= props.Student.MyClassrooms.find((i)=>i._id==id)
//           setMyClassrooms(MyClass)
//          }
           
//       }
        
//      }, [props]);
//     return(
//         <>
//        <div className="my-classroom-view-container">
//          <div className="my-class-view-header">
//             <p>My Classroom</p>
//          </div>
//          <div className="myclass-view-info-container">
//             <div className="class-view-info">
//                 <p><strong>Class Name : </strong>{MyClassroom.ClassName}</p>
//                 <p><strong>Class Description : </strong>{MyClassroom.ClassDescription}</p>
//                 <p><strong>Subject : </strong>{MyClassroom.Subject}</p>
//                 <p><strong>Class : </strong>{MyClassroom.Class? MyClassroom.Class+" th" : "10 th"}</p>
//             </div>
//          </div>
//          <div className="manage-class-container">
//               {/* The Linker Page to navigate the components  */}
//               <div className="course-content-navbar">
//                 {/* Buttons to make Notice, text and Notes visible at different time  */}
//                 <div className="edit-course-container-btnchanger">
//                   <button
//                     onClick={handleParticipantShow}
//                     className={ParticipantShow ? "bt-active" : ""}
//                   >
//                     Participants
//                   </button>
//                   <button
//                     onClick={handleNoticeShow}
//                     className={NoticeShow ? "bt-active" : ""}
//                   >
//                     Activities
//                   </button>
//                   <button
//                     onClick={handleNotesShow}
//                     className={NotesShow ? "bt-active" : ""}
//                   >
//                     Notes
//                   </button>

//                   <button
//                     onClick={handleAtandanceShow}
//                     className={AtandanceShow ? "bt-active" : ""}
//                   >
//                     Attendance
//                   </button>
//                 </div>
//               </div>

//               {/* Showing Participant if Participant is Active  */}
//               {ParticipantShow && <AddParticipants />}

//               {/* Showing Notice if Notice is Active  */}
//               {NoticeShow}

//               {/* Showing Notes if Notes is Active  */}
//               {NotesShow}

//               {/* Showing Atandance if Atandance is Active  */}
//               {AtandanceShow}
//             </div>
//        </div>
//         </>
//     )
// }