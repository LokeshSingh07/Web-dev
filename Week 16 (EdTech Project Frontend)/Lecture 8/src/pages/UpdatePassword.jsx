import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import { resetPassword } from '../services/operations/authAPI';




const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    const {loading} = useSelector((state)=>state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {password, confirmPassword} = formData;

    const handleOnChange = (e)=>{
        setFormData((prevState)=>{
            return {
                ...prevState,
                [e.target.name] : e.target.value,
            }
        })
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }





  return (
    <div className='w-full h-full m-auto text-richblack-5'>
        {
            loading ? 
            (<Spinner/>) : 
            (<div className='w-[80%] sm:w-[60%] lg:w-[30%] mx-auto'>
                <h1 className='text-[1.55rem] font-semibold leading-[2.375rem] text-richblack-5'>
                    Choose new password
                </h1>
                <p className='mt-2 text-[.911rem] leading-[1.625rem] text-richblack-400'>
                    Almost done. Enter your new password and youre all set.
                </p>

                <form onSubmit={handleOnSubmit}
                    className='w-full mt-6 flex flex-col gap-y-4'
                >
                    {/* new password */}
                    <label className='relative'>
                        <p  className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                            New Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder='Enter new password'
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

                    {/* confirm new password */}
                    <label className='relative'>
                        <p  className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                            Confirm Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Enter confirm password'
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


                    {/* list */}




                        
                    {/* submit button */}
                    <button type="submit" className='bg-yellow-50 text-richblack-800 px-4 py-2 rounded-md'>
                        Reset Password
                    </button>
                </form>


                {/* back to login */}
                <div className='mt-5 text-[14px]'>
                    <Link to="/login"
                    className='flex items-center gap-1'>
                        <IoMdArrowBack/>
                        <p>Back to login</p>
                    </Link>
                </div>


            </div>)
        }
    </div>
  )
}

export default UpdatePassword