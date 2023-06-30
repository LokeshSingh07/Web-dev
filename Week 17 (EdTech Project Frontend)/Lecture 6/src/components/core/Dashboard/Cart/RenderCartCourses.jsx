import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from 'react-icons/gi'
import { removeFromCart } from '../../../../slices/cartSlice';
import { RiDeleteBin6Line } from 'react-icons/ri';



const RenderCartCourses = () => {

    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();


  return (
    <div className='flex flex-col gap-y-12'>
        {
            cart.map((course, index)=>(
                <div key={index} className='flex justify-between gap-x-5'>
                    {/* left side */}
                    <div className='flex space-x-3'>
                        <img 
                            src={course?.thumbnail}
                            className='w-[200px] rounded-md object-cover' 
                        />
                        <div className='flex flex-col space-y-2'>
                            <p className='text-lg'>{course?.courseName}</p>
                            <p className='text-richblack-300'>{course?.category?.name}</p>
                            <div className='flex items-center space-x-2 text-yellow-50'>
                                <span>4.8</span>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    edit={false}
                                    activeColor="ffd700"
                                    emptyIcon={<GiNinjaStar/>}
                                    fullIcon={<GiNinjaStar/>}
                                />

                                <span>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className=''>
                        <button onClick={()=> dispatch(removeFromCart(course._id))}
                            className='flex items-center gap-2 rounded-md bg-richblack-800 text-pink-300 hover:text-[#ff0000] p-2'
                        >   
                            <RiDeleteBin6Line size={20}/>
                            <span>Remove</span>
                        </button>

                        <p className='text-2xl text-yellow-50'>Rs <span>{course?.price}</span></p>
                    </div>


                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses