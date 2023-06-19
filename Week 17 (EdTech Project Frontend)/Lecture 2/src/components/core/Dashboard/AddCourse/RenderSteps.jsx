import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';






const steps = [
    {    
        id: 1,
        title: "Course Information",
    },
    {
        id: 2,
        title: "Course Builder",
    },
    {
        id: 3,
        title: "Publish",
    },
];




const RenderSteps = () => {

    const {step} = useSelector((state)=>state.course);





  return (
    <>
        <div className='relative mb-2 flex w-full justify-center'>
            {
                steps.map((item)=>(
                    <>
                        <div key={item.id} className='flex flex-col'>
                            <button className={`w-[40px] h-[40px] flex items-center justify-center rounded-full border-[2px]
                                ${step === item.id 
                                    ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                                    : "bg-richblack-800 border-richblack-800 text-richblack-300"
                                } 
                                ${step > item.id && "bg-yellow-50 text-yellow-50 "}
                                `}
                            >
                                {
                                    step > item.id 
                                    ? (<FaCheck className='font-bold text-richblack-900'/>) 
                                    : (item.id)
                                }
                            </button>
                        </div>

                        {/* Add course for dashes between the labels */}
                        {
                            item.id !== steps.length && (
                                <>
                                    <div className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2
                                    ${step > item.id ? "border-yellow-50" : "border-richblack-500"}`}>
                                    </div>
                                </>
                            )
                        }
                    </>
                ))
            }

        </div>
        
        <div className='relative mb-16 flex w-full select-none justify-between'>
            {steps.map((item)=>(
                <>
                    <div key={item.id} className="flex min-w-[130px] flex-col items-center gap-y-2" >
                        <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>
                            {item.title}
                        </p>
                    </div>
                </>
            ))}
        </div>



        {/* Step 1-2-3    --> Form */}
        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {/* {step === 3 && <PublishForm/>} */}
    </>
  )
}

export default RenderSteps;