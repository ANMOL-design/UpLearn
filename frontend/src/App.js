// Import a single style file only at index file
import "./styles/main.scss"; 
import {Router, Routes, Route, BrowserRouter } from "react-router-dom";
// Importing  modules
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NavbarLive from "./components/Navbar/NavbarLive";

function App() {
  return (
    <>
      <BrowserRouter>
          {/* The Navbar component  */}         
          <NavbarLive />
          <Routes>
            <Route path="/nav" element={<Navbar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {/* The Footer component  */}
      </BrowserRouter>
    </>
  );
}

export default App;
