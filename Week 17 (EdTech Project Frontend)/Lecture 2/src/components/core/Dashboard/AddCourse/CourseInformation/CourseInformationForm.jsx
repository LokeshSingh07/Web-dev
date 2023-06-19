import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import ChipInput from './ChipInput';
import Upload from '../Upload';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { toast } from 'react-hot-toast';




const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors},
    } = useForm();


    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=> state.auth);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);




    useEffect(()=>{
        const getCategories = async ()=>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
            }

            setLoading(false);
        }

        if(editCourse){
            setValue('courseTitle', course.courseName);
            setValue('courseShortDesc', course.courseDescription);
            setValue('coursePrice', course.price);
            setValue('courseTags', course.tag);
            setValue('courseBenefits', course.whatYouWillLearn);
            setValue('courseCategory', course.category);
            setValue('courseImage', course.thumbnail);
            setValue('courseRequirements', course.instructions);
        }

        getCategories();
    },[])



    const isFormUpdated = ()=>{
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
            )
            return true
        else
            return false
    }



    // handle next button click
    const onSubmit = async(data)=>{
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
    
                formData.append("courseId", course._id);
                
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle);
                }
                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice);
                }
                if(currentValues.courseTags.toString() !== course.tag.toString()){
                    formData.append("tags", JSON.stringify(data.courseTags));
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", data.courseCategory)
                }
                if(currentValues.courseImage !== course.thumbnail){
                    formData.append("thumbnailImage", data.courseImage);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
    
    
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No Changes made to the form")
            }
            return
        }



        // create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tag", data.courseTags);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("thumbnailImage", data.courseImage);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);


        setLoading(true);
        const result = await addCourseDetails(formData, token);
        console.log("Result" , result);
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);


    }




  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className='my-10 flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 text-richblack-5 '
    >

        {/* Course Name */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='courseTitle' className='label-style'>
                Course Title <sup className='text-pink-200'>*</sup>
            </label>
            <input
                type="text"
                name="courseTitle"
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required:true})}
                className='form-style'
            />
            {
                errors.courseTitle && (
                    <span className='mt-1 text-[12px] text-pink-200'>
                        Please enter your Course Name
                    </span>
                )
            }
        </div>

        {/* Course Short Description */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='courseShortDesc' className='label-style'>
                Course Short Description <sup className='text-pink-200'>*</sup>
            </label>
            <textarea
                rows={4}
                name="courseShortDesc"
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
                className='form-style'
            />
            {
                errors.courseShortDesc && (
                    <span className='mt-1 text-[12px] text-pink-200'>
                        Please enter course Description
                    </span>
                )
            }
        </div>

        
        {/* Price */}
        <div className='flex flex-col gap-2 relative'>
            <label htmlFor='coursePrice' className='label-style'>
                Course Price <sup className='text-pink-200'>*</sup>
            </label>
            <input
                name="coursePrice"
                id='coursePrice'
                placeholder='Enter Price'
                {...register("coursePrice", 
                    {
                        required: true,
                        valueAsNumber: true,
                        pattern: {
                            value : /^(0|[1-9]\d*)(\.\d+)?$/,
                        },
                    }
                )}
                className='form-style pl-12'
            />
            
            <HiOutlineCurrencyRupee className='absolute left-3 top-[43px] z-[10] cursor-pointer' fontSize={20}/>

            {
                errors.coursePrice && (
                    <span className='mt-1 text-[12px] text-pink-200'>
                        Please enter your Course Price
                    </span>
                )
            }
        </div>


        {/* Category */}
        <div className='flex flex-col gap-2 relative'>
            <label htmlFor='courseCategory' className='label-style'>
                Course Category <sup className='text-pink-200'>*</sup>
            </label>

            <select
                id="courseCategory"
                defaultValue=""
                {...register("courseCategory", {required: true})} 
                className='form-style'
            >
                <option value="" disabled>Choose a category</option>

                {
                    !loading && courseCategories.map((category, index)=> (
                        <option key={index} value={category?._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>

            {
                errors.courseCategory && (
                    <span className='mt-1 text-[12px] text-pink-200'>
                        Please enter your Course Category
                    </span>
                )
            }
        </div>


        {/* Tags */}
        {/* Create a custom component for handling tags input */}
        <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />



        
        {/* Course Thumbnail */}
        {/* Create an component for uploading and showing preview of media */}
        <Upload
            label="Course Thumbnail"
            name="courseImage"
            register={register}
            errors={errors}
            setValue={setValue}
            editData={editCourse ? course?.thumbnail : null}
        />




        {/* Benefits of the Course */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='courseBenefits' className='label-style'>
                Benefits of the Course <sup className='text-pink-200'>*</sup>
            </label>
            <textarea
                rows={4}
                name="courseBenefits"
                id='courseBenefits'
                placeholder='Enter Benefits of the Course'
                {...register("courseBenefits", {required:true})}
                className='form-style'
            />
            {
                errors.courseBenefits && (
                    <span className='mt-1 text-[12px] text-pink-200'>
                        Please enter your Course Name
                    </span>
                )
            }
        </div>


        {/* Requirements/instructions */}
        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />



        {/* Next button */}
        <div>
            {
                editCourse && (
                    <button 
                        onClick={()=> dispatch(setStep(2))}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-700 py-[8px] px-[15px] font-semibold text-richblack-5`}
                    >
                        <MdNavigateBefore/>
                        Continue without Saving
                    </button>
                )
            }

            <IconBtn
                disabled={loading}
                text={!editCourse ? "Next" : "Save Changes"}
            >
                <MdNavigateNext/>
            </IconBtn>
        </div>


    </form>
  )
}

export default CourseInformationForm