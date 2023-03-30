import React, { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function LoginForm({setIsLoggedIn}){

    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function changeHandler(event){
        const {name, type, value} = event.target
        
        setFormData((prevState)=>(
            {
                ...prevState,
                [name] : value
            }
        ))
    }

    
    function submitHandler(event){
        event.preventDefault();
        setIsLoggedIn(true);
        toast.success("Logged in");
        navigate("/dashboard");
        console.log(formData);
    }




    return (
        <form onSubmit={submitHandler}>
            <label>
                <p>
                    Email Address <sup>*</sup>
                </p>
                <input 
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter an email id"
                />
            </label>
            <label>
                <p>
                    Password <sup>*</sup>
                </p>
                <input 
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter password"
                />
                <span onClick={()=> setShowPassword((prev)=> !prev)}>
                    {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                </span>

                <Link to="#">
                    <p>Forgot Password</p>
                </Link>
            </label>


            <button className="bg-red-500 text-white py-1 px-2 rounded-md">
                Sign in
            </button>



        </form>
    )
}
export default LoginForm;