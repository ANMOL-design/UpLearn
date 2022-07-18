// Import a single style file only at index file
import "./styles/main.scss"; 
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import {Router, Routes, Route, BrowserRouter } from "react-router-dom";
>>>>>>> f1e2403dc542c891f06cbd11879962279d01b3c8
// Importing  modules
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
          {/* The Navbar component  */}         
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {/* The Footer component  */}
      </BrowserRouter>
    </>
  );
}

export default App;
