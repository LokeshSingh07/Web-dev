import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../common/Spinner';
import ProgressBar from '@ramonak/react-progress-bar';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';





const EnrolledCourse = () => {

    const navigate = useNavigate();
    const {token} = useSelector((state)=> state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState('');



    const getEnrolledCourses = async()=>{
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(err){
            console.log("Unable to Fetch enrolled courses");
        }
    }



    useEffect(()=>{
        getEnrolledCourses();
    },[])


  return (
    <div className='text-richblack-5'>
        <div className='text-3xl'>Enrolled Courses</div>

        {
            !enrolledCourses ? 
            (<Spinner/>) : 
            (
                !enrolledCourses.length ? 
                (<p className='grid place-content-center h-[10vh]'>
                    You have not enrolled in any course yet
                </p>) : 
                (<div className='my-8'>
                    <div className='flex rounded-t-lg bg-richblack-600'>
                        <p className='w-[45%] px-5 py-3'>Course Name</p>
                        <p className='w-1/4 px-2 py-3'>Durations</p>
                        <p className='flex-1 px-2 py-3'>Progress</p>
                    </div>
                    {
                        enrolledCourses.map((course, index, arr)=>(
                            <div key={index} 
                                className={`flex items-center border border-richblack-700 ${
                                    index === arr.length-1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                            >
                                <div  
                                    onClick={()=> {
                                        navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                                    }}
                                    className='w-[45%] flex items-center cursor-pointer gap-4 px-5 py-3'
                                >
                                    <img src={course.thumbnail} className="w-[50px] h-[50px] rounded-lg object-cover"/>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold'>{course.courseName}</p>
                                        <p className='text-xs text-richblack-300'>
                                            {course.courseDescription.length > 50 
                                                ? `${course.courseDescription.slice(0, 50)}...`
                                                : course.courseDescription 
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                                <div className='w-1/4 px-2 py-3'>
                                    {course?.totalDuration}
                                </div>

                                <div className='flex flex-col w-1/5 gap-2 px-2 py-3'>
                                    <p>Progress : {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>

                            </div>
                        ))
                    }
                </div>)
            )
        }

    </div>
  )
}

export default EnrolledCourse