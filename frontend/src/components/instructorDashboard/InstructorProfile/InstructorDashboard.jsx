import React  from "react";
import { Routes, Route } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import InstructorDashCourses from "./InstrutorComponent/InstructorDashCourses";
import InstructorDashHome from "./InstrutorComponent/InstructorDashHome";

function InstructorDashboard(){
    return(
        <div className="instructor-dashboard">
            {/* SideBar Present at All Places  */}
            <InstructorSidebar />
            <Routes>
                <Route path="/" element={<InstructorDashHome />} /> 
                <Route path="/mycourses" element={<InstructorDashCourses />} /> 
            </Routes>
        </div>
    )
}

export default InstructorDashboard;