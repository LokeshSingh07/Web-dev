import React from "react";
import { useState, useEffect } from "react";
import { Route , Routes } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InvalidPage from './pages/InvalidPage'



function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);




  return (
    <div className="App">

      <Navbar isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin}/>



      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedin}/>}/>
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedin}/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<InvalidPage/>}/>


      </Routes>






    </div>
  );
}

export default App;
