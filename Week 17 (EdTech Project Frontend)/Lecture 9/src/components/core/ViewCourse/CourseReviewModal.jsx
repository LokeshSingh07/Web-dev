import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from 'react-icons/gi';
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';


const CourseReviewModal = ({setReviewModal}) => {

  const {user} = useSelector((state)=> state.profile)
  const {token} = useSelector((state)=> state.auth)
  const {courseEntireData} = useSelector((state)=> state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors} 
  } = useForm();



  useEffect(()=>{
    setValue("courseExperience", "");
    setValue("courseRating", 0)
  },[])



  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }


  const onSubmit = async(data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )

    setReviewModal(null);
  }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto text-white bg-richblack-900 bg-opacity-10 backdrop-blur-sm'>
      <div className='w-[500px] bg-richblack-900 rounded-lg'>
        {/* Modal Header */}
        <div className='flex items-center justify-between bg-richblack-700 rounded-t-lg px-5 py-3 mb-5'>
          <p>Add Review</p>
          <button onClick={()=> setReviewModal(null)}>
            <RxCross1 size={20}/>
          </button>
        </div>

        {/* Modal body */}
        <div className='grid place-items-center pb-5'>
          <div className='flex items-center gap-5 mb-4'>
            <img
              src={user?.image}
              alt="user-image"
              className='w-14 h-14 rounded-full object-cover aspect-square'
            />
            <div>
              <p className='capitalize'>{user?.firstName} {user?.lastName}</p>
              <p className='text-richblack-300'>Posting publicly</p>
            </div>
          </div>
      

          <form onSubmit={handleSubmit(onSubmit)}
            className='w-[90%] flex flex-col items-center gap-4'
          > 
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              emptyIcon={<GiNinjaStar/>}
              fullIcon={<GiNinjaStar/>}
              activeColor="#ffd700"
            />

            <div className='w-full flex flex-col gap-2'>
              <label htmlFor='courseExperience'>
                Add Your Experience <sup className='text-pink-200'>*</sup>
              </label>
              <textarea
                rows={4}
                id="courseExperience"
                placeholder="Add Your Experience here"
                {...register("courseExperience", {required: true})}
                className='form-style'
              />
              {
                errors.courseExperience && (
                  <span className='text-pink-200'>Please add your Experience</span>
                )
              }
            </div>

            {/* Cancel and Save button */}
            <div className='w-full flex justify-end gap-3'>
              <button onClick={()=> setReviewModal(null)} className='bg-richblack-800 rounded-lg p-3 '>
                Cancel
              </button>
              <IconBtn
                text="Save"
              />
            </div>
          </form>


        </div>

      </div>
    </div>
  )
}

export default CourseReviewModal
