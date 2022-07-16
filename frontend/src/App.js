// Import a single style file only at index file
import "./styles/main.scss"; 
import {Router, Routes, Route } from "react-router-dom";
// Importing  modules
import Navbar from "../src/components/Navbar/Navbar"

function App() {
  return (
    <>
      
          <Navbar />
          <h1>Test is not render</h1>
          <p>This is paragraph</p>
     
      
    </>
  );
}

export default App;
