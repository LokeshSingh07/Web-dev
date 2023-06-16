import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'




const LearningLanguageSection = () => {
  return (
    <div className='mt-[8rem]'>
        <div className='flex flex-col gap-5 items-center mb-16'>

            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for
                <HighlightText text={"learning any language"}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-semibold w-[70%]'>
                Using spin making learning multiple language easy. With 20+ languages realistic voice-over,
                progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img src={know_your_progress}
                    alt="Know_your_progress"
                    className='object-contain -mr-32'
                />
                <img src={compare_with_others}
                    alt="compare_with_others"
                    className='object-contain'    
                />
                <img src={plan_your_lesson}
                    alt="plan_your_lessons"
                    className='object-contain -ml-32'
                />
            </div>

            <div className='w-fit '>
                <CTAButton active={true} linkto="">
                    Learn More
                </CTAButton>
            </div>


        </div>


    </div>
  )
}

export default LearningLanguageSection