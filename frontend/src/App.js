import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import a single style file only at index file
import "./styles/main.scss";
// Importing  modules
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Loader from "./components/Loader";
import Courses from "./components/Courses/Courses";

// The Admin Portal Links
import AdminLogin from "./components/AdminPortal/AdminLogin";
import AdminHome from "./components/AdminPortal/AdminHome";
import InstructorRegister from "./components/AdminPortal/InstructorRegister";
import Logout from "./components/logout/logout";
import ImageUploader from "./components/IMAGEUPLOADER/ImageUploader";
import StudentList from "./components/AdminPortal/StudentList";
import AssignTaskToInstructor from "./components/AdminPortal/AdminAssignTask";
import AssignSyllbusTask from "./components/AdminPortal/AssignTask";

// Instructor Dashboard 
import AddCourses from "./components/instructorDashboard/Instructorscomponent/addCourse";
import InstructorDashboard from "./components/instructorDashboard/InstructorProfile/InstructorDashboard";

//Student Dashboard
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import ChangePassword from "./components/Dashboard/DashboardComponents/ChangePassword";
import UpdateMyStudentProfile from "./components/Dashboard/DashboardComponents/UpdateProfile";

//courses
import Class from "./components/Dashboard/DashboardComponents/Courses/ClassSelect";
import Subject from "./components/Dashboard/DashboardComponents/Courses/Subject";

//redux setup
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Contact from "./components/Contact/Contact";
import AddBook from "./components/AdminPortal/AddBook";
import ContentPage from "./components/Dashboard/ContentPage";

import InstructorList from "./components/AdminPortal/InstructorList";
import LibraryPage from "./components/Library/LibraryHome";

// Home Route
import Home from "./components/Home/Home";
import ContactDetails from "./components/AdminPortal/ContactDetails";

//Games
import Main from "./games/game1/Main";
import Game2 from "./games/game2/Game2";

function App() {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Provider store={store}>
        <Router>
          {/* The Navbar component  */}
          <Navbar />
          <Routes>
            {/* The Auth Routes  */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />

            {/* The Student Dashboard  */}


            <Route path="/studentdashboard/*" element={<StudentDashboard />} />
            <Route path="/change-student-password" element={<ChangePassword />} />
            <Route path="/update-student-profile" element={<UpdateMyStudentProfile />} />

            <Route path="/stud-courses/:board" element={<Class />} />
            <Route path="/stud-courses/:board/:class" element={<Subject />} />
            <Route path="/stud-courses/:board/:class/:subject" element={<ContentPage />} />

            {/* IMAGEUPLOADER */}
            <Route path="/imageuploader" element={<ImageUploader />} />
            {/* The Admin Routes  */}
            <Route path="/admin-portal-login-190310554227" element={<AdminLogin />} />
            <Route path="/admin-portal-home-190310554227" element={<AdminHome />} />
            <Route path="/admin-portal-instructorRegis-190310554227" element={<InstructorRegister />} />
            <Route path="/admin-portal-Addbook-190310554227" element={<AddBook />} />
            <Route path="/admin-portal-InstructorList-190310554227" element={<InstructorList />} />
            <Route path="/admin-portal-contact-details-190310554227" element={<ContactDetails />} />
            <Route path="/admin-portal-StudentList-190310554227" element={<StudentList />} />
            <Route path="/admin-portal-assign-task-190310554227" element={<AssignTaskToInstructor />} />
            <Route path="/admin-portal-assign-task-190310554227/:id" element={<AssignSyllbusTask />} />
            {/* Instructor Dashboard */}
            <Route path="/instructor-addCourses" element={<AddCourses />} />
            <Route path="/instructordashboard/*" element={<InstructorDashboard />} />
            {/* General  */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="/uplearn-virtual-library" element={<LibraryPage />} />
            {/* Home Route  */}
            <Route path="/" element={<Home />} exact />
            <Route path="*" element={<PageNotFound />} />

            {/* Game */}
            <Route path="/game1" element={<Main />} />
            <Route path="/game2" element={<Game2 />} />

          </Routes>
          {/* The Footer component  */}
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
