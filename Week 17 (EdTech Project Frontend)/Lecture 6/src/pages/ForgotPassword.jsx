import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdArrowBack} from 'react-icons/io';
import { getPasswordResetToken } from '../services/operations/authAPI';
import Spinner from '../components/common/Spinner';





const ForgotPassword = () => {

    const {loading} = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }



  return (
    <div className='w-full h-full m-auto text-richblack-5'>
        {
            loading ? 
            (<Spinner/>) : 
            (<div className='w-[80%] sm:w-[60%] lg:w-[30%] mx-auto'>
                <h1 className='text-[1.55rem] font-semibold leading-[2.375rem] text-richblack-5'>
                    {
                        !emailSent ? "Reset your password"  : "Check email"
                    }
                </h1>

                <p className='mt-2 text-[.911rem] leading-[1.625rem] text-richblack-400'>
                    {
                        !emailSent ? 
                        "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : 
                        `We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleOnSubmit}
                className='w-full mt-6 flex flex-col gap-y-4'>
                    {
                        !emailSent && (
                            <label>
                                <p  className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                                    Email Address <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    placeholder="Enter your Email address"
                                    style={{
                                        boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
                                    }}
                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                />
                            </label>
                        )
                    }

                    <button type="submit" 
                    className='bg-yellow-50 text-richblack-800 px-4 py-2 rounded-md'>
                        {
                            !emailSent ? "Reset Password" : "Resend Email"
                        }
                    </button>
                </form>

                <div className='text-[14px] mt-5'>
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

export default ForgotPassword