import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from './components/core/Auth/OpenRoute';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";











function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>


      <Navbar/>


      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route 
          path="/signup"
          element={
            <OpenRoute>
              <SignUp/>
            </OpenRoute>
          }
        />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />



      </Routes>

    </div>
  );
}

export default App;
