import React from 'react'
import CTAButton from '../Homepage/CTAButton';
import HighlightText from '../Homepage/HighlightText';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];





const LearningGrid = () => {
  return (
    <div className='w-11/12 grid mx-auto max-w-maxContent grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 mt-20'>  
        {

            LearningGridArray.map((card, index) => (
                <div key={index} 
                    className={`${index === 0 && "lg:col-span-2"}
                    ${card.order%2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                    ${card.order === 3 && "lg:col-start-2"}
                    ${card.order < 0 && "bg-transparent"}
                    lg:h-[290px] p-5
                `}>
                    {
                        card.order < 0 ? 
                        (<div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                            <h1 className='text-3xl font-semibold'>
                                {card.heading}
                                <HighlightText text={card.highlightText}/>
                            </h1>
                            <p className='text-richblack-300'>
                                {card.description}
                            </p>

                            <div className='w-fit'>
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>) : 
                        (<div className='flexflex-col gap-8 p-5'>
                            <h1 className='text-[18px] font-semibold max-w-[160px]'>
                                {card.heading}
                            </h1>
                            <p className='text-richblack-300 text-[14px] mt-7'>
                                {card.description}
                            </p>
                        </div>)
                    }

                </div>
            ))
        }

    </div>
  )
}

export default LearningGrid