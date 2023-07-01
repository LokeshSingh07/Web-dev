import React from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from '../../../assets/Images/TimelineImage.png'




const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully commited to the success company"
    },    
    {
        Logo: Logo2,
        heading: "Leadership",
        description: "Fully commited to the success company"
    },    
    {
        Logo: Logo3,
        heading: "Leadership",
        description: "Fully commited to the success company"
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        description: "Fully commited to the success company"
    },
]




const TimelineSection = () => {
  return (
    <div className=''>
        <div className='flex flex-col lg:flex-row gap-16 items-center'>

            {/* left wala box */}
            <div className='lg:w-[45%] flex flex-col gap-11'>
                {
                    timeline.map((element, index)=>{
                        return (
                            <div key={index} className='flex flex-row gap-5'>
                                <div className='h-[50px] w-[50px] bg-white shadow-sm flex items-center justify-center rounded-lg'>
                                    <img src={element.Logo}/>
                                </div>
                                <div>
                                    <h1 className='text-[18px] font-semibold text-richblack-800'>{element.heading}</h1>
                                    <p className='text-base'>{element.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


            {/* Right wala box */}
            <div className='relative shadow-blue-200 '>
                <img src={TimelineImage}    
                    alt="TimelineImage"
                    className='shadow-[20px_20px_0_0] shadow-white object-cover h-[400px] lg:h-fit'
                />

                <div className='absolute w-[230px] lg:w-[90%] bg-caribbeangreen-700 flex flex-col justify-center lg:flex-row text-white 
                uppercase py-10 top-0 left-0 lg:top-full lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] gap-y-2'>
                    
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='w-[40%] text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='w-[40%] text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Types of courses</p>
                    </div>
                
                </div>
            </div>

        </div>

    </div>
  )
}

export default TimelineSection