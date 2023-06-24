import React from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight} from 'react-icons/fa';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import Footer from '../components/common/Footer';









const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center justify-between text-white '>

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit '>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblue-900'>
                        <p>Become and Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className="text-center text-4xl font-semibold mt-7">
                Empower your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-5">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            {/* Button */}
            <div className="flex flex-row gap-7 mt-8">
                <CTAButton linkto={"/signup"} active={true}> 
                    Learn More
                </CTAButton>

                <CTAButton linkto={"/signup"} active={false}> 
                    Book a demo
                </CTAButton>
            </div>

            <div className="relative mx-3 my-14 shadow-blue-200">
                <video
                    muted
                    loop
                    autoPlay
                    className="shadow-[15px_15px_0_0] shadow-white"
                >
                    <source src={Banner} type="video/mp4"/>
                </video>

                {/* HW --> white background & shadow */}
            </div>



            {/* Code Section 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your 
                            <HighlightText text={"coding potential"}/>  
                            {" "}
                            with our online courses.
                        </div>
                    }
                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctaBtn1={
                        {
                            btnText: "Try it Yourself",
                            linkto: "/signup",
                            active: true
                        }
                    }
                    ctaBtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false
                        }
                    }
                    codeBlock={
                        `<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`
                    }
                    codeColor={"text-[#1FA2FF]"}

                />
            </div>


            {/* Code Section 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={"coding in seconds"}/>
                        </div>
                    }
                    subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctaBtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true
                        }
                    }
                    ctaBtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false
                        }
                    }
                    codeBlock={
                        `<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`
                    }
                    codeColor={"text-[#1FA2FF]"}

                />
            </div>

            
            <ExploreMore/>

        </div>



        
        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-500'>
            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>

                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto="/signup">
                            <div className='flex flex-row items-center gap-2'>
                                Explore full catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto="/signup">
                            learn More
                        </CTAButton>
                    </div>


                </div>

            </div>

            
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"}/>
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start '>
                        <div className='text-[16px] text-richblack-500 font-semibold'>
                            The modern StudyNotion id the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto="/signup">
                            Learn More
                        </CTAButton>
                    </div>
                    

                </div>


                <TimelineSection/>
                <LearningLanguageSection/>

            </div>
            

        </div>




        {/* Section 3 */}
        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">

            <InstructorSection/>


            <h2 className='text-center text-4xl font-bold mt-10'>Review from other learner</h2>
            {/* Review slider  */}

        </div>




        {/* Footer */}
        <section className='mt-40'>
            <Footer/>
        </section>

    </div>
  )
}

export default Home
