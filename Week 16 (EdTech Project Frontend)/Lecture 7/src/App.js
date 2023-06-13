import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from './components/core/Auth/OpenRoute';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Setting from "./components/core/Dashboard/setting/index";












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

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

        <Route
          path="/about"
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }
        />

        {/* Contact Page Route */}
        <Route path="/contact" element={<ContactUs/>}/>









        {/* Dashboard nesting route */}
        <Route  
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >

          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Setting/>}/>





        </Route>





        {/* 404 Not found route */}
        <Route path="*" element={<Error/>}/>
      </Routes>

    </div>
  );
}

export default App;
