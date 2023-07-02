import React from 'react';
import HighlightText from '../components/core/Homepage/HighlightText';
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider';







const About = () => {
  return (
    <div className='w-full mx-auto justify-center text-white'>

        {/* Section 1 */}
        <section className='bg-richblack-800'>
            <div className='relative w-11/12 flex flex-col items-center mx-auto max-w-maxContent text-center'>
                <header className='text-4xl font-semibold mt-20 lg:w-[75%] mx-auto'>
                    Driving Innovation in Online Education for a 
                    <HighlightText text="Brighter Future"/>
                </header>
                <p className='text-base text-richblack-300 mt-5 lg:w-[95%] mx-auto'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>

                <div className='h-[150px] md:h-[200px] lg:h-[280px]'></div>

                <div className='absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[30%] w-[100%] grid grid-cols-3 gap-3 lg:gap-5 mx-auto mt-10'>
                    <img src={BannerImage1}/>
                    <img src={BannerImage2}/>
                    <img src={BannerImage3}/>
                </div>


            </div>



        </section>




        {/* Section 2 */}
        <section>
            <div className='w-11/12 mx-auto mt-40 max-w-maxContent'>
                <Quote/>
            </div>
        </section>





        {/* Section 3 */}
        <section>
            <div className='flex flex-col w-11/12 mx-auto max-w-maxContent mt-40'>
                {/* Founding story wala div */}
                <div className='flex flex-col lg:flex-row justify-between gap-10'>
                    {/* Founding story left box */}
                    <div className='lg:w-[50%]'>
                        <h1 className='bg-gradient-to-br from-[#833Ab4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] mb-8'>Our Founding Story </h1>
                        <p className='text-base font-medium text-richblack-300 lg:w-[92%]'> 
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='text-richblack-300 lg:w-[92%] mt-5'> 
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>

                    </div>

                    {/* Founding story right box */}
                    <div className='lg:w-[50%]'>
                        <img src={FoundingStory}
                            alt=""
                            className='shadow-[0_0_20px_0] shadow-[#Fc6767]'
                        />
                    </div>

                </div>


                {/* Vision and Mission wala parent div */}
                <div className='flex flex-col lg:flex-row justify-between gap-10 mt-[7rem]'>
                    {/* left box */}
                    <div className='lg:w-[50%]'>
                        <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] mb-8'>Our Vision</h1>
                        <p className='text-richblack-300 lg:w-[92%]'> 
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    {/* right box */}
                    <div className='lg:w-[50%]'>
                        <h1 className='bg-gradient-to-b from-[#1Fa2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] mb-8'>Our Mission</h1>
                        <p className='text-richblack-300 lg:w-[92%]'> 
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>

            </div>


        </section>




        {/* Section 4 */}
        <section className='bg-richblack-800'>
            <StatsComponent/>
        </section>





        {/* Section 5 */}
        <section className='mx-auto flex flex-col items-center justify-between gap-5'>
            <LearningGrid/>
            <div className='p-5 lg:p-0'>
                <ContactFormSection/>
            </div>
        </section>



        {/* Section 6 */}
        <section className='flex flex-col items-center mb-40'>
            <h1 className='text-3xl font-semibold'>
                Reviews from other learners
            </h1>

            <ReviewSlider/>
        </section>






        {/* Section 7 */}
        <section>
            <Footer/>
        </section>





    </div>
  )
}

export default About