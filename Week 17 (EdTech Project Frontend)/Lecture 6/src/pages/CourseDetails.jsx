import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiWorld } from 'react-icons/bi';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import Spinner from '../components/common/Spinner';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { formatDate } from '../services/formatDate';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { buyCourse } from '../services/operations/studentFeaturesApi';
import GetAvgRating from '../utils/avgRating';
import { ACCOUNT_TYPE } from '../utils/constants';
import Error from './Error';
import Footer from '../components/common/Footer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';





const CourseDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {loading} = useSelector((state)=> state.profile);
    const {paymentLoading} = useSelector((state)=> state.course);
    const {courseId} = useParams();
    const [confirmationModal, setConfirmationModal] = useState(null);



    // Fetch course details
    const [courseData, setCourseData] = useState(null);
    useEffect(()=>{
        const getCourseFullDetails = async()=>{
            try{
                const result = await fetchCourseDetails(courseId)
                setCourseData(result);
            }
            catch(err){
                console.log("Could not fetch course details...", err);
            }
        }

        getCourseFullDetails();
    },[courseId]);



    // Average Rating & Reviews
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    },[courseData])



    // Calculate total no. of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=>{
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((section)=>{
            lectures += section.subSection.length || 0;
        })
        setTotalNoOfLectures(lectures);

    },[courseData])


    
    // collapse all
    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id)=>{
        setIsActive(
            !isActive.includes(id) 
            ? isActive.concat(id)
            : isActive.filter((e)=> e != id)
        )
    }





    // To update -->
    const handleBuyCourse = ()=>{
        if(token && user.accountType === ACCOUNT_TYPE.STUDENT){
            buyCourse(token, [courseId], user, navigate, dispatch);
            console.log("handle buy course clicked");
            return;
        }

        if(token && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You cannnot buy a course you are a instructor");
            return;
        }

        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please logged in the purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: ()=> navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }


    if(loading || !courseData){
        return (
            <div>
                <Spinner/>
            </div>
        )
    }

    if(!courseData?.success){
        return (
            <div>
                <Error/>
            </div>
        )
    }


    const {
        _id: course_id,
        courseName, 
        courseDescription,
        category,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled, 
        createdAt,
    } = courseData.data?.courseDetails;



  return (
    <div className='text-richblack-5'>

        <section className='relative w-full bg-richblack-800 lg:py-10'>
            {/* hero section */}
            <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative '>
                <div className='mx-auto grid justify-items-center min-h-[400px] max-w-maxContentTab py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                    {/* <p className='text-richblack-300 text-start w-full mb-10'>
                        {`Home / Learning / `}
                        <span className='text-yellow-25'>{`${category?.name}`}</span>
                    </p> */}

                    <div className="relative block max-h-[30rem] lg:hidden shadow-[#161D29_0px_-64px_36px_-28px_inset]">
                        <img
                            src={thumbnail}
                            className="aspect-auto w-full"
                        />
                    </div>

                    <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg">
                        <p className='text-4xl sm:text-[42px] font-bold'>{courseName}</p>
                        <p className='text-richblack-300 text-[18px]'>{courseDescription}</p>
                        <div className='flex flex-wrap items-center text-[18px] space-x-2'>
                            <span>{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                            <span>{`(${ratingAndReviews.length} reviews)`}</span>
                            <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
                        </div>

                        <div className='text-[18px]'>
                            Created by 
                            <span className='capitalize'>{` ${instructor?.firstName} ${instructor?.lastName}`}</span>
                        </div>
                        <div className='flex flex-wrap items-center text-[18px] gap-5'>   
                            <p className='flex items-center gap-2'>
                                <HiOutlineInformationCircle/>
                                Created at {formatDate(createdAt)}
                            </p>
                            <p className='flex items-center gap-2'>
                                <BiWorld/>
                                English
                            </p>
                        </div>
                    </div>


                    <div className="w-full flex flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                        <p className="text-3xl space-x-3 pb-4 font-semibold">
                            Rs. {price}
                        </p>
                        <button 
                            onClick={   
                                user && studentsEnrolled.includes(user._id) 
                                ? ()=> navigate('/dashboard/enrolled-courses') 
                                : ()=> handleBuyCourse(course_id)
                            }   
                            className="bg-yellow-50 text-richblack-900 rounded-md font-semibold px-5 py-2"
                        >
                            {
                                user && studentsEnrolled.includes(user?._id)
                                ? "Go to course"
                                : "Buy Now" 
                            }
                        </button>
                        {
                            !studentsEnrolled?.includes(user?._id) && (
                                <button
                                    // onClick={handleAddToCart}
                                    className='bg-richblack-700 rounded-md font-semibold px-5 py-2'
                                >
                                    Add to cart
                                    {/* Go to Cart */}
                                </button>
                            )
                        }
                    </div>


                </div>

                {/* courses Card */}
                <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] lg:absolute lg:block'>
                    <CourseDetailsCard 
                        course={courseData?.data?.courseDetails}
                        handleBuyCourse={handleBuyCourse}
                        setConfirmationModal={setConfirmationModal}
                    />
                </div>
            
            </div>

        </section>



        <div className='mx-auto box-content px-4 lg:w-[1260px]'>
            <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                <div className='my-8 border border-richblack-800 p-8'> 
                    <p className="text-3xl font-semibold mb-5">What you'll Learn</p>
                    <div>
                        <ReactMarkdown>  </ReactMarkdown>
                        {whatYouWillLearn}
                    </div>
                </div>

                {/* Course Content Section */}
                <div className='max-w-[830px]'>
                    <div className="flex flex-col gap-3">
                        <p className="text-[28px] font-semibold">Course Content:</p>
                        <div className='flex flex-wrap justify-between gap-x-3'>
                            <div className='flex gap-x-3'>
                                <span>{courseContent.length} section(s)</span>
                                <span>{totalNoOfLectures} Lectures</span>
                                <span>{courseData.data?.totalDuration} total length</span>
                            </div>

                            <div>
                                <button
                                    onClick={()=> setIsActive([])}
                                    className="text-yellow-50 hover:text-yellow-100"
                                >
                                    Collapse all sections
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Course Details Accordion */}
                    <div className="py-4">
                        {courseContent?.map((section, index)=>(
                            <CourseAccordionBar
                                course={section}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                            />
                        ))}
                    </div>


                    {/* Author details */}
                    <div className="mb-12 py-4">
                        <p className="text-[28px] font-semibold">Author</p>
                        <div className="flex items-center gap-4 py-4">
                            <img
                                src={instructor.image}
                                className="h-14 w-14 rounded-full object-cover"
                            />
                            <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>
                        <p className="text-richblack-50">{instructor?.additionalDetails?.about}</p>
                    </div>


                </div>

            </div>



        </div>




        <Footer/>
        

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

    </div>
  )
}

export default CourseDetails