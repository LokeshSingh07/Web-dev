import React from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight} from 'react-icons/fa';
import HighlightText from '../components/core/homepage/HighlightText';
import CTAButton from '../components/core/homepage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/homepage/CodeBlocks';






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

            <div className="text-center text-4xl font-semibold mt-5">
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

            <div className="mx-3 my-14 shadow-blue-200">
                <video
                    muted
                    loop
                    autoPlay
                >
                    <source src={Banner} type="video/mp4"/>
                </video>
            </div>



            {/* Code Section 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your 
                            <HighlightText text={"coding potential"}/>
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



        </div>



        
        {/* Section 2 */}





        {/* Section 3 */}




        {/* Footer */}


    </div>
  )
}

export default Home
