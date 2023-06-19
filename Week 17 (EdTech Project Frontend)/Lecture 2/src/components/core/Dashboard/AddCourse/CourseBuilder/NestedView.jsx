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
            // extra kya kr sakte h yaha pr
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
        <div>
            {
                course?.courseContent?.map((section)=>(
                    <details key={section._id} open>
                        {/* Render Section */}
                        <summary className='flex items-center justify-between gap-x-3 '>
                            <div className='flex items-end gap-x-3'>
                                <RxDropdownMenu/>
                                <p>{section.sectionName}</p>
                            </div>  
                            <div className='flex items-center gap-x-3'>
                                {/* Edit section name button */}
                                <button
                                    onClick={()=> handleChangeEditSectionName(section._id, section.sectionName)}
                                >
                                    <MdEdit/>
                                </button>

                                {/* delete section button */}
                                <button onClick={()=>{
                                    setConfirmationModal({
                                        text1: "Delete this Section",
                                        text2: "All the lectures in this Section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: ()=> handleDeleteSection(section._id),
                                        btn2Handler: ()=> setConfirmationModal(null),
                                    })
                                }}>
                                    <RiDeleteBin6Line/>
                                </button>

                                {/* down arrow */}
                                <span>
                                    <HiChevronDown className='text-xl text-richblack-300'/>
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
                                        className="flex items-center justify-between gap-x-3 border-b-2 px-5"
                                    >
                                        <div className='flex items-center gap-x-3'>
                                            <RxDropdownMenu/>
                                            <p>{data.title}</p>
                                        </div>

                                        <div 
                                            onClick={(e)=> e.stopPropagation()} 
                                            className='flex items-center gap-x-3'
                                        >
                                            {/* edit sub-section button */}
                                            <button
                                                onClick={()=> setEditSubSection({...data, sectionId: section._id})}
                                            >
                                                <MdEdit/>
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
                                                }}>
                                                    <RiDeleteBin6Line/>
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
                                <AiOutlinePlus/>
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