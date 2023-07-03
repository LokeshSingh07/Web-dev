import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import IconBtn from '../../../common/IconBtn';
import { FiPlusCircle } from 'react-icons/fi';
import CoursesTable from './CoursesTable';






const MyCourses = () => {

    const {token} = useSelector((state)=> state.auth);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();


    useEffect(()=> {
        const fetchCourses = async()=>{
            const result = await fetchInstructorCourses(token);
            console.log("Result : ", result);
            if(result){
                setCourses(result);
            }
        }

        fetchCourses();
    },[]);



  return (
    <div className='text-richblack-5'>
        <div className='mb-14 flex items-center justify-between'>
            <h1 className='text-3xl'>My Course</h1>
            <IconBtn text="Add Course" onclick={()=> navigate("/dashboard/add-course")}>
                <FiPlusCircle/>
            </IconBtn>
        </div>

        {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
        }


    </div>
  )
}

export default MyCourses
