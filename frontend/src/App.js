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
import ChangePassword from "./components/Dashboard/DashboardComponents/ChangePassword";

// The Admin Portal Links
import AdminLogin from "./components/AdminPortal/AdminLogin";
import AdminHome from "./components/AdminPortal/AdminHome";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import UpdateMyStudentProfile from "./components/Dashboard/DashboardComponents/UpdateProfile";
import InstructorRegister from "./components/AdminPortal/InstructorRegister";
import Logout from "./components/logout/logout";
import ImageUploader from "./components/IMAGEUPLOADER/ImageUploader";

// Instructor Dashboard 
import AddCourses from "./components/instructorDashboard/Instructorscomponent/addCourse";
import InstructorDashboard from "./components/instructorDashboard/InstructorProfile/InstructorDashboard";

//redux setup
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Contact from "./components/Contact/Contact";
import AddBook from "./components/AdminPortal/AddBook";
import InstructorList from "./components/AdminPortal/InstructorList";


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
            <Route path="/studentdashboard" element={<StudentDashboard />} />
            <Route path="/updateStudentProfile" element={<UpdateMyStudentProfile />} />
            <Route path="/change-password" element={<ChangePassword />}/>
            {/* IMAGEUPLOADER */}
            <Route path="/imageuploader" element={<ImageUploader />} />
            {/* The Admin Routes  */}
            <Route path="/admin-portal-login-190310554227" element={<AdminLogin />} />
            <Route path="/admin-portal-home-190310554227" element={<AdminHome />} />
            <Route path="/admin-portal-instructorRegis-190310554227" element={<InstructorRegister />} />
            <Route path="/admin-portal-Addbook-190310554227" element={<AddBook />} />
            <Route path="/admin-portal-InstructorList-190310554227" element={<InstructorList />} />
            {/* Instructor Dashboard */}
            <Route path="/instructor-addCourses" element={ <AddCourses/>} />
            <Route path="/instructordashboard/*" element={<InstructorDashboard />} />
            {/* General  */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="*" element={<PageNotFound />} />
            
          </Routes>
          {/* The Footer component  */}
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
