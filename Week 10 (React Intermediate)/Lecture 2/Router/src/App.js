import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import MainHeader from "./pages/MainHeader";
import About from "./pages/About";
import Home from "./pages/Home";
import Labs from "./pages/Labs";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";



function App() {
  return (
    <div className="App">
    
    <nav className="">
      <ul className="flex flex-row gap-5 text-lg font-medium">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/support">Support</NavLink>
        </li>
        <li>
          <NavLink to="/labs">Labs</NavLink>
        </li>
      </ul>
    </nav>




  {/*    Routing    */}
    {/* <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/support" element={<Support/>}/>
      <Route path="/labs" element={<Labs/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
     */}




  {/*   Nested Routing   */}
    <Routes>
      <Route path="/" element={<MainHeader/>}>
        <Route index element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="/labs" element={<Labs/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    




    </div>
  );
}

export default App;
