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
    <div className=''>

        {/* Explore more Section */}
        <div>
            <div className='text-4xl font-semibold text-center my-10'>
                Unlock the
                <HighlightText text={"Power of Course"}/>
                <p className='text-center text-richblack-300 text-[16px] mt-3'>
                    Learn to build anything you can imagine
                </p>
            </div>
        </div>


        {/* Tabs Section */}
        <div className='hidden w-max mx-auto lg:flex flex-row rounded-2xl lg:rounded-full bg-richblack-800 
        my-10 lg:mb-0 p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] '>
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
        <div className='lg:h-[240px] w-full'></div>
            


        {/* Course card ka group */}
        <div className='lg:absolute gap-10 flex justify-center lg:gap-0 lg:justify-between flex-wrap w-full 
        lg:bottom-0 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 
        lg:px-0 px-3'>
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
  )
}

export default ExploreMore