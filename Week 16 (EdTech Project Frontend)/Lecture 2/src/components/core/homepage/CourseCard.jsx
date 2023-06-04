import React from 'react';
import {HiUsers} from 'react-icons/hi'
import {TbBinaryTree2} from 'react-icons/tb'




const CourseCard = ({cardData,currentCard, setCurrentCard}) => {
  return (
    <div className=''>
        {/* card */}
        <div className={`w-[360px] lg:w-[300px] h-[270px] absolute z-10 flex flex-col justify-between
                ${cardData.heading === currentCard ? 
                "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : 
                "bg-richblack-800 "}
                text-richblack-25 transition-all duration-200 hover:scale-95 cursor-pointer
            `}
            onClick={()=> setCurrentCard(cardData?.heading)}
        >
            <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'>
                <h1 className={`
                    ${currentCard === cardData?.heading && "text-richblack-800"}
                    font-semibold text-[20px]
                `}>
                    {cardData.heading}
                </h1>
                <p className="text-richblack-400">{cardData.description}</p>
            </div>

            <div className={`flex justify-between
                ${currentCard === cardData?.heading ?
                "text-blue-300" : 
                "text-richblack-300"}
                px-6 py-3 font-medium
            `}>
                <div className='flex flex-row items-center gap-2'>
                    <HiUsers/>
                    {cardData.level}
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <TbBinaryTree2/>
                    {cardData.lessionNumber} 
                    {" Lessons"}
                </div>
            </div>
            
        </div>  


    </div>
  )
}

export default CourseCard