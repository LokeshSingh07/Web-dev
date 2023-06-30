import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'



const Settings = () => {
  return (
    <div className='text-richblack-5'>
        <h1 className='mb-14 text-3xl'>Edit Profile</h1>


        {/* Change Profile Picture */}
        <ChangeProfilePicture/>

        {/* Profile */}
        <EditProfile/>

        {/* Password */}
        <UpdatePassword/>

        {/* Delete Account */}
        <DeleteAccount/>


    </div>
  )
}

export default Settings