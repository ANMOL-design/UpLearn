import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import a single style file only at index file
import "./styles/main.scss";
// Importing modules
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
import AdminReviewLectData from "./components/AdminPortal/AdminReviewLectData";
import Addcareercourses from "./components/AdminPortal/addcareercourses";

// Instructor Dashboard
import InstructorDashboard from "./components/instructorDashboard/InstructorProfile/InstructorDashboard";
// Instructor My Task
import InstructorAddTaskDetails from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/InstructorAddTaskDetails";
import InstructorAddTaskVideo from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/InstructorAddTaskVideo";
import InstructorAddTaskQuiz from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/InstructorAddTaskQuiz";
import InstAddNewTaskQuiz from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/AddNewTaskQuiz";
import AddNewQuizQuestion from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/AddNewQuizQuestion";

// Instructor My Courses
import AddCourses from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/addCourse";
import InstructorEditContent from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/InstructorEditContent";
import AddQuiz from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/addQuiz";
import AddQuestion from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/addQuestion";

//Student Dashboard
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import ChangePassword from "./components/Dashboard/DashboardComponents/ChangePassword";
import UpdateMyStudentProfile from "./components/Dashboard/DashboardComponents/UpdateProfile";

//courses
import Class from "./components/Dashboard/DashboardComponents/Courses/ClassSelect";
import Subject from "./components/Dashboard/DashboardComponents/Courses/Subject";

//Doubt Section
import Doubt from "./components/Doubt/Doubt";
import Postdoubt from "./components/Doubt/Postdoubt";
import MainDoubt from "./components/Doubt/MainDoubt";

//redux setup
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Contact from "./components/Contact/Contact";
import AboutUs from "./components/About/AboutUs";
import AddBook from "./components/AdminPortal/AddBook";
import ContentPage from "./components/Dashboard/ContentPage";

import InstructorList from "./components/AdminPortal/InstructorList";
import LibraryPage from "./components/Library/LibraryHome";

// Home Route
import Home from "./components/Home/Home";
import ContactDetails from "./components/AdminPortal/ContactDetails";

//Games
import Games from "./components/Games/Games";
import Main from "./games/game1/Main";
import Hangman from "./games/game2/Hangman";
import Game3 from "./games/game3/Game3";
import Game4 from "./games/game4/Game4";

import CourseInfo from "./components/Courses/CourseInfo";
import CourseContent from "./components/Courses/courseContent";

// career counselling
import After12th from "./components/Career Counselling/After12th";
import After10th from "./components/Career Counselling/After10th";
import Exams from "./components/Career Counselling/Exams";
import AboutCourse from "./components/Career Counselling/AboutCourse";

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
          {/* The Navbar component */}
          <Navbar />
          <Routes>
            {/* ////////// Starting Routes ////////// */}
            {/* The Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />

            {/* /////////////////////////////////////////////////// */}
            {/* The Student Dashboard */}
            <Route path="/studentdashboard/*" element={<StudentDashboard />} />
            <Route
              path="/change-student-password"
              element={<ChangePassword />}
            />
            <Route
              path="/update-student-profile"
              element={<UpdateMyStudentProfile />}
            />

            <Route path="/stud-courses/:board" element={<Class />} />
            <Route path="/stud-courses/:board/:class" element={<Subject />} />
            <Route
              path="/stud-courses/:board/:class/:subject"
              element={<ContentPage />}
            />

            {/* ///////////////////////////////////////////////// */}
            {/* IMAGEUPLOADER */}
            <Route path="/imageuploader" element={<ImageUploader />} />

            {/* ///////////////////////////////////////////////// */}
            {/* The Admin Routes */}
            <Route
              path="/admin-portal-login-190310554227"
              element={<AdminLogin />}
            />
            <Route
              path="/admin-portal-home-190310554227"
              element={<AdminHome />}
            />
            <Route
              path="/admin-portal-instructorRegis-190310554227"
              element={<InstructorRegister />}
            />
            <Route
              path="/admin-portal-Addbook-190310554227"
              element={<AddBook />}
            />
            <Route
              path="/admin-portal-InstructorList-190310554227"
              element={<InstructorList />}
            />
            <Route
              path="/admin-portal-contact-details-190310554227"
              element={<ContactDetails />}
            />
            <Route
              path="/admin-portal-StudentList-190310554227"
              element={<StudentList />}
            />
            <Route
              path="/admin-portal-assign-task-190310554227"
              element={<AssignTaskToInstructor />}
            />
            <Route
              path="/admin-portal-assign-task-190310554227/:id"
              element={<AssignSyllbusTask />}
            />

            <Route
              path="/admin-portal-review-assign-task-190310554227"
              element={<AdminReviewLectData />}
            />
            <Route path="/add-career-courses" element={<Addcareercourses />} />

            {/* //////////////////////////////////////// */}
            {/* Instructor Dashboard */}

            <Route
              path="/instructordashboard/*"
              element={<InstructorDashboard />}
            />
            <Route
              path="/task-assign/add-lecture-data/:id/:teacher"
              element={<InstructorAddTaskDetails />}
            />
            <Route
              path="/task-assign/add-lecture-video/:id/:teacher"
              element={<InstructorAddTaskVideo />}
            />

            <Route
              path="/task-assign/add-lecture-quiz/:id/:teacher"
              element={<InstructorAddTaskQuiz />}
            />

            <Route
              path="/task-assign/add-lecture-quiz/add-new-quiz/:id"
              element={<InstAddNewTaskQuiz />}
            />

            <Route
              path="/instructordashboard/my-courses/edit-content/:id"
              element={<InstructorEditContent />}
            />

            <Route
              path="/task-assign/add-lecture-quiz/add-new-quiz/add-questions/:id/:quiz_id"
              element={<AddNewQuizQuestion />}
            />

            {/* //////////////////////////////////////////////// */}

            <Route
              path="/instructordashboard/my-courses/add-new-course"
              element={<AddCourses />}
            />

            <Route
              path="/instructordashboard/my-courses/edit-content/add-quiz/:id"
              element={<AddQuiz />}
            />

            <Route
              path="/instructordashboard/my-courses/edit-content/add-quiz/add-questions/:id/:quiz_id"
              element={<AddQuestion />}
            />

            {/* ////////////////////////////////////////////////  */}
            {/* Doubt Dashboard */}
            <Route path="/ask-doubt" element={<Doubt />} />
            <Route path="/post-doubt" element={<Postdoubt />} />
            <Route path="/ask-doubt/:id" element={<MainDoubt />} />

            {/* /////////////////////////////////////////////////// */}
            {/* Courses of User */}
            <Route path="/courses" element={<Courses />} />

            <Route path="/course/:id" element={<CourseInfo />} />

            <Route
              path="/mycourses/start-learning/:id"
              element={<CourseContent />}
            />

            {/* //////////////////////////////////////////////////// */}
            {/* The Library */}
            <Route path="/uplearn-virtual-library" element={<LibraryPage />} />

            {/* //////////////////////////////////////////////////// */}
            {/* Game */}
            <Route path="/learn-with-fun" element={<Games />} />
            <Route path="/maths-booster" element={<Main />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/count-and-choose" element={<Game3 />} />
            <Route path="/guess-language" element={<Game4 />} />

            {/* ///////////////////////////////////////////////////////  */}
            {/* Career Counselling Route */}
            <Route path="carrercounsling/:after_12" element={<After12th />} />
            <Route path="/after-10/:after_10" element={<After10th />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/about/:id" element={<AboutCourse />} />

            {/* ///////////////////////////////////////////////////////  */}
            {/* Home Route  */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/" element={<Home />} exact />
            <Route path="*" element={<PageNotFound />} />

            {/* //////// End Of Routes ////////// */}
          </Routes>
          {/* The Footer component */}
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
