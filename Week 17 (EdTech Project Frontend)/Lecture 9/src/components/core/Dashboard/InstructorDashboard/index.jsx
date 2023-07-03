import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import Spinner from '../../../common/Spinner';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';







const Instructor = () => {

    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([])



    useEffect(()=>{
        const getCourseDataWithStats = async()=>{
            setLoading(true);
            const instructorAPIData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorAPIData);

            if(instructorAPIData){
                setInstructorData(instructorAPIData);
            }
            if(result){
                setCourses(result);
            }

            setLoading(false);
        }

        getCourseDataWithStats();
    },[])



    const totalAmount = instructorData?.reduce((acc, curr)=> acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr)=> acc + curr.totalStudentsEnrolled, 0);



  return (
    <div className='text-richblack-5'>
        
        <div className='mb-5'>
            <h1 className='text-[18px] font-semibold'>Hi {user?.firstName} 👋</h1>
            <p className='text-richblack-300'>Let's start something new</p>
        </div>

        {
            loading  
            ?(<Spinner/>)
            :courses.length > 0 
              ? (<div className='flex flex-col gap-5'>
                    {/* Chart and Stats */}
                    <div>
                        <div className='flex flex-col lg:flex-row gap-5'>
                            <div className='w-full lg:w-[75%] bg-richblack-800 rounded-md'>
                                <InstructorChart courses={instructorData}/>
                            </div>

                            <div className='flex flex-1 flex-col gap-y-3 bg-richblack-800 p-5 rounded-md'>
                                <p className='text-[18px] font-semibold'>Statistics</p>
                                <div>
                                    <p className='text-richblack-300'>Total courses</p>
                                    <p className='text-[20px] font-semibold'>{courses.length}</p>
                                </div>
                                <div>
                                    <p className='text-richblack-300'>Total Students</p>
                                    <p className='text-[20px] font-semibold'>{totalStudents}</p>
                                </div>
                                <div>
                                    <p className='text-richblack-300'>Total Income</p>
                                    <p className='text-[20px] font-semibold'>Rs. {totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Render 3 Courses */}
                    <div className=' bg-richblack-800 p-5 rounded-md'> 
                        <div className='flex justify-between mb-2'>
                            <p className='text-[17px] font-semibold'>Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p className='text-yellow-100 hover:text-yellow-50'>View all</p>
                            </Link>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                            {
                                courses.slice(0,3).map((course)=> (
                                    <div className='rounded-lg'>
                                        <img
                                            src={course.thumbnail}
                                            className='w-full h-[200px] object-cover rounded-lg'
                                        />
                                        <div className='mt-5'>
                                            <p>{course.courseName.split(" ").splice(0,6).join(" ")}...</p>
                                            <div className='flex items-center gap-x-2 text-richblack-300'>
                                                <p>{course.studentsEnrolled.length} student(s)</p>
                                                <p>|</p>
                                                <p>Rs. {course.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
              </div>)
              : (<div>
                    <p>You have not created any courses yet</p>
                    <Link to="/dashboard/add-course">
                        Create a course
                    </Link>
              </div>)
        }


    </div>
  )
}

export default Instructor
