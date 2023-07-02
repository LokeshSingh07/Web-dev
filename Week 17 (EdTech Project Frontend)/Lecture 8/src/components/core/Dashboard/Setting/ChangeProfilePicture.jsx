import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';
import { FiUpload } from 'react-icons/fi';
import { useEffect } from 'react';






const ChangeProfilePicture = () => {

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=> state.profile);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);


    const fileInputRef = useRef(null);

    const handleClick = ()=>{
        fileInputRef.current.click();
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        console.log(file);
        if(file){
            setImageFile(file);
            previewFile(file);
        }
    }

    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setPreviewSource(reader.result);
        }
    }


    const handleFileUpload = ()=>{
        try{
            console.log("Uploading...");
            setLoading(true);

            const formData = new FormData();
            formData.append("displayPicture", imageFile);

            dispatch(updateDisplayPicture(token, formData)).then(()=>{
                setLoading(false);
            })

        }
        catch(err){
            console.log("Error message : ", err.message);
        }
    }



    useEffect(()=>{
        if(imageFile){
            previewFile(imageFile);
        }
    },[imageFile])







  return (
    <div className='flex flex-row items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5 '>
        <div className='flex items-center gap-x-4'>
            <img 
                src={previewSource || user?.image}
                alt={`profile-${user?.firstName}`}
                className='aspect-square w-[80px] rounded-full object-cover'
            />

            <div className='space-y-2'>
                <p>Change Profile Picture</p>
                
                <div className='flex flex-row gap-3'>
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                        accept="image/png, image/gif, image/jpeg, image/jpg"
                    />
                    <button 
                        onClick={handleClick}
                        disabled={loading}
                        className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                    >
                        Select
                    </button>

                    <IconBtn
                        text={loading ? "Uploading..." : "Upload"}
                        onclick={handleFileUpload}
                    >
                        {
                            !loading && (
                                <FiUpload className='text-lg text-richblack-900'/>
                            )
                        }
                    </IconBtn>
                </div>
            </div>
        </div>
    
    
    
    </div>
  )
}

export default ChangeProfilePicture