import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';





const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(null);
    const {courseId} = useParams();
    const {token} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();



    useEffect(()=>{
        const setCourseSpecificDetails = async() =>{
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((section)=>{
                lectures += section.subSection.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpecificDetails();
    },[courseId])


    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <div className='w-[150px] sm:w-[300px] lg:w-[20%]'>
                <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            </div>

            <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <div className='mx-auto w-11/12  py-10'>
                    <Outlet/>
                </div>
            </div>


            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}

        </div>
    )
}

export default ViewCourse
