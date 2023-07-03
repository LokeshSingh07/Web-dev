import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../../../data/dashboard-links';
import {logout} from '../../../services/operations/authAPI';
import Spinner from '../../common/Spinner';
import SidebarLink from './SidebarLink';
import { FiLogOut } from 'react-icons/fi'
import ConfirmationModal from '../../common/ConfirmationModal';









const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loading: profileLoading} = useSelector((state)=>state.profile);
  const {loading:authLoading} = useSelector((state)=>state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);


  if(profileLoading || authLoading){
    return(
      <Spinner/>
    )
  }





  return (
    <div className='flex flex-col min-w-[220px] border-r-[1px] border-richblack-700
    h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
      
      <div className='flex flex-col'>
        {
          sidebarLinks.map((link)=>{
            if(link.type && user?.accountType !== link.type){
              return null
            }
            return(
              <SidebarLink key={link.id} link={link} iconName={link.icon}/>
            )
          })
        }
      </div>



      {/* horizontal bar */}
      <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

        

      {/* setting & logout */}
      <div className='flex flex-col'>
        <SidebarLink 
          link={{name: "Settings", path:"dashboard/settings"}} 
          iconName={"VscSettingsGear"}
        />        

        <button
          onClick={()=> setConfirmationModal({
            text1:"Are You Sure?",
            text2:"You will be Logged out of your Account",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: ()=> dispatch(logout(navigate)),
            btn2Handler: ()=> setConfirmationModal(null),
          })}
          className="text-sm font-medium text-richblack-300"
        >
          <div className='flex items-center px-8 p-2 gap-x-2'>
            <FiLogOut fontSize={20}/>
            Logout
          </div>
        </button>
      </div>


      {
        confirmationModal && (
          <ConfirmationModal modalData={confirmationModal}/>
        )
      }



    </div>
  )
}

export default Sidebar