import React from 'react';

const Stats = [
    {count:"5K", label:"Active Students"},
    {count:"10K", label:"Mentors"},
    {count:"200+", label:"Courses"},
    {count:"500+", label:"Awards"}
]



const StatsComponent = () => {

  return (
    <div className='w-11/12 mx-auto max-w-maxContent h-[100%] mt-20'>
        <div className='flex flex-row flex-wrap justify-around items-center gap-5 py-[60px]'>
            {
                Stats.map((element, index) => (
                    <div key={index} className="flex flex-col items-center max-w-[200px]">
                        <h1 className='text-[30px] font-bold'>{element.count}</h1>
                        <p className='text-richblack-400'>{element.label}</p>
                    </div>
                ))
            }
        </div>



    </div>
  )
}

export default StatsComponent