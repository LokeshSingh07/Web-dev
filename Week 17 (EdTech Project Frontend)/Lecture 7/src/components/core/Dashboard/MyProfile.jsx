import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from 'react-icons/ri'
import { formattedDate } from '../../../utils/formattedDate';









const MyProfile = () => {

    const {user} = useSelector((state)=> state.profile);
    const navigate = useNavigate();





  return (
    <div className='flex flex-col text-richblack-5 mx-auto'>
        <h1 className='text-3xl mb-14'>My Profile</h1>


        {/* Section 1 -- user */}
        <div className='w-full flex flex-row justify-between items-center border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 rounded-md'>
            <div className='flex items-center gap-x-5'>
                <img src={user?.image} 
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div className='space-y-1 capitalize'>
                    <p className='text-[18px] font-semibold'>
                        {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className='text-sm text-richblack-300'>
                        {user?.email}
                    </p>
                </div>
            </div>

            {/* Edit icon button */}
            <IconBtn
                text={"Edit"}
                onclick={()=>{
                    navigate("/dashboard/settings")
                }}
            >
                <RiEditBoxLine/>
            </IconBtn>
        </div>



        {/* Section 2  -- About*/}
        <div className='w-full flex flex-col gap-y-5 border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 rounded-md my-10'> 

            <div className='flex justify-between items-center'>
                <p className='text-[18px] font-semibold'>About</p>
                {/* Edit icon button */}
                <IconBtn
                    text={"Edit"}
                    onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                >
                    <RiEditBoxLine/>
                </IconBtn>
            </div>

            <p className={`${
                user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"
            } text-sm font-medium mt-8 `}>
                {
                    user?.additionalDetails?.about ? user.additionalDetails.about : "Write something about yourself"
                }
            </p>
        </div>


        {/* Section 3 -- Personal details */}
        <div className='w-full flex flex-col gap-y-5 border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 rounded-md'> 
            <div className='flex justify-between items-center'>
                <p className='text-[18px] font-semibold'>Personal Details</p>
                {/* Edit icon button */}
                <IconBtn
                    text="Edit"
                    onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                >
                    <RiEditBoxLine/>
                </IconBtn>
            </div>

            <div className='flex flex-row flex-wrap gap-5 lg:mt-[3rem]'>
                <div className='w-[45%]'>
                    <p className='text-sm text-richblack-600'>First Name</p>
                    <p className='text-sm capitalize'>{user?.firstName}</p>
                </div>
                <div className='w-[45%]'>
                    <p className='text-sm text-richblack-600'>Last Name</p>
                    <p className='text-sm capitalize'>{user?.lastName}</p>
                </div>
                <div className='w-[45%]'>
                    <p className='text-sm text-richblack-600'>Email</p>
                    <p className='text-sm'>{user?.email}</p>
                </div>
                <div className='w-[45%]'>
                    <p className='text-sm text-richblack-600'>Contact Number</p>
                    <p className='text-sm'>
                        {user?.additionalDetails?.contactNumber ? user.additionalDetails.contactNumber : "Add contact number"}
                    </p>
                </div>
                <div className='w-[45%]'>
                    <p className='text-sm text-richblack-600'>Gender</p>
                    <p className='text-sm'>
                        {user?.additionalDetails?.gender ? user.additionalDetails.gender : "Add gender"}
                    </p>
                </div>
                <div className='w-[45%]'>
                    <p className='text-sm text-richblack-600'>Date of Birth</p>
                    <p className='text-sm'>
                        {user?.additionalDetails?.dateOfBirth 
                            ? formattedDate(user.additionalDetails.dateOfBirth)
                            : "Add date of birth"}
                    </p>
                </div>

            </div>


        </div>

    </div>
  )
}

export default MyProfile