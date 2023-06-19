import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingsAPI';
import IconBtn from '../../../common/IconBtn';



const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "other"]





const EditProfile = () => {

    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();



    const submitProfileForm = async (data)=>{
        try{
            dispatch(updateProfile(token, data));
        }
        catch(err){
            console.log("ERROR MESSAGE :" , err);
        }
    }





  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className='my-10 flex flex-col gap-y-7 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5 '>
            <h2 className='text-[18px] font-semibold'>
                Profile Information
            </h2>

            {/* first Name  and Last Name*/}
            <div className='flex flex-col lg:flex-row gap-5'>
                {/* firstName */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='firstName' className='label-style'>
                        First Name
                    </label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        className='form-style'
                        {...register("firstName", {required: true})}
                        defaultValue={user?.firstName}
                    />
                    {
                        errors.firstName && (
                            <span className='mt-1 text-[12px] text-yellow-100'>
                                Please enter your first name
                            </span>
                        )
                    }
                </div>

                {/* LastName */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='lastName' className='label-style'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last name'
                        className='form-style'
                        {...register("lastName", {required: true})}
                        defaultValue={user?.lastName}
                    />
                    {
                        errors.lastName && (
                            <span className='mt-1 text-[12px] text-yellow-100'>
                                Please enter your last name
                            </span>
                        )
                    }
                </div>
            </div>

            
            {/* DateOfBirth and Gender */}
            <div className='flex flex-col lg:flex-row gap-5'>
                {/* DateOfBirth */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='dateOfBirth' className='label-style'>
                        Date of Birth
                    </label>
                    <input
                        type='date'
                        name='dateOfBirth'
                        id='dateOfBirth'
                        className='form-style'
                        {...register("dateOfBirth", {
                            required: {
                                value: true, 
                                message: "Please Enter your Date of Birth",
                            },
                            max: {
                                value: new Date().toISOString().split("T")[0], 
                                message: "Date of Birth cannot be in future",
                            },
                        })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                    />
                    {
                        errors.dateOfBirth && (
                            <span className='mt-1 text-[12px] text-yellow-100'>
                                {errors.dateOfBirth.message}
                            </span>
                        )
                    }
                </div>


                {/* Gender */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='gender' className='label-style'>
                        Gender
                    </label>
                    <select
                        text="text"
                        name='gender'
                        id='gender'
                        className='form-style'
                        {...register("gender", {required:true})}
                        defaultValue={user?.additionalDetails?.gender}
                    >
                        {
                            genders.map((element, index)=>(
                                <option key={index} value={element}>
                                    {element}
                                </option>
                            ))
                        }
                    </select>
                    {
                        errors.gender && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please enter your gender
                            </span>
                        )
                    }
                </div>


            </div>


            {/* Contact number and About */}
            <div className='flex flex-col lg:flex-row gap-5'>
                {/* Contact number */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='contactNumber' className='label-style'>
                        Contact number
                    </label>
                    <input
                        type='tel'
                        name='contactNumber'
                        id='contactNumber'
                        placeholder='123-456-789'
                        className='form-style'
                        {...register("contactNumber", {
                            required: {
                                value: true, 
                                message: "Please Enter your Contact Number",
                            },
                            maxLength: {value:12, message: "Invalid Contact Number"},
                            minLength: {value:10, message: "Invalid Contact Number"}
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                    />
                    {
                        errors.contactNumber && (
                            <span className='mt-1 text-[12px] text-yellow-100'>
                                {errors.contactNumber.message}
                            </span>
                        )
                    }
                </div>

                {/* About */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='about' className='label-style'>
                        About
                    </label>
                    <input
                        type='text'
                        name='about'
                        id='about'
                        placeholder='Enter Bio details'
                        className='form-style'
                        {...register("about", {required: true})}
                        defaultValue={user?.additionalDetails?.about}
                    />
                    {
                        errors.about && (
                            <span className='mt-1 text-[12px] text-yellow-100'>
                                Please enter your Bio details
                            </span>
                        )
                    }
                </div>

            </div>

        </div>
                    
        
        {/* Cancel and Save button */}
        <div className='flex justify-end gap-2'>
            <button 
                onClick={()=>{
                    navigate("/dashboard/my-profile")
                }}
                className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
            >
                Cancel
            </button>
            <IconBtn type="submit" text="Save"/>
        </div>

    </form>

  )
}

export default EditProfile