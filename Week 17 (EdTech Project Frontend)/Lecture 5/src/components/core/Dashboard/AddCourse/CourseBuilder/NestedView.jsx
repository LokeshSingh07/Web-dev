import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import { HiChevronDown } from 'react-icons/hi'










const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();


    const [addSubSection,setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);


    const handleDeleteSection = async(sectionId)=>{
        const result = await deleteSection(
            {
                sectionId,
                courseId: course._id,
            }, token
        )

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async(subSectionId, sectionId)=>{
        const result = await deleteSubSection(
            {
                subSectionId, sectionId
            }, token
        )

        if(result){
            const updatedCourseContent = course.courseContent.map((section)=> 
            section._id === sectionId ? result : section);
            const updatedCourse = {...course, courseContent: updatedCourseContent}; 
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }



    useEffect(()=>{
        console.log(course?.courseContent);
    },[course])
  

           

  return (
    <div>
        <div className='text-richblack-25 bg-richblack-700 rounded-lg p-6 px-8'>
            {
                course?.courseContent?.map((section)=>(
                    <details key={section._id} open>
                        {/* Render Section */}
                        <summary className='flex items-center justify-between cursor-pointer gap-x-3 border-b-2 border-b-richblack-600 py-4'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu size={20}/>
                                <p className='text-[16px] font-semibold'>{section.sectionName}</p>
                            </div>  

                            <div className='flex items-center gap-x-3 text-richblack-100'>
                                {/* Edit section name button */}
                                <button
                                    onClick={()=> handleChangeEditSectionName(section._id, section.sectionName)}
                                    className='transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'
                                >
                                    <MdEdit size={20}/>
                                </button>

                                {/* delete section button */}
                                <button     
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this Section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: ()=> handleDeleteSection(section._id),
                                            btn2Handler: ()=> setConfirmationModal(null),
                                        })
                                    }}
                                    className='transition-all duration-200 hover:scale-110 hover:text-[#ff0000]'
                                >
                                    <RiDeleteBin6Line size={20}/>
                                </button>

                                {/* | */}
                                <span className='text-richblack-300'>|</span>

                                {/* down arrow */}
                                <span className='transition-all duration-200 hover:scale-110 hover:text-richblack-5'>
                                    <HiChevronDown size={20}/>
                                </span>
                            </div>
                        </summary>

                        {/* Render Sub Section */}
                        <div className='px-6 pb-4'>
                            {
                                section?.subSection?.map((data)=>(
                                    <div 
                                        key={data?._id}
                                        onClick={()=> setViewSubSection(data)}
                                        className="flex items-center justify-between cursor-pointer gap-x-3 border-b-2 border-b-richblack-600 py-3"
                                    >
                                        <div className='flex items-center gap-x-3'>
                                            <RxDropdownMenu size={20}/>
                                            <p className='text-[14px] font-semibold'>{data.title}</p>
                                        </div>

                                        <div 
                                            onClick={(e)=> e.stopPropagation()} 
                                            className='flex items-center gap-x-3 text-richblack-100'
                                        >
                                            {/* edit sub-section button */}
                                            <button
                                                onClick={()=> setEditSubSection({...data, sectionId: section._id})}
                                                className='transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'
                                            >
                                                <MdEdit size={20}/>
                                            </button>

                                            {/* delete sub-section button */}
                                            <button 
                                                onClick={()=>{
                                                    setConfirmationModal({
                                                        text1: "Delete this Sub Section",
                                                        text2: "Selected lecture will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: ()=> handleDeleteSubSection(data._id, section._id),
                                                        btn2Handler: ()=> setConfirmationModal(null),
                                                    })
                                                }}
                                                className='transition-all duration-200 hover:scale-110 hover:text-[#ff0000]'
                                            >
                                                    <RiDeleteBin6Line size={20}/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }


                            {/* Add Lecture -- [sub-section] buttton */}
                            <button 
                                onClick={()=> setAddSubSection(section._id)}
                                className="mt-3 flex items-center gap-x-2 text-yellow-50"
                            >
                                <AiOutlinePlus size={20}/>
                                Add Lecture
                            </button>
                        </div>
                    </details>
                ))
            }


        </div>    




        {
            addSubSection ? (<SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            />) 
            : viewSubSection ? (<SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            />) 
            : editSubSection ? (<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
            />) 
            : (<div></div>)
        }


        {
            confirmationModal ? 
            (<ConfirmationModal modalData={confirmationModal}/>) : 
            (<div></div>)
        }

    </div>
  )
}

export default NestedView