import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay, Pagination, Navigation } from "swiper";
import ReactStars from "react-rating-stars-component";
import { APIConnector } from '../../services/APIConnector';
import { ratingEndpoints } from '../../services/APIS';
import { GiNinjaStar } from 'react-icons/gi';




const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;



    useEffect(()=>{
        const fetchAllReviews = async()=>{
            const response = await APIConnector("GET", ratingEndpoints.REVIEW_DETAILS_API);
            console.log("RATING_API response...", response);

            if(response?.data?.success){
                setReviews(response.data.data);
            }
            console.log("Printing reviews: ", reviews)

        }
        fetchAllReviews();
    },[])





    
  return (
    <div className='w-full'>
        <div>
            <Swiper
                loop={true}
                spaceBetween={40}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                    700: {slidesPerView: 2},
                    900: {slidesPerView: 3},
                    1124: {slidesPerView: 4}
                }}
            >
                {
                    reviews.map((review, index)=>(
                        <SwiperSlide key={index} className='flex flex-col gap-2 bg-richblack-800 rounded-lg p-5'>
                            <div className='flex items-center gap-4'>
                                <img 
                                    src={review?.user?.image}
                                    alt='Profile pic'
                                    className='w-14 h-14 rounded-full object-cover'
                                />
                                <div>
                                    <p className=''>{review?.user?.firstName} {review?.user?.lastName}</p>
                                    <p className='text-sm text-richblack-300'>
                                        {review?.course?.courseName.split(" ").splice(0, 8).join(" ")} ...
                                    </p>
                                </div>
                            </div>

                            <p className="">{review?.review.split(" ").splice(0, 15).join(" ")}</p>

                            <div className='flex items-center gap-2'>
                                <p className='text-yellow-50'>{review?.rating.toFixed(1)}</p>
                                <ReactStars
                                    count={5}
                                    value={review.rating}
                                    size={24}
                                    edit={false}
                                    emptyIcon={<GiNinjaStar/>}
                                    fullIcon={<GiNinjaStar/>}
                                />
                            </div>

                            
                        </SwiperSlide>
                    ))
                }

            </Swiper>

        </div>
                
      
    </div>
  )
}

export default ReviewSlider
