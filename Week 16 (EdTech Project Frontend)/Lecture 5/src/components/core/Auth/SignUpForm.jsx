import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import Tab from '../../common/Tab';
import { ACCOUNT_TYPE } from '../../../utlis/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';




// data to pass to tab component
const tabData = [
    {
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
    },
    {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
    },
]



const SignUpForm = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {firstName, lastName, email, password, confirmPassword} = formData;


    // handle input field, when some value changes
    const handleOnChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    // handle form submission
    const handleOnSubmit = (e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Password do not match");
            return
        }
        console.log("Printing form data :", formData);

        const signupData = {
            ...formData,
            accountType,
        }

        console.log("SignUp data : ", signupData)


        // Setting signUp data to state
        // To be used after OTP verification
        dispatch(setSignupData(signupData));

        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate));

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setAccountType(ACCOUNT_TYPE.STUDENT);

    }









  return (
    <div>

        {/*Tab  */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
    
        {/* Form */}
        <form onSubmit={handleOnSubmit} className='w-full flex flex-col gap-y-4'>

            {/* FirstName and LastName */}
            <div className='flex flex-row gap-x-4'>
                {/* FirstName */}
                <label>
                    <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                        FirstName <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type='text'
                        name='firstName'
                        value={firstName}
                        onChange={handleOnChange}
                        placeholder='Enter first name'
                        style={{
                            boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
                        }}
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />
                </label>

                {/* lastName */}
                <label>
                    <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                        LastName <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange={handleOnChange}
                        placeholder='Enter last name'
                        style={{
                            boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
                        }}
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />
                </label>
            </div>


            {/* Email address */}
            <label>
                <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                    Email Address <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type='text'
                    name='email'
                    value={email}
                    onChange={handleOnChange}
                    placeholder='Enter email address'
                    style={{
                        boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
                    }}
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                />
            </label>


            {/* Phone number */}




            {/* create Password  and Confirm Password*/}
            <div className='flex gap-x-4'>
                {/* create Password */}
                <label className='relative'>
                    <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                        Create Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type={showPassword? "text" : "password"}
                        name='password'
                        value={password}
                        onChange={handleOnChange}
                        placeholder='Enter Password'
                        style={{
                            boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
                        }}
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />

                    {/* icon */}
                    <span onClick={()=> setShowPassword((prev)=> !prev)}
                        className='absolute top-[38px] right-3 cursor-pointer z-[10]'
                    >
                        {
                            showPassword ? 
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> :
                            <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                        }
                    </span>
                </label>   


                {/* Confirm Password */}
                <label className='relative'>
                    <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                        Confirm Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder='Confirm Password'
                        style={{
                            boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
                        }}
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />

                    {/* icon */}
                    <span onClick={()=> setShowConfirmPassword((prev)=> !prev)}
                        className='absolute top-[38px] right-3 cursor-pointer z-[10]'
                    >
                        {
                            showConfirmPassword ? 
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> :
                            <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                        }
                    </span>
                </label>  
            </div>


            {/* button */}
            <button type="submit" 
                className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900'
            >
                Create Account
            </button>



        </form>
    
    </div>
  )
}

export default SignUpForm