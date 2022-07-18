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

function App() {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  else { return (
    <>
      <Router>
          
          {/* The Navbar component  */}         
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {/* The Footer component  */}
          <Footer />
      </Router>
    </>
  );
  }
}

export default App;
