import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdNavigateNext } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseStep, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';




export default function PublishCourse() {

    const {register, handleSubmit, setValue, getValues} = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=> state.auth);
    const {course} = useSelector((state)=> state.course);
    const [loading ,setLoading] = useState(false);


    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true);
        }
    },[])


    const goBack = ()=>{
        dispatch(setStep(2));
    }

    const goToCourses = ()=>{
        dispatch(resetCourseStep())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async(data)=>{
        // if form not updated
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
        course?.status === COURSE_STATUS.DRAFT && getValues("public")===false){
            // no updation in form 
            // no need to make a API call
            goToCourses();
            return;
        }


        // if form updated
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true)
        // API call
        const result = await editCourseDetails(formData, token);
        if(result){
            goToCourses();
        }
        setLoading(false);
    }

    const onSubmit = ()=>{
        handleCoursePublish();
    }


  return (
    <div className='my-10 flex flex-col gap-y-7 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 text-richblack-5'>
        <h1 className='text-2xl font-semibold'>Publish Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className='flex items-center gap-2'>
                    <input
                        type='checkbox'
                        id='public'
                        {...register("public")}
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                    />

                    <p>Make this course Public</p>
                </label>
            </div>



            <div className='flex justify-end gap-x-3 mt-10'>
                {/* back button */}
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-700 py-[8px] px-[15px] font-semibold text-richblack-5`}
                >
                    Back
                </button>

                {/* publish course button */}
                <IconBtn disabled={loading} text="Save Changes">
                    <MdNavigateNext/>
                </IconBtn>

            </div>


        </form>
    </div>
  )
}
