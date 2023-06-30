import React, { useEffect, useState } from 'react'
import { IoIosTimer, IoMdArrowBack } from 'react-icons/io';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import { sendOtp, signUp } from '../services/operations/authAPI';




const VerifyEmail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {loading, signupData} = useSelector((state)=> state.auth);
    const [otp, setOtp] = useState("");


    useEffect(()=>{
        if(!signupData){
            navigate('/signup');
        }
    },[]);


    function handleOnSubmit(event){
        event.preventDefault();

        const {accountType, firstName,lastName, email, password, confirmPassword} = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }




  return (
    <div className='w-full h-full m-auto text-richblack-5'>
        {
            loading ? 
            (<Spinner/>) :
            (<div className='w-[80%] sm:w-[60%] lg:w-[30%] mx-auto'>
                <h1 className='text-[1.55rem] font-semibold leading-[2.375rem] text-richblack-5'>
                    Verify email
                </h1>
                <p className='mt-2 text-[.911rem] leading-[1.625rem] text-richblack-400'>
                    A verification code has been sent to you. Enter the code below
                </p>

                <form onSubmit={handleOnSubmit}
                    className='w-full mt-6 flex flex-col gap-y-6'
                >
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} 
                            placeholder="-" 
                            style={{
                                boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
                            }}
                            className='w-[50px] h-[50px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 
                            text-center font-semibold mr-3 '
                        />}
                    />
                        
                    {/* submit button */}
                    <button type="submit" className='bg-yellow-50 text-richblack-800 px-4 py-2 rounded-md'>
                        Verify Email
                    </button>
                </form>


                <div className='flex justify-between items-center flex-wrap text-[14px] mt-5'>
                    {/* back to login */}
                    <div>
                        <Link to="/login"
                        className='flex items-center gap-1'>
                            <IoMdArrowBack/>
                            <p>Back to login</p>
                        </Link>
                    </div>

                    {/* resend */}
                    <button onClick={()=> dispatch(sendOtp(signupData.email, navigate))} 
                        className='flex items-center text-blue-200 gap-1 cursor-pointer'
                    >
                        <IoIosTimer/>
                        <p >
                            resend it
                        </p>
                    </button>


                </div>

            </div>)
        }
    </div>
  )
}

export default VerifyEmail