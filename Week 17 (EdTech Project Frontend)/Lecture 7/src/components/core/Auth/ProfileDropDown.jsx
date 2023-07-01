import React, { useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { AiOutlineCaretDown } from 'react-icons/ai';
import {VscDashboard, VscSignOut} from 'react-icons/vsc'
import { logout } from '../../../services/operations/authAPI';




const ProfileDropDown = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state)=> state.profile);
  const [open, setOpen] = useState();
  const ref = useRef(null);

  useOnClickOutside(ref, ()=> setOpen(false));

  if(!user){
    return null
  }


  return (
    <button onClick={()=> setOpen(true)} 
      className='text-richblack-100 relative'
    >
      <div className='flex items-center gap-x-1'>
        <img src={user?.image}
          alt={`profile-${user?.firstName}`}
          className='aspect-square w-[30px] rounded-full object-cover'
        />
        <AiOutlineCaretDown className='text-sm'/>
      </div>


      {
        open && (
          <div onClick={(e)=> e.stopPropagation()}
            className='absolute top-[118%] right-0 z-[100] divide-y-[1px] divide-richblack-700 
            overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
            ref={ref}
          >
            <Link to="/dashboard/my-profile" onClick={()=> setOpen(false)}>
              <div className='flex w-full items-center gap-x-1 px-[10px] py-[12px] text-sm hover:bg-richblack-700 hover:text-richblack-25'>
                <VscDashboard className="text-lg"/>
                dashboard
              </div>
            </Link>

            <div onClick={()=>{
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className='flex w-full items-center gap-x-1 px-[10px] py-[12px] text-sm hover:bg-richblack-700 hover:text-richblack-25'
            >
              <VscSignOut className='text-lg'/>
              Logout
            </div>

          </div>
        )
      }
      
    </button>
  )
}

export default ProfileDropDown