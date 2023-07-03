import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { BiChevronDown } from 'react-icons/bi';




const VideoDetailsSidebar = ({setReviewModal}) => {

    // for tracking which section is active
    const [activeStatus, setActiveStatus] = useState("");
    // for tracking which Lecture/video is active
    const [videobarActive, setVideobarActive] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures 
    } = useSelector((state)=> state.viewCourse)



    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length)
                return;
            
            // find current section id
            const currentSectionIndex = courseSectionData.findIndex(
                (data)=> data._id === sectionId
            )

            // find current sub-section id
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data)=> data._id === subSectionId
            )
 
            // find the current ID of video which is visible
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.
            [currentSubSectionIndex]?._id

            // set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current sub-section here
            setVideobarActive(activeSubSectionId);
        })()
    },[courseSectionData, courseEntireData, location.pathname])





  return (
    <>
        <div className='text-richblack-5'>
            {/* for button & heading */}
            <div className='flex flex-col gap-5'>
                {/* for button */}
                <div className='flex justify-between mt-5'>
                    <button onClick={()=> navigate("/dashboard/enrolled-courses")}
                        className='bg-richblack-5 text-richblack-800 px-5 py-2 rounded-lg'
                    >
                        Back
                    </button>

                    <div>
                        <IconBtn
                            text="Add Review"
                            onclick={()=> setReviewModal(true)}
                        />
                    </div>
                </div>

                {/* for heading and title */}
                <div>
                    <p>{courseEntireData?.courseName}</p>
                    <p className='text-richblack-300'>{completedLectures?.length}/ {totalNoOfLectures}</p>
                </div>
            </div>


            {/* for sections and sub-section */}
            <div>
                {
                    courseSectionData?.map((section, index)=> (
                        <div 
                            onClick={()=> setActiveStatus(section?._id)}
                            key={index}
                            className='my-1'
                        >       
                            {/* section */}
                            <div className='flex justify-between items-center bg-richblack-800 p-3'>
                                <div>
                                    {section?.sectionName}
                                </div>
                                {/* Hw --> add arrow icon here and handle rotate logic */}
                                <i className={activeStatus?.includes(section._id) ? "rotate-180" : "rotate-0"}>
                                    <BiChevronDown size={20}/>
                                </i>
                            </div>

                            {/* sub sections */}
                            <div className='w-full'>
                                {
                                    activeStatus === section?._id && (
                                        <div>
                                            {
                                                section?.subSection.map((topic,index)=>(
                                                    <div
                                                        className={`flex gap-5 px-5 py-2 ${
                                                            videobarActive === topic._id 
                                                            ? "bg-yellow-200 text-richblack-900"
                                                            : "bg-richblack-700 text-richblack-5"
                                                        }`}
                                                        key={index}
                                                        onClick={()=> {
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`);
                                                            setVideobarActive(topic?._id);
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={completedLectures.includes(topic._id)}
                                                            onChange={()=> {}}
                                                        />
                                                        <span>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>


        </div> 
    </>
  )
}

export default VideoDetailsSidebar
