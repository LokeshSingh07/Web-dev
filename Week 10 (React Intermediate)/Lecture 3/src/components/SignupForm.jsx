import React, { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupForm({setIsLoggedIn}){


    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();


    function changeHandler(event){
        const {name, type, value} = event.target

        setFormData((prevState)=>{
            return {
                ...prevState,
                [name] : value
            }
        })
    }


    function submitHandler(event){
        event.preventDefault();
        if(formData.password === formData.confirmPassword){
            setIsLoggedIn(true);
            toast.success("Account created");
            navigate("/dashboard");
        }
        else{
            toast.warning("Password does not match")
            return;
        }

        console.log(formData);
    }


    return (
        <div>
            
            {/* Student Instructor tab */}
            <div>
                <button>
                    Student
                </button>
                <button>
                    Instructor
                </button>
            </div>


            <form onSubmit={submitHandler}>
                {/* FirstName & LastName */}
                <div>
                    <label>
                        <p>FirstName<sup>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={changeHandler}
                            placeholder="Enter the first name"    
                        />
                    </label>
                    <label>
                        <p>LastName<sup>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={changeHandler}
                            placeholder="Enter the last name"    
                        />
                    </label>
                </div>


                {/* email Address */}
                <label>
                        <p>Email<sup>*</sup></p>
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            placeholder="Enter the email address"    
                        />
                </label>


                {/* Create password & confirm password */}
                <div>
                    <label>
                        <p>Password<sup>*</sup></p>
                        <input
                            required
                            type={showPassword? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Enter the Password"    
                        />
                        <span onClick={()=> setShowPassword((prev)=> !prev)}>
                            {
                                showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)
                            }
                        </span>
                    </label>
                    <label>
                        <p>confirm Password<sup>*</sup></p>
                        <input
                            required
                            type={showConfirmPassword? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            placeholder="Enter the Password"    
                        />
                        <span onClick={()=> setShowConfirmPassword((prev)=> !prev)}>
                            {
                                showConfirmPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)
                            }
                        </span>
                    </label>
                </div>
                    
                
                <button className="bg-red-500 text-white py-1 px-2 rounded-md">
                    Create Account
                </button>


            </form>






        </div>
    )
}
export default SignupForm;