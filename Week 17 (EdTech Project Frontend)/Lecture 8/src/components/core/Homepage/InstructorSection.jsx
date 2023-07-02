import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Instructor from '../../../assets/Images/Instructor.png';
import CTAButton from './CTAButton';
import HighlightText from './HighlightText';






const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-col lg:flex-row gap-20 items-center'>
            
            <div className='lg:w-[50%]'>
                <img src={Instructor}
                    alt=""
                    className='shadow-[-20px_-20px_0_0] shadow-white'
                />
            </div>

            <div className='lg:w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold lg:w-[50%]'>
                    Become an 
                    <HighlightText text={"Instructor"}/>
                </div>

                <p className='font-medium text-[16px] text-justify lg:w-[85%] text-richblack-300'>Instructors from around the world tech millions of students on StudyNotion, We provide the tools and skills to teach what you love.</p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row items-center gap-2'>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>


            </div>


        </div>

    </div>
  )
}

export default InstructorSection