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
import Setting from "./components/core/Dashboard/Setting/index";
import Cart from "./components/core/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourse from "./components/core/Dashboard/EnrolledCourse";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse/index";












function App() {


  const {user} = useSelector((state)=>state.profile);


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
              <About/>
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


          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse/>}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>

              </>
            )
          }


          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>

              </>
            )
          }


        </Route>





        {/* 404 Not found route */}
        <Route path="*" element={<Error/>}/>
      </Routes>

    </div>
  );
}

export default App;
