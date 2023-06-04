import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';
import HighlightText from './HighlightText';





const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths", 
    "Career paths"
]




const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=> course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }



  return (
    <div className='flex flex-col items-center my-10 mx-auto'>

        <div className='text-4xl font-semibold text-center'>
            Unlock the
            <HighlightText text={"Power of Course"}/>
        </div>

        <p className='text-center text-richblack-300 text-[16px] mt-3'>
            Learn to build anything you can imagine
        </p>


        {/* Tabs */}
        <div className='w-fit flex flex-row rounded-full bg-richblack-800 mt-10 px-1 py-1'>
            {
                tabsName.map((element, index)=>{
                    return (
                        <div key={index}
                            className={`text-[16px] flex flex-row items-center gap-2
                                ${currentTab===element ? 
                                   "bg-richblack-900 text-richblack-5 font-medium" : 
                                   "text-richblack-200"
                                }
                                rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900
                                hover:text-richblack-5 px-7 py-2
                            `}
                            onClick={()=> setMyCards(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>


        {/* Cards */}
        <div className='lg:h-[220px] w-full relative'>
            
            {/* Course card ka group */}
            <div className='absolute left-[-20%] flex flex-row justify-between gap-10 w-full h-full mt-20'>
                {
                    courses.map((element, index)=>{
                        return (
                            <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>



        </div>
    



    
    </div>
  )
}

export default ExploreMore