import copy from 'copy-to-clipboard';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { FaCaretRight, FaShareSquare } from 'react-icons/fa';





const CourseDetailsCard = ({course, handleBuyCourse, setConfirmationModal}) => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {courseId} = useParams();



    const handleAddToCart = ()=>{
        console.log("handle add to cart clicked");
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You cannnot buy a course you are a instructor");
            return;
        }

        if(token){
            dispatch(addToCart(course));
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

    const handleShare = ()=>{
        copy(window.location.href);;
        toast.success("Link copied to clipboard");
    }



    const {
        thumbnail,
        price,
        instructions,

    } = course;


  return (
    <div className='flex flex-col items-center rounded-md p-5 lg:bg-richblack-700'>
        <img
            src={thumbnail}
            className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-xl object-cover md:max-w-full"
        />

        <div className='w-full flex flex-col px-2 py-5 gap-y-3'>
            <p className='text-3xl font-semibold'>Rs. {price}</p>

            <button 
                onClick={   
                    user && course?.studentsEnrolled.includes(user._id) 
                    ? ()=> navigate('/dashboard/enrolled-courses') 
                    : ()=> handleBuyCourse(course._id)
                }   
                className="bg-yellow-50 text-richblack-900 rounded-md font-semibold px-5 py-2"
            >
                {
                    user && course.studentsEnrolled.includes(user?._id)
                    ? "Go to course"
                    : "Buy Now" 
                }
            </button>
            

            {
                !course.studentsEnrolled?.includes(user?._id) && (
                    <button
                        onClick={handleAddToCart}
                        className='bg-richblack-800 rounded-md font-semibold px-5 py-2'
                    >
                        Add to cart
                        {/* Go to Cart */}
                    </button>
                )
            }




            <div className='hidden lg:block mt-3'>
                <p className='text-sm text-richblack-25 text-center mb-4'>30-Days Money Back Guarantee</p>
                <p className='text-xl font-semibold'>This course includes:</p>

                <div className='flex flex-col mt-1'>
                    {
                        instructions.map((item, index)=>(
                            <p key={index} className="flex items-center gap-2 text-caribbeangreen-300">
                                <FaCaretRight size={20}/>
                                <span>{item}</span>
                            </p>
                        ))
                    }
                </div>
            </div>


            <div className='flex flex-col mt-5'>
                <button 
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 text-yellow-100 hover:text-yellow-25 duration-200"
                >   <FaShareSquare/>
                    Share
                </button>
            </div>

        </div>


    </div>
  )
}

export default CourseDetailsCard