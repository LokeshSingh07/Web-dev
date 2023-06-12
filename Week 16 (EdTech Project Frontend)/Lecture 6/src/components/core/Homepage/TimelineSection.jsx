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
        <div className='flex flex-row gap-15 items-center'>

            {/* left wala box */}
            <div className='w-[45%] flex flex-col gap-11'>
                {
                    timeline.map((element, index)=>{
                        return (
                            <div key={index} className='flex flex-row gap-5'>
                                <div className='h-[50px] w-[50px] bg-white flex items-center justify-center'>
                                    <img src={element.Logo}/>
                                </div>
                                <div>
                                    <h1 className='text-[18px] font-semibold'>{element.heading}</h1>
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
                    className='shadow-white object-cover h-fit'
                />

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Types of courses</p>
                    </div>
                
                </div>
            </div>

        </div>

    </div>
  )
}

export default TimelineSection