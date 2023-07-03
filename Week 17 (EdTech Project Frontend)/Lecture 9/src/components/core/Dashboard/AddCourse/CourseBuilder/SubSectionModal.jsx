import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import IconBtn from '../../../../common/IconBtn'
import Upload from '../Upload'






const SubSectionModal = ({modalData, setModalData, add=false, view=false, edit=false}) => {


  const {register, handleSubmit, formState:{errors}, setValue, getValues} = useForm()

  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const {course} = useSelector((state)=> state.course);
  const [loading,setLoading] = useState(false);


  useEffect(()=>{
    if(view || edit){
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
      setValue("lectureVideo", modalData.videoUrl)
    }

  },[])


  const isFormUpdated = ()=>{
    const currentValues = getValues();
    if(currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDescription !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl){
        return true;
      }
    else{
      return false;
    }
  }


  const handleEditSubSection = async(data)=>{
    const currentValues = getValues();
    const formData = new FormData();


    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id)

    if(currentValues.lectureTitle !== modalData.title){
      formData.append("title", currentValues.lectureTitle);
    }
    if(currentValues.lectureDescription !== modalData.description){
      formData.append("description", currentValues.lectureDescription);
    }
    if(currentValues.lectureVideo !== modalData.videoUrl){
      formData.append("videoFile", currentValues.lectureVideo);
    }



    setLoading(true);
    // API call
    const result = await updateSubSection(formData,token);

    if(result){
      // TODO --> Update the state of course using section(result) 
      const updatedCourseContent = course.courseContent.map((section)=> 
      section._id === modalData.sectionId ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent}; 
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  }


  const onSubmit = async(data)=>{
    if(view){
      return;
    }
    if(edit){
      if(!isFormUpdated){
        toast.error("No changes made to the form");
      }
      else{
        // edit kr do store me
        handleEditSubSection();
      }
      return;
    }


    // prepare formData to hit backend API
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDescription);
    formData.append("videoFile", data.lectureVideo)
    setLoading(true);

    // API call
    const result = await createSubSection(formData, token);

    if(result){
      // TODO --> Update the state of course using section(result) 
      const updatedCourseContent = course.courseContent.map((section)=> 
      section._id === modalData ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent}; 
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  }


  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900 bg-opacity-10 backdrop-blur-sm py-10'>
      <div className='w-11/12 max-w-[550px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
        
        <div className='flex items-center justify-between bg-richblack-700 rounded-t-lg px-5 py-2 '>
          <p className="text-xl font-semibold text-richblack-5"> 
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} lecture  
          </p>
          <button onClick={()=> (!loading ? setModalData(null) : {})}>
            <RxCross1 RxCross2 className="text-2xl text-richblack-5"/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 py-10'>
          <Upload 
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* lecture Title */}
          <div className='flex flex-col space-y-2'>
            <label className='label-style'>
              Lecture Title
            </label>
            <input
              id="lectureTitle"
              placeholder='Enter Lecture Title'
              {...register("lectureTitle", {required: true})}
              className="w-full form-style mt-3"
            />
            {
              errors.lectureTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Lecture Title is required
                </span>
              ) 
            }
          </div>
          
          {/* Lecture discription */}
          <div className='flex flex-col space-y-2'>
            <label className='label-style'>
              Lecture Description
            </label>
            <textarea
              rows={5}
              id="lectureDescription"
              placeholder='Enter Lecture Description'
              {...register("lectureDescription", {required: true})}
              className="w-full form-style resize-x-none min-h-[130px]"
            />
            {
              errors.lectureDescription && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Lecture Description is required
                </span>
              )
            }
          </div>



          {
            !view && (
              <div className="flex justify-end">
                <IconBtn
                  text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                ></IconBtn>
              </div>
            )
          }


        </form>


        
      </div>

    </div>
  )
}

export default SubSectionModal