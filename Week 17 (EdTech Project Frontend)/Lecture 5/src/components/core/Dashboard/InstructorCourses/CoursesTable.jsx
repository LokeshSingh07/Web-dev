import React, { useState } from 'react'
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { COURSE_STATUS } from '../../../../utils/constants';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { HiClock } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { formatDate } from '../../../../services/formatDate'




export default function CoursesTable({courses, setCourses}) {

    const navigate = useNavigate();
    const {token} = useSelector((state)=> state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const TRUNCATE_LENGTH = 30;



    const handleCourseDelete = async(courseId)=>{
        setLoading(true);

        console.log("courseId", courseId);

        await deleteCourse({courseId: courseId}, token);

        const result = await fetchInstructorCourses(token);
        
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }








  return (
    <div>
        <Table className="rounded-xl border border-richblack-800 ">
            <Thead>
                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 text-richblack-100 px-6 py-3">
                    <Th className="flex-1 text-left text-sm uppercase">Courses</Th>
                    <Th className="text-left text-sm uppercase">duration</Th>
                    <Th className="text-left text-sm uppercase">Price</Th>
                    <Th className="text-left text-sm uppercase">Actions</Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length === 0 ? 
                    (<Tr>
                        <Td className="py-10 text-center text-2xl text-richblack-100">
                            No Courses Found
                        </Td>
                    </Tr>) : 
                    (
                        courses?.map((course)=>(
                            <Tr key={course._id} className="flex gap-x-10 border-richblack-800 px-6 py-8">
                                {/* Image & desciption of course */}
                                <Td className="flex flex-1 gap-x-4">
                                    <img 
                                        src={course?.thumbnail}
                                        className='h-[150px] w-[220px] rounded-lg object-cover'
                                    />

                                    <div className='flex flex-col justify-between'>
                                        <p className='text-lg font-semibold'>
                                            {course?.courseName}
                                        </p>

                                        {/* course description */}
                                        <p className='text-sm text-richblack-200'>
                                            {
                                                course?.courseDescription.split(" ").length > TRUNCATE_LENGTH 
                                                    ? course?.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..." 
                                                    : course.courseDescription
                                            }
                                        </p>

                                        <p className='text-[12px] text-richblack-25'>Created: {formatDate(course.createdAt)}</p>

                                        {/* Course STATUS */}
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? 
                                            (<div className='flex flex-row items-center w-fit gap-x-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] text-pink-300'>
                                                <HiClock size={14}/>
                                                <p>DRAFT</p>
                                            </div>) : 
                                            (<div className='flex flex-row items-center w-fit gap-x-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] text-yellow-100'>
                                                <div className='w-3 h-3 flex items-center justify-center rounded-full bg-yellow-100 text-richblack-700'>
                                                    <FaCheck size={8}/>
                                                </div>
                                                <p>PUBLISHED</p>
                                            </div>)
                                        }
                                    </div>
                                </Td>

                                {/* Duration */}
                                <Td className="text-sm font-medium text-richblack-100">
                                    2hr 35min
                                </Td>

                                {/* Price */}
                                <Td className="text-sm font-medium text-richblack-100">
                                    ₹{course?.price}
                                </Td>

                                {/* Actions */}
                                <Td className="text-sm font-medium text-richblack-100">
                                    <button disabled={loading} 
                                        onClick={()=> navigate(`/dashboard/edit-course/${course._id}`)}
                                        title="Edit"
                                        className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'
                                    >    
                                        <MdEdit size={20}/>
                                    </button>

                                    <button 
                                        disabled={loading}
                                        onClick={()=> {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2: "All the data related to this coursewill be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading 
                                                    ? ()=> handleCourseDelete(course._id) 
                                                    : ()=>{},
                                                btn2Handler: !loading 
                                                    ? ()=> setConfirmationModal(null) 
                                                    : ()=> {},
                                            })
                                        }}
                                        title='Delete'
                                        className='px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]'
                                    >
                                        <RiDeleteBin6Line size={20}/>
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
    
        

        {
            confirmationModal && (<ConfirmationModal modalData={confirmationModal}/>)
        }



    </div>
  )
}
