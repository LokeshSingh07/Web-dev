import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiAddToQueue } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import NestedView from './NestedView';
import { toast } from 'react-hot-toast';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';







const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState: {errors} } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("Updated")
  },[course])


  const cancelEdit = ()=>{
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = ()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  const goToNext = ()=>{
    if(course?.courseContent?.length === 0){
      toast.error("Please add atleast one Section")
      return;
    }
    if(course.courseContent.some((section)=> section.subSection.length === 0)){
      toast.error("Please add atleast One Lecture in each Section");
      return;
    }


    // if everything is good
    dispatch(setStep(3));
  }



  const onSubmit = async(data)=>{
    setLoading(true);
    let result;

    if(editSectionName){
      // we are editing the Section Name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, 
        token
      )
    }
    else{
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }


    // update values
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    // loading false
    setLoading(false);

  }


  const handleChangeEditSectionName = (sectionId, sectionName)=>{
    if(editSectionName === sectionId){
      cancelEdit();
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName)
  }






  return (
    <div className='my-10 flex flex-col gap-y-7 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 text-richblack-5'>
      <p className='font-semibold'>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <label htmlFor='sectionName' className='label-style'>
            Section Name <sup className='text-pink-200'>*</sup>      
          </label>
          <input
            id="sectionName"
            placeholder='Add a Section to build your Course'
            {...register("sectionName", {required: true})}
            className="form-style mt-3"
          />
          {
            errors.sectionName && (
              <span className='mt-1 text-[12px] text-pink-200'>
                Section Name is required
              </span>
            )
          }
        </div>

        <div className='flex flex-row gap-x-5 mt-3'>
          <IconBtn 
            type='submit'
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-yellow-50"}
          >
            <BiAddToQueue/>
          </IconBtn>
          {
            editSectionName && (
              <button 
                type="button"
                onClick={cancelEdit}
                className="text-sm text-richblack-300"
              >
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>


      
      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex justify-end gap-x-3 mt-10'>
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-700 py-[8px] px-[15px] font-semibold text-richblack-5`}
        >
          <MdNavigateBefore/>
          Back
        </button>
        <IconBtn text="Next" onclick={goToNext}>
          <MdNavigateNext/>
        </IconBtn>
      </div>




    </div>
  )
}

export default CourseBuilderForm
