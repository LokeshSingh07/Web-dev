import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../common/Spinner';
import ProgressBar from '@ramonak/react-progress-bar';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';





const EnrolledCourse = () => {

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
                    <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>
                    {
                        !enrolledCourses.map((course, index)=>(
                            <div key={index}>
                                <div>
                                    <img src={course.thumbnail}/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
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