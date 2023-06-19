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
        <div className='grid grid-cols-3'>
            {
                steps.map((item)=>(
                    <>
                        <div key={item.id}>
                            <div className={`${step === item.id ? 
                                "bg-yellow-900 border-yellow-50 text-yellow-50" : 
                                "bg-richblack-800 border-richblack-800 text-richblack-300"} 
                                w-[40px] h-[40px] flex items-center justify-center rounded-full border-[2px]`}
                            >
                                {
                                    step > item.id ? (<FaCheck/>) : (item.id)
                                }
                            </div>
                        </div>

                        {/* Add course for dashes between the labels */}
                        {
                            item.id !== steps.length
                        }
                    </>
                ))
            }

        </div>
        
        <div className='grid grid-cols-3 mt-2'>
            {steps.map((item)=>(
                <>
                    <div>
                        <p>{item.title}</p>
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