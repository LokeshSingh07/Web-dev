import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../../components/common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';



const Course_Card = ({course, height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    
    
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);

    },[course]);




  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div className='flex flex-col gap-6'>
                <div>
                    <img 
                        src={course.thumbnail}
                        className={`rounded-lg w-full ${height} object-cover`}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <p>{course?.courseName}</p>
                    <p className='text-richblack-300'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className='flex space-x-2 text-yellow-100'>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span className='text-richblack-300'>{course.ratingAndReviews.length} Ratings</span>
                    </div>
                    <p className='text-xl'>Rs.{" "} {course?.price}</p>
                </div>

            </div>
        </Link>
    </div>
  )
}

export default Course_Card
